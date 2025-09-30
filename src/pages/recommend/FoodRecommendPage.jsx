// src/pages/recommend/FoodRecommendPage.jsx

import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import './FoodRecommendPage.css';

const FOOD_RECOMMENDATIONS = {
  '태양인': [
    "보리밥, 배추, 무, 해조류 등 가벼운 음식",
    "돼지고기, 기름진 음식은 피하는 것이 좋아요",
  ],
  '태음인': [
    "채소, 버섯, 생선 위주의 담백한 식사",
    "기름지고 무거운 음식은 체중 증가 위험",
  ],
  '소양인': [
    "수박, 배, 돼지고기 등 열을 내려주는 음식",
    "매운 음식, 기름진 음식은 자제",
  ],
  '소음인': [
    "따뜻한 성질의 음식 (닭고기, 인삼, 생강)",
    "찬 음식, 아이스크림은 피하는 게 좋아요",
  ],
};

const FoodRecommendPage = () => {
  const location = useLocation();
  const { bodyType = '태양인' } = location.state || {};

  return (
    <>
      <Header />
      <div className="food-page-container">
        <h1>{bodyType} 음식 추천 🍽️</h1>
        <ul className="food-list">
          {FOOD_RECOMMENDATIONS[bodyType]?.map((item, index) => (
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

export default FoodRecommendPage;
