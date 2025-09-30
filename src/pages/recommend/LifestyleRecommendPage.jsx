// src/pages/recommend/LifestyleRecommendPage.jsx

import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import './LifestyleRecommendPage.css';

const LIFESTYLE_RECOMMENDATIONS = {
  '태양인': ["휴식과 호흡법 실천", "과로 금지, 충분한 수면"],
  '태음인': ["규칙적인 운동 필수", "과식·게으름 방지"],
  '소양인': ["과도한 활동보다 균형 중요", "명상·휴식으로 안정"],
  '소음인': ["따뜻한 환경 유지", "스트레스 줄이는 활동"],
};

const LifestyleRecommendPage = () => {
  const location = useLocation();
  const { bodyType = '태양인' } = location.state || {};

  return (
    <>
      <Header />
      <div className="lifestyle-page-container">
        <h1>{bodyType} 생활 습관 🧘</h1>
        <ul className="lifestyle-list">
          {LIFESTYLE_RECOMMENDATIONS[bodyType]?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <div className="back-button">
            <Link to="/result" state={{ bodyType }}>⬅ 결과 페이지로 돌아가기</Link>
        </div>
      </div>
    </>
  );
};

export default LifestyleRecommendPage;
