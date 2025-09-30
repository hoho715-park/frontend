// src/pages/recommend/SportRecommendPage.jsx

import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import './SportRecommendPage.css';

const SPORT_RECOMMENDATIONS = {
  '태양인': ["등산, 가벼운 유산소 운동", "격렬한 운동은 피하는 게 좋아요"],
  '태음인': ["수영, 조깅, 꾸준한 유산소 운동", "체중 관리가 중요"],
  '소양인': ["요가, 스트레칭, 걷기", "격렬한 활동보다는 균형"],
  '소음인': ["체온 올리는 가벼운 근력 운동", "무리하지 않는 유산소"],
};

const SportRecommendPage = () => {
  const location = useLocation();
  const { bodyType = '태양인' } = location.state || {};

  return (
    <>
      <Header />
      <div className="sport-page-container">
        <h1>{bodyType} 운동 추천 🏃</h1>
        <ul className="sport-list">
          {SPORT_RECOMMENDATIONS[bodyType]?.map((item, index) => (
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

export default SportRecommendPage;
