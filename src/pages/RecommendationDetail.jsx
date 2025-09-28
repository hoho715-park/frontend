// src/pages/RecommendationDetail.jsx

import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header.jsx';
import './RecommendationDetail.css';

const RecommendationDetail = () => {
    const location = useLocation();
    // bodyType: '태양인', recommendationType: 'food' 또는 'alcohol' 등
    const { bodyType, recommendationType, detail } = location.state || {}; 

    // 현재 페이지 제목 설정
    const getTitle = () => {
        switch (recommendationType) {
            case 'food': return `${bodyType} - 추천 음식`;
            case 'alcohol': return `${bodyType} - 주류 추천`;
            case 'lifestyle': return `${bodyType} - 생활 습관`;
            case 'sport': return `${bodyType} - 운동 추천`;
            default: return '상세 정보';
        }
    };

    // TODO: 실제 데이터는 백엔드나 로컬 JSON 파일에서 가져와야 합니다.
    const sampleContent = detail || "해당 체질에 대한 상세 추천 정보를 준비 중입니다.";

    return (
        <>
            <Header />
            <div className="detail-page-container">
                <div className="detail-content-box">
                    <h1>{getTitle()}</h1>
                    <div className="detail-body">
                        {/* 상세 내용을 표시하는 영역 */}
                        <p>{sampleContent}</p>
                        {/* DB 연동 시 여기에 실제 상세 정보와 이미지들이 로드됩니다. */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecommendationDetail;