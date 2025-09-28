// src/pages/ResultPage.jsx

import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header.jsx';
import './ResultPage.css';

// 체질별 이미지 파일 매핑
const bodyTypeImages = {
    '태양인': '/taeyang_people.png',
    '태음인': '/taeeum_people.png',
    '소양인': '/soyang_people.png',
    '소음인': '/soeum_people.png',
    '평형인': '/default_people.png', 
};

// 그래프 표시 순서 정의 (신장 -> 비장 -> 폐 -> 심장 -> 간 -> 방광)
const GRAPH_ORDER = ['kidney', 'spleen', 'lung', 'heart', 'liver', 'bladder'];
const ORGAN_NAMES_KR = {
    'kidney': '신장', 'spleen': '비장', 'lung': '폐', 
    'heart': '심장', 'liver': '간', 'bladder': '방광'
};

// 장기 수치를 그래프 SVG 좌표로 변환하는 유틸리티
const mapDataToSVGPoints = (data, hand) => {
    const maxValue = 50;
    const yAxisHeight = 160; // SVG 내 Y축 실제 높이 (180 - 20)
    const xUnit = 60;        // X축 간격
    const xStart = 20;       // X축 시작점
    
    let points = "";
    let pointData = []; // 데이터 포인트와 값을 저장

    GRAPH_ORDER.forEach((organId, index) => {
        const value = parseInt(data[organId]?.[hand] || 0); // 데이터가 없으면 0으로 처리
        
        const clampedValue = Math.max(0, Math.min(maxValue, value));
        
        // Y 좌표 계산: 180 (바닥선) - (값 / 50 * 160)
        const y = 180 - (clampedValue / maxValue) * yAxisHeight;
        const x = xStart + (index * xUnit);
        
        points += `${x},${y} `;
        pointData.push({x, y, value: clampedValue});
    });
    
    return { points: points.trim(), pointData };
};

// 측정 일시 포맷 함수
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
    const { 
        bodyType = '체질 판별 중...', 
        recommendations = {}, 
        formData = {},
        measureTime = new Date()
    } = location.state || {}; 

    const bodyTypeImageSrc = bodyTypeImages[bodyType] || bodyTypeImages['평형인']; 
    
    const { points: leftPoints, pointData: leftPointData } = mapDataToSVGPoints(formData, 'left');
    const { points: rightPoints, pointData: rightPointData } = mapDataToSVGPoints(formData, 'right');

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
                    
                    {/* 새로운 섹션 제목 추가 */}
                    <h2 className="section-title">오늘의 장기 수치</h2> 

                    <div className="graph-container">
                        {/* 1. 왼손 그래프 */}
                        <div className="graph-box left-hand-graph">
                            {/* 그래프 제목을 가운데 정렬하기 위한 div 추가 */}
                            <div className="graph-box-header">
                                <h2>왼손 장기 수치</h2>
                            </div>
                            <div className="graph-placeholder">
                                <svg width="100%" height="100%" viewBox="0 0 400 200">
                                    {/* 눈금선 및 Y축 레이블 (0, 10, 20, 30, 40, 50) */}
                                    {[0, 10, 20, 30, 40, 50].map(v => (
                                        <g key={v}>
                                            <text x="15" y={180 - (v / 50) * 160 + 5} fontSize="10" fill="#999" textAnchor="end">
                                                {v}
                                            </text>
                                            <line 
                                                x1="20" y1={180 - (v / 50) * 160} x2="380" y2={180 - (v / 50) * 160} 
                                                stroke={v === 0 ? "#333" : "#eee"} strokeWidth="1"
                                            />
                                        </g>
                                    ))}
                                    
                                    {/* 데이터 라인 */}
                                    <polyline 
                                        fill="none" 
                                        stroke="#4CAF50" 
                                        strokeWidth="2" 
                                        points={leftPoints} 
                                    />

                                    {/* 데이터 포인트 및 수치 텍스트 */}
                                    {leftPointData.map((p, i) => (
                                        <g key={i}>
                                            <circle cx={p.x} cy={p.y} r="3" fill="#4CAF50" />
                                            <text x={p.x} y={p.y - 10} fontSize="10" fill="#4CAF50" textAnchor="middle">
                                                {p.value}
                                            </text>
                                        </g>
                                    ))}
                                    
                                    {/* X축 레이블 (장기 이름) */}
                                    {GRAPH_ORDER.map((id, index) => (
                                        <text 
                                            key={id} 
                                            x={20 + index * 60} y="195" 
                                            fontSize="10" fill="#555" textAnchor="middle"
                                        >
                                            {ORGAN_NAMES_KR[id]}
                                        </text>
                                    ))}
                                </svg>
                            </div>
                        </div>

                        {/* 2. 오른손 그래프 */}
                        <div className="graph-box right-hand-graph">
                            {/* 그래프 제목을 가운데 정렬하기 위한 div 추가 */}
                            <div className="graph-box-header">
                                <h2>오른손 장기 수치</h2>
                            </div>
                            <div className="graph-placeholder">
                                <svg width="100%" height="100%" viewBox="0 0 400 200">
                                    {/* 눈금선 및 Y축 레이블 */}
                                    {[0, 10, 20, 30, 40, 50].map(v => (
                                        <g key={v}>
                                            <text x="15" y={180 - (v / 50) * 160 + 5} fontSize="10" fill="#999" textAnchor="end">
                                                {v}
                                            </text>
                                            <line 
                                                x1="20" y1={180 - (v / 50) * 160} x2="380" y2={180 - (v / 50) * 160} 
                                                stroke={v === 0 ? "#333" : "#eee"} strokeWidth="1"
                                            />
                                        </g>
                                    ))}
                                    
                                    {/* 데이터 라인 */}
                                    <polyline 
                                        fill="none" 
                                        stroke="#FF8C69" 
                                        strokeWidth="2" 
                                        points={rightPoints} 
                                    />

                                    {/* 데이터 포인트 및 수치 텍스트 */}
                                    {rightPointData.map((p, i) => (
                                        <g key={i}>
                                            <circle cx={p.x} cy={p.y} r="3" fill="#FF8C69" />
                                            <text x={p.x} y={p.y - 10} fontSize="10" fill="#FF8C69" textAnchor="middle">
                                                {p.value}
                                            </text>
                                        </g>
                                    ))}
                                    
                                    {/* X축 레이블 (장기 이름) */}
                                    {GRAPH_ORDER.map((id, index) => (
                                        <text 
                                            key={id} 
                                            x={20 + index * 60} y="195" 
                                            fontSize="10" fill="#555" textAnchor="middle"
                                        >
                                            {ORGAN_NAMES_KR[id]}
                                        </text>
                                    ))}
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <p className="measure-timestamp">측정 일시 : {formatTime(measureTime)}</p>

                    <div className="recommendation-sections">
                        <section className="recommendation-card diet">
                            <h3>식단 추천</h3>
                            <p>{recommendations.diet || '체질에 맞는 추천 식단을 준비 중입니다.'}</p>
                        </section>
                        
                        <section className="recommendation-card lifestyle">
                            <h3>생활 습관</h3>
                            <p>{recommendations.lifestyle || '체질에 맞는 생활 습관 가이드를 제공합니다.'}</p>
                        </section>

                        <section className="recommendation-card alcohol">
                            <h3>주류 추천</h3>
                            <p>{recommendations.alcohol || '체질에 맞는 주류 추천을 준비 중입니다.'}</p>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResultPage;