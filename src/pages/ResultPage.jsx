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
    '평형인': '/default_people.png', // 기본 또는 평형인 이미지 (필요 시 추가)
};

const ResultPage = () => {
    const location = useLocation();
    // InputMeasure 페이지에서 전달받은 체질 정보 (임시)
    // 데이터가 없을 경우 '체질 판별 중...' 메시지를 표시합니다.
    const { bodyType = '체질 판별 중...', recommendations = {} } = location.state || {}; 

    // 현재 체질에 맞는 이미지 경로 가져오기
    const bodyTypeImageSrc = bodyTypeImages[bodyType] || bodyTypeImages['평형인']; 
    
    return (
        <>
            <Header />
            <div className="result-page-container">
                <div className="result-header">
                    <h1>OOO님의 체질은</h1>
                    
                    {/* 체질 캐릭터 이미지 표시 */}
                    <div className="body-type-image-wrapper">
                        {bodyTypeImageSrc && (
                            <img 
                                src={bodyTypeImageSrc} 
                                alt={`${bodyType} 캐릭터`} 
                                className="body-type-character-image" 
                            />
                        )}
                    </div>

                    {/* 체질 이름 텍스트 제거 */}
                </div>
                
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
        </>
    );
};

export default ResultPage;