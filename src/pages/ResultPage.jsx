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

// 체질별 캐치프레이즈
const BODY_TYPE_TITLES = {
  '태양인': "불꽃 같은 리더",
  '태음인': "든든한 버팀목",
  '소양인': "아이디어 폭주 기관차",
  '소음인': "섬세한 설계자",
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
    const xStart = 50; 
    
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
• 간 기능이 발달하여 해독 능력 강함
• 폐·심장 기능은 상대적으로 약함
• 상체로 열이 잘 몰리며 두통·불면 발생 잦음`,
    'top-right': `성격:
• 외향적이며 리더십이 강함
• 목표지향적이고 결단력 있음
• 자존심이 강하고 경쟁심이 높음`,
    'bottom-left': `유의점:
• 과음·과로 시 폐·심장 부담 주의
• 분노 조절과 스트레스 관리 필요
• 충분한 수면과 호흡 운동이 도움`,
    'bottom-right': `체형:
• 어깨와 가슴이 발달하고 상체가 큰 편
• 하체는 빈약하고 전반적으로 마른 체형
• 길고 뻣뻣한 인상을 주는 경우가 많음`
  },
  '태음인': {
    'top-left': `건강·신체 기능:
• 간 기능이 약해 대사 불균형 취약
• 폐기능은 강하나 순환이 더딤
• 비만·대사증후군 발생 가능성 높음`,
    'top-right': `성격:
• 느긋하고 인내심이 강함
• 현실적이고 안정성을 중시함
• 차분하고 신중한 성격`,
    'bottom-left': `유의점:
• 과식·게으름에 주의 필요
• 꾸준한 운동과 생활습관 관리가 필수
• 체중 조절을 위한 식습관 개선 필요`,
    'bottom-right': `체형:
• 허리와 하체가 발달하고 엉덩이가 큰 편
• 상체는 둔중하고 뚱뚱해 보이는 체격
• 살이 잘 찌고 체격이 큰 경우가 많음`
  },
  '소양인': {
    'top-left': `건강·신체 기능:
• 위장·소화기 질환에 취약
• 상열(위로 열 오름) 증상 잦음
• 피부 트러블·목마름 동반하기 쉬움`,
    'top-right': `성격:
• 정의롭고 명랑하며 활동적
• 추진력이 강하고 적극적
• 변화를 좋아하고 성급한 면도 있음`,
    'bottom-left': `유의점:
• 스트레스 쌓이면 소화 장애 심화
• 과도한 활동보다는 휴식 병행 필요
• 일정한 생활 리듬 유지`,
    'bottom-right': `체형:
• 가슴 발달이 뚜렷
• 엉덩이·하체는 빈약한 편
• 상체 비중이 큰 체형`
  },
  '소음인': {
    'top-left': `건강·신체 기능:
• 소화력이 약하고 위장 장애 잦음
• 신장·하복부 질환에 취약
• 추위를 타며 냉증 많음`,
    'top-right': `성격:
• 내성적이고 조심성 많음
• 세심하고 꼼꼼하며 신중함
• 대인관계에서 소극적`,
    'bottom-left': `유의점:
• 찬 음식·한랭 환경 피해야 함
• 따뜻한 음식과 환경이 건강에 도움
• 긴장 완화와 심리적 안정 필요`,
    'bottom-right': `체형:
• 상하 균형이 비교적 잘 잡힘
• 엉덩이 발달, 단정하고 아담한 체형
• 작고 단정한 인상을 주는 경우 많음`
  }
};

const ResultPage = () => {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hoveredSection, setHoveredSection] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    
    // 로그인한 사용자 userName 가져오기
    const userName = localStorage.getItem("userName") || "사용자";
    
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
                        {/* 🔥 userName 강조 */}
                        <h1>
                            {BODY_TYPE_TITLES[bodyType]}
                            <span className="userName-highlight">"{userName}"</span>
                        </h1>
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
                                            <text key={id} x={50 + index * 60} y="195" fontSize="10" fill="#555" textAnchor="middle">{ORGAN_NAMES_KR[id]}</text>
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
                    <h2 className="recommendation-title">나에게 좋은 추천</h2>
                    <div className="recommendation-sections">
                        {/* 음식 */}
                            <Link 
                            to="/recommend/food" 
                            state={{ bodyType, formData, measureTime, recommendationType: 'food' }}
                            className={`recommendation-card ${hoveredCard === 'food' ? 'img-hover' : ''}`}
                            onMouseEnter={() => setHoveredCard('food')}
                            onMouseLeave={() => setHoveredCard(null)}
                            >
                            <img src="/recommend_food.png" alt="음식 추천" className="recommendation-img" />
                            <h3>음식 추천</h3>
                            </Link>

                            {/* 주류 */}
                            <Link 
                            to="/recommend/alcohol" 
                            state={{ bodyType, formData, measureTime, recommendationType: 'alcohol' }}
                            className={`recommendation-card ${hoveredCard === 'alcohol' ? 'img-hover' : ''}`}
                            onMouseEnter={() => setHoveredCard('alcohol')}
                            onMouseLeave={() => setHoveredCard(null)}
                            >
                            <img src="/recommend_beer.png" alt="주류 추천" className="recommendation-img" />
                            <h3>주류 추천</h3>
                            </Link>

                            {/* 생활 습관 */}
                            <Link 
                            to="/recommend/lifestyle" 
                            state={{ bodyType, formData, measureTime, recommendationType: 'lifestyle' }}
                            className={`recommendation-card ${hoveredCard === 'lifestyle' ? 'img-hover' : ''}`}
                            onMouseEnter={() => setHoveredCard('lifestyle')}
                            onMouseLeave={() => setHoveredCard(null)}
                            >
                            <img src="/recommend_life.png" alt="생활 습관" className="recommendation-img" />
                            <h3>생활 습관</h3>
                            </Link>

                            {/* 운동 */}
                            <Link 
                            to="/recommend/sport" 
                            state={{ bodyType, formData, measureTime, recommendationType: 'sport' }}
                            className={`recommendation-card ${hoveredCard === 'sport' ? 'img-hover' : ''}`}
                            onMouseEnter={() => setHoveredCard('sport')}
                            onMouseLeave={() => setHoveredCard(null)}
                            >
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
