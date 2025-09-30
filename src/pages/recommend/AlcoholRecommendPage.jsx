// src/pages/recommend/AlcoholRecommendPage.jsx

import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import './AlcoholRecommendPage.css';

const ALCOHOL_RECOMMENDATIONS = {
  '태양인': ["막걸리 소량 OK", "소주·맥주는 피하는 게 좋아요"],
  '태음인': ["와인, 가벼운 술 가능", "과음 주의!"],
  '소양인': ["맥주·청량주 적당히 OK", "소주 과다 섭취 금지"],
  '소음인': ["따뜻한 약주 조금은 OK", "찬 술은 건강에 해로움"],
};

const AlcoholRecommendPage = () => {
  const location = useLocation();
  const { bodyType = '태양인' } = location.state || {};

  return (
    <>
      <Header />
      <div className="alcohol-page-container">
        <h1>{bodyType} 주류 추천 🍺</h1>
        <ul className="alcohol-list">
          {ALCOHOL_RECOMMENDATIONS[bodyType]?.map((item, index) => (
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

export default AlcoholRecommendPage;
