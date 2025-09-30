// src/pages/ResultPage.jsx

import React, { useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import CalendarModal from '../components/CalendarModal.jsx';
import html2canvas from 'html2canvas';
import './ResultPage.css';

// 체질별 이미지 파일 매핑 (⚡ 평형인 제거)
const bodyTypeImages = {
    '태양인': '/taeyang_people.png',
    '태음인': '/taeeum_people.png',
    '소양인': '/soyang_people.png',
    '소음인': '/soeum_people.png',
};

// 유효한 체질 리스트
const VALID_BODY_TYPES = ['태양인', '태음인', '소양인', '소음인'];

// 그래프 표시 순서 및 한글 이름
const GRAPH_ORDER = ['kidney', 'spleen', 'lung', 'heart', 'liver', 'bladder'];
const ORGAN_NAMES_KR = {
    'kidney': '신장', 'spleen': '비장', 'lung': '폐',
    'heart': '심장', 'liver': '간', 'bladder': '방광'
};

// 장기 수치를 그래프 좌표로 변환
const mapDataToSVGPoints = (data, hand) => {
    const maxValue = 50;
    const yAxisHeight = 160;
    const xUnit = 60;
    const xStart = 20; 
    
    let points = "";
    let pointData = [];

    GRAPH_ORDER.forEach((organId, index) => {
        const value = parseInt(data[organId]?.[hand] || 25);
        const clampedValue = Math.max(0, Math.min(maxValue, value));
        
        const y = 180 - (clampedValue / maxValue) * yAxisHeight;
        const x = xStart + (index * xUnit);
        
        points += `${x},${y} `;
        pointData.push({x, y, value: clampedValue});
    });
    
    return { points: points.trim(), pointData };
};

// 측정 일시 포맷
const formatTime = (date) => {
    const d = new Date(date);
    const year = String(d.getFullYear()).slice(2);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const dayOfWeek = dayNames[d.getDay()];
    const hour = String(d.getHours()).padStart(2, '0');
    const minute = String(d.getMinutes()).padStart(2, '0');
    
    return `'${year}.${month}.${day}.${dayOfWeek} ${hour}:${minute}`; 
};

// 체질별 특징 데이터
const BODY_TYPE_FEATURES = {
  '태양인': {
    'top-left': `건강·신체 기능:
• 폐·심장 계통에 부담이 오기 쉬움
• 간 기능은 비교적 강함
• 열이 위로 치솟는 증상, 두통·어지럼증·불면 경향`,
    'top-right': `성격:
• 외향적·리더형, 목표지향적
• 자존심 강하고 결단 빠르며 승부욕 강함`,
    'bottom-left': `유의점:
• 과로·과음·분노 조절 주의
• 상체의 열을 내려주는 휴식과 호흡 필요
• 규칙적 수면, 과음·카페인 과다 섭취 주의`,
    'bottom-right': `체형:
• 상체·가슴과 어깨가 발달
• 하체가 상대적으로 빈약
• 체격은 마른 편이거나 길고 뻣뻣한 인상`
  },
  '태음인': {
    'top-left': `건강·신체 기능:
• 간·폐 대사 불균형에 취약
• 비만·대사증후군 소인
• 기혈순환 더딤`,
    'top-right': `성격:
• 꾸준하고 인내심 강함
• 안정적이고 현실적`,
    'bottom-left': `유의점:
• 과식과 게으름 주의
• 규칙적인 운동과 생활 필요`,
    'bottom-right': `체형:
• 하체·허리·엉덩이가 발달
• 상체는 상대적으로 둔중
• 체격이 크고 살이 잘 붙는 편`
  },
  '소양인': {
    'top-left': `건강·신체 기능:
• 위장·소화기 질환 취약
• 열이 위로 치솟는 증상 발생 잦음`,
    'top-right': `성격:
• 명랑하고 정의로움
• 활동적이며 추진력 강함`,
    'bottom-left': `유의점:
• 스트레스 관리 필요
• 과도한 활동 주의`,
    'bottom-right': `체형:
• 가슴 발달
• 엉덩이와 하체는 빈약`
  },
  '소음인': {
    'top-left': `건강·신체 기능:
• 소화기 약함
• 신장, 하복부 질환 취약`,
    'top-right': `성격:
• 내성적이고 세심함
• 조심성이 많음`,
    'bottom-left': `유의점:
• 찬 음식, 한랭 주의
• 따뜻한 환경 유지 필요`,
    'bottom-right': `체형:
• 상하 균형 잡힘
• 엉덩이 발달, 체격 작고 단정`
  }
};


const ResultPage = () => {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hoveredSection, setHoveredSection] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    
    // 로그인한 사용자 username 가져오기
    const username = localStorage.getItem("username") || "사용자";
    
    const graphSectionRef = useRef(null);

    let { 
        bodyType = '', 
        recommendations = {}, 
        formData = {},
        measureTime = new Date()
    } = location.state || {};

    // ⚡ 무조건 4가지 체질 중 하나만 보이도록 보정
    if (!VALID_BODY_TYPES.includes(bodyType)) {
        bodyType = '태양인'; // 기본값
    }

    const bodyTypeImageSrc = bodyTypeImages[bodyType];
    
    const { points: leftPoints, pointData: leftPointData } = mapDataToSVGPoints(formData, 'left');
    const { points: rightPoints, pointData: rightPointData } = mapDataToSVGPoints(formData, 'right');

    const handleDateSelect = (selectedDate) => {
        alert(`선택된 날짜의 기록을 불러옵니다: ${selectedDate.toLocaleDateString('ko-KR')}`);
    };

    const DUMMY_AVAILABLE_DATES = [
        new Date().toISOString().slice(0, 10),
        new Date(Date.now() - 86400000 * 5).toISOString().slice(0, 10),
    ];

    const handleSaveAsPNG = async () => {
        if (!graphSectionRef.current) {
            alert('그래프 영역을 찾을 수 없습니다.');
            return;
        }
        try {
            const canvas = await html2canvas(graphSectionRef.current, {
                useCORS: true,
                scale: 2,
                logging: false,
            });
            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = `장기수치_${formatTime(new Date())}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            alert('오늘 수치 그래프가 PNG 파일로 저장되었습니다!');
        } catch (error) {
            alert("그래프 저장에 실패했습니다.");
        }
    };

    return (
        <>
            <Header />
            <div className="result-page-container">
                <div className="results-box">
                    <div className="result-header">
                        {/* 🔥 username 강조 */}
                        <h1><span className="username-highlight">{username}</span>님의 체질은</h1>
                        <div className="body-type-image-wrapper">
                            <div className="feature-tag top-left">{BODY_TYPE_FEATURES[bodyType]?.['top-left']}</div>
                            <div className="feature-tag top-right">{BODY_TYPE_FEATURES[bodyType]?.['top-right']}</div>
                            <div className="feature-tag bottom-left">{BODY_TYPE_FEATURES[bodyType]?.['bottom-left']}</div>
                            <div className="feature-tag bottom-right">{BODY_TYPE_FEATURES[bodyType]?.['bottom-right']}</div>
                            
                            {bodyTypeImageSrc && (
                                <img 
                                    src={bodyTypeImageSrc} 
                                    alt={`${bodyType} 캐릭터`} 
                                    className="body-type-character-image" 
                                />
                            )}
                        </div>
                    </div>

                    {/* 그래프 영역 */}
                    <div ref={graphSectionRef} className="graph-section-wrapper">
                        <h2 className="section-title">오늘의 장기 수치</h2> 
                        <div className="graph-container">
                            {/* 왼손 그래프 */}
                            <div className="graph-box left-hand-graph">
                                <div className="graph-box-header"><h2>왼손 장기 수치</h2></div>
                                <div className="graph-placeholder">
                                    <svg width="100%" height="100%" viewBox="0 0 400 200">
                                        {[0, 10, 20, 30, 40, 50].map(v => (
                                            <g key={v}>
                                                <text x="15" y={180 - (v / 50) * 160 + 5} fontSize="10" fill="#999" textAnchor="end">{v}</text>
                                                <line x1="20" y1={180 - (v / 50) * 160} x2="380" y2={180 - (v / 50) * 160} stroke={v === 0 ? "#333" : "#ccc"} strokeWidth="1"/>
                                            </g>
                                        ))}
                                        <polyline fill="none" stroke="#4CAF50" strokeWidth="2" points={leftPoints} />
                                        {leftPointData.map((p, i) => (
                                            <g key={i}>
                                                <circle cx={p.x} cy={p.y} r="3" fill="#4CAF50" />
                                                <text x={p.x} y={p.y - 10} fontSize="10" fill="#4CAF50" textAnchor="middle">{p.value}</text>
                                            </g>
                                        ))}
                                        {GRAPH_ORDER.map((id, index) => (
                                            <text key={id} x={20 + index * 60} y="195" fontSize="10" fill="#555" textAnchor="middle">{ORGAN_NAMES_KR[id]}</text>
                                        ))}
                                    </svg>
                                </div>
                            </div>

                            {/* 오른손 그래프 */}
                            <div className="graph-box right-hand-graph">
                                <div className="graph-box-header"><h2>오른손 장기 수치</h2></div>
                                <div className="graph-placeholder">
                                    <svg width="100%" height="100%" viewBox="0 0 400 200">
                                        {[0, 10, 20, 30, 40, 50].map(v => (
                                            <g key={v}>
                                                <text x="15" y={180 - (v / 50) * 160 + 5} fontSize="10" fill="#999" textAnchor="end">{v}</text>
                                                <line x1="20" y1={180 - (v / 50) * 160} x2="380" y2={180 - (v / 50) * 160} stroke={v === 0 ? "#333" : "#ccc"} strokeWidth="1"/>
                                            </g>
                                        ))}
                                        <polyline fill="none" stroke="#FF8C69" strokeWidth="2" points={rightPoints} />
                                        {rightPointData.map((p, i) => (
                                            <g key={i}>
                                                <circle cx={p.x} cy={p.y} r="3" fill="#FF8C69" />
                                                <text x={p.x} y={p.y - 10} fontSize="10" fill="#FF8C69" textAnchor="middle">{p.value}</text>
                                            </g>
                                        ))}
                                        {GRAPH_ORDER.map((id, index) => (
                                            <text key={id} x={20 + index * 60} y="195" fontSize="10" fill="#555" textAnchor="middle">{ORGAN_NAMES_KR[id]}</text>
                                        ))}
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 측정 일시 & 버튼 */}
                    <div className="timestamp-and-button">
                        <p className="measure-timestamp">측정 일시 : {formatTime(measureTime)}</p>
                        <div className="button-group">
                            <button className="save-png-button" onClick={handleSaveAsPNG}>이미지 저장</button>
                            <div className="button-separator"></div>
                            <button className="view-history-button-part" onClick={() => setIsModalOpen(true)}>이전 수치 확인하기</button>
                        </div>
                    </div>

                    {/* 추천 섹션 */}
                    <div className="recommendation-sections">
                        {/* 식단 */}
                        <div className={`recommendation-group ${hoveredSection === 'diet' ? 'expanded' : ''}`}
                             onMouseEnter={() => setHoveredSection('diet')}
                             onMouseLeave={() => setHoveredSection(null)}>
                            <Link to="/recommend/diet" state={{ bodyType, recommendationType: 'diet' }} className={`default-view ${hoveredCard === 'diet' ? 'img-hover' : ''}`}
                                onMouseEnter={() => setHoveredCard('diet')}
                                onMouseLeave={() => setHoveredCard(null)}>
                                <img src="/recommend_food.png" alt="식단" className="recommendation-img" />
                                <h3>식단 추천</h3>
                            </Link>
                            <div className="expanded-view">
                                <Link to="/recommend/food" state={{ bodyType, recommendationType: 'food' }} className="expanded-card food-card">
                                    <img src="/recommend_food.png" alt="추천 음식" />
                                    <span>음식 추천</span>
                                </Link>
                                <Link to="/recommend/alcohol" state={{ bodyType, recommendationType: 'alcohol' }} className="expanded-card alcohol-card">
                                    <img src="/recommend_beer.png" alt="주류 추천" />
                                    <span>주류 추천</span>
                                </Link>
                            </div>
                        </div>

                        {/* 생활 습관 */}
                        <Link to="/recommend/lifestyle" state={{ bodyType, recommendationType: 'lifestyle' }} className={`recommendation-card ${hoveredCard === 'lifestyle' ? 'img-hover' : ''}`}
                              onMouseEnter={() => setHoveredCard('lifestyle')}
                              onMouseLeave={() => setHoveredCard(null)}>
                            <img src="/recommend_life.png" alt="생활 습관" className="recommendation-img" />
                            <h3>생활 습관</h3>
                        </Link>

                        {/* 운동 */}
                        <Link to="/recommend/sport" state={{ bodyType, recommendationType: 'sport' }} className={`recommendation-card ${hoveredCard === 'sport' ? 'img-hover' : ''}`}
                              onMouseEnter={() => setHoveredCard('sport')}
                              onMouseLeave={() => setHoveredCard(null)}>
                            <img src="/recommend_sport.png" alt="운동 추천" className="recommendation-img" />
                            <h3>운동 추천</h3>
                        </Link>
                    </div>
                </div>
            </div>

             {/* CalendarModal */}
            {isModalOpen && (
                <CalendarModal 
                    onClose={() => setIsModalOpen(false)}
                    userId={localStorage.getItem("userId")}
                />
            )}
        </>
    );
};

export default ResultPage;
