// src/pages/ResultPage.jsx

import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header.jsx';
import './ResultPage.css';

const ResultPage = () => {
    const location = useLocation();
    // InputMeasure 페이지에서 전달받은 체질 정보 (임시)
    const { bodyType = '데이터 없음', recommendations = {} } = location.state || {}; 

    return (
        <>
            <Header />
            <div className="result-page-container">
                <div className="result-header">
                    <h1>OOO님의 체질은</h1>
                    <h2 className={`body-type ${bodyType}`}>{bodyType}</h2>
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