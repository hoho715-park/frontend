// src/pages/ResultPage.jsx (전체 코드)

import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import CalendarModal from '../components/CalendarModal.jsx'; 
import './ResultPage.css';

// 체질별 이미지 파일 매핑 (유지)
const bodyTypeImages = {
    '태양인': '/taeyang_people.png',
    '태음인': '/taeeum_people.png',
    '소양인': '/soyang_people.png',
    '소음인': '/soeum_people.png',
    '평형인': '/default_people.png', 
};

// 그래프 표시 순서 정의 및 한글 이름 (유지)
const GRAPH_ORDER = ['kidney', 'spleen', 'lung', 'heart', 'liver', 'bladder'];
const ORGAN_NAMES_KR = {
    'kidney': '신장', 'spleen': '비장', 'lung': '폐', 
    'heart': '심장', 'liver': '간', 'bladder': '방광'
};

// 장기 수치를 그래프 SVG 좌표로 변환하는 유틸리티 (유지)
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

// 측정 일시 포맷 함수 (유지)
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


const ResultPage = () => {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hoveredSection, setHoveredSection] = useState(null); // 호버 상태: 'diet', 'lifestyle', 'sport'

    // 이미지 강조 애니메이션을 위한 호버 상태 추가 (section-name_hover)
    const [hoveredCard, setHoveredCard] = useState(null); 
    
    const { 
        bodyType = '체질 판별 중...', 
        recommendations = {}, 
        formData = {},
        measureTime = new Date()
    } = location.state || {}; 

    const bodyTypeImageSrc = bodyTypeImages[bodyType] || bodyTypeImages['평형인']; 
    
    const { points: leftPoints, pointData: leftPointData } = mapDataToSVGPoints(formData, 'left');
    const { points: rightPoints, pointData: rightPointData } = mapDataToSVGPoints(formData, 'right');

    const handleDateSelect = (selectedDate) => {
        console.log("Selected Date:", selectedDate);
        alert(`선택된 날짜의 기록을 불러옵니다: ${selectedDate.toLocaleDateString('ko-KR')}`);
    };
    
    const DUMMY_AVAILABLE_DATES = [
        new Date().toISOString().slice(0, 10),
        new Date(Date.now() - 86400000 * 5).toISOString().slice(0, 10),
    ];


    return (
        <>
            <Header />
            <div className="result-page-container">
                <div className="results-box">
                    <div className="result-header">
                        <h1>OOO님의 체질은</h1>
                        <div className="body-type-image-wrapper">
                            {bodyTypeImageSrc && (
                                <img 
                                    src={bodyTypeImageSrc} 
                                    alt={`${bodyType} 캐릭터`} 
                                    className="body-type-character-image" 
                                />
                            )}
                        </div>
                    </div>
                    
                    <h2 className="section-title">오늘의 장기 수치</h2> 

                    <div className="graph-container">
                        {/* 1. 왼손 그래프 (SVG 코드 생략 - 유지) */}
                        <div className="graph-box left-hand-graph">
                            <div className="graph-box-header">
                                <h2>왼손 장기 수치</h2>
                            </div>
                            <div className="graph-placeholder">
                                <svg width="100%" height="100%" viewBox="0 0 400 200">
                                    {[0, 10, 20, 30, 40, 50].map(v => (
                                        <g key={v}>
                                            <text x="15" y={180 - (v / 50) * 160 + 5} fontSize="10" fill="#999" textAnchor="end">{v}</text>
                                            <line x1="20" y1={180 - (v / 50) * 160} x2="380" y2={180 - (v / 50) * 160} stroke={v === 0 ? "#333" : "#eee"} strokeWidth="1"/>
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

                        {/* 2. 오른손 그래프 (SVG 코드 생략 - 유지) */}
                        <div className="graph-box right-hand-graph">
                            <div className="graph-box-header">
                                <h2>오른손 장기 수치</h2>
                            </div>
                            <div className="graph-placeholder">
                                <svg width="100%" height="100%" viewBox="0 0 400 200">
                                    {[0, 10, 20, 30, 40, 50].map(v => (
                                        <g key={v}>
                                            <text x="15" y={180 - (v / 50) * 160 + 5} fontSize="10" fill="#999" textAnchor="end">{v}</text>
                                            <line x1="20" y1={180 - (v / 50) * 160} x2="380" y2={180 - (v / 50) * 160} stroke={v === 0 ? "#333" : "#eee"} strokeWidth="1"/>
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
                    
                    <div className="timestamp-and-button">
                        <p className="measure-timestamp">측정 일시 : {formatTime(measureTime)}</p>
                        <button className="view-history-button" onClick={() => setIsModalOpen(true)}>
                            이전 수치 확인하기
                        </button>
                    </div>

                    {/* 추천 섹션 시작 */}
                    <h2 className="section-title recommendation-title">체질 맞춤 추천</h2>

                    <div className="recommendation-sections">
                        {/* 1. 식단 (확장 가능한 섹션) */}
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

                        {/* 2. 생활 습관 (단일 섹션) */}
                        <Link to="/recommend/lifestyle" state={{ bodyType, recommendationType: 'lifestyle' }} className={`recommendation-card ${hoveredCard === 'lifestyle' ? 'img-hover' : ''}`}
                              onMouseEnter={() => setHoveredCard('lifestyle')}
                              onMouseLeave={() => setHoveredCard(null)}>
                            <img src="/recommend_life.png" alt="생활 습관" className="recommendation-img" />
                            <h3>생활 습관</h3>
                        </Link>

                        {/* 3. 운동 (단일 섹션) */}
                        <Link to="/recommend/sport" state={{ bodyType, recommendationType: 'sport' }} className={`recommendation-card ${hoveredCard === 'sport' ? 'img-hover' : ''}`}
                              onMouseEnter={() => setHoveredCard('sport')}
                              onMouseLeave={() => setHoveredCard(null)}>
                            <img src="/recommend_sport.png" alt="운동 추천" className="recommendation-img" />
                            <h3>운동 추천</h3>
                        </Link>
                    </div>
                    {/* 추천 섹션 끝 */}

                </div>
            </div>
            
            {/* CalendarModal 렌더링 */}
            {isModalOpen && (
                <CalendarModal 
                    onClose={() => setIsModalOpen(false)}
                    onDateSelect={handleDateSelect}
                    availableDates={DUMMY_AVAILABLE_DATES}
                />
            )}
        </>
    );
};

export default ResultPage;