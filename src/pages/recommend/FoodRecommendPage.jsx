// src/pages/recommend/FoodRecommendPage.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import './FoodRecommendPage.css';

const FoodRecommendPage = () => {
  const location = useLocation();
  const { bodyType = '태양인', formData, measureTime } = location.state || {};

  // 체질별 prefix 매핑
  const typePrefix = {
    '태양인': 'taeyang',
    '태음인': 'taeeum',
    '소양인': 'soyang',
    '소음인': 'soeum',
  };

  // 체질별 음식 데이터 (굵은 제목 + 설명)
  const FOOD_DATA = {
    '태양인': {
      good: [
        { title: '해산물', desc: '조개류 · 새우 · 게' },
        { title: '녹황색 채소', desc: '브로콜리 · 청경체 · 시금치' },
        { title: '콩류', desc: '두부 · 청국장 · 낫토' },
      ],
      bad: [
        { title: '육류', desc: '돼지고기 · 소고기 · 닭고기' },
        { title: '열성보양식', desc: '삼계탕 · 인삼 · 홍삼' },
        { title: '매운음식', desc: '청양고추 · 매운떡볶이 · 매운라면' },
      ]
    },
    '태음인': {
      good: [
        { title: '소고기', desc: '등심 · 안심 · 곰탕' },
        { title: '뿌리채소', desc: '무 · 도라지 · 우엉' },
        { title: '곡류', desc: '율무 · 보리 · 녹두' },
      ],
      bad: [
        { title: '돼지고기', desc: '삼겹살 · 갈비 · 햄' },
        { title: '기름진 튀김류', desc: '치킨 · 돈까스 · 탕수육' },
        { title: '찬 음식', desc: '수박 · 아이스크림 · 냉면' },
      ]
    },
    '소양인': {
      good: [
        { title: '돼지고기', desc: '삼겹살 · 갈비 · 햄' },
        { title: '찬 성질 채소', desc: '오이 · 가지 · 상추' },
        { title: '곡류', desc: '율무 · 보리 · 녹두' },
      ],
      bad: [
        { title: '닭고기', desc: '치킨 · 삼계탕' },
        { title: '매운음식', desc: '청양고추 · 매운떡볶이 · 매운라면' },
        { title: '술', desc: '소주 · 맥주 · 막걸리' },
      ]
    },
    '소음인': {
      good: [
        { title: '추어탕', desc: '미꾸라지탕 · 고추장 양념' },
        { title: '대추', desc: '말린 대추 · 대추차' },
        { title: '생강', desc: '생강차 · 편강' },
      ],
      bad: [
        { title: '돼지고기', desc: '삼겹살 · 갈비 · 햄' },
        { title: '찬 음식', desc: '수박 · 아이스크림 · 냉면' },
        { title: '찬 성질 채소', desc: '오이 · 가지 · 상추' },
      ]
    }
  };

  const prefix = typePrefix[bodyType];
  const data = FOOD_DATA[bodyType];

  return (
    <>
      <Header />
      <div className="food-page-container">
        <h1>{bodyType} 음식 추천 🍽️</h1>

        {/* 좋은 음식 */}
        <div className="food-section">
          <h2 className="good-title">👍 좋은 음식</h2>
          <div className="food-grid">
            {data.good.map((item, i) => (
              <div key={`good-${i}`} className="food-card">
                <img
                  src={`/recommend/food/${prefix}_good_food_${i + 1}.png`}
                  alt={`${bodyType} 좋은 음식 ${i + 1}`}
                />
                <hr />
                <p className="food-title">{item.title}</p>
                <p className="food-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 안좋은 음식 */}
        <div className="food-section">
          <h2 className="bad-title">👎 안좋은 음식</h2>
          <div className="food-grid">
            {data.bad.map((item, i) => (
              <div key={`bad-${i}`} className="food-card">
                <img
                  src={`/recommend/food/${prefix}_bad_food_${i + 1}.png`}
                  alt={`${bodyType} 안좋은 음식 ${i + 1}`}
                />
                <hr />
                <p className="food-title">{item.title}</p>
                <p className="food-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 돌아가기 버튼 */}
        <div className="back-button">
          <Link
            to="/result"
            state={{ bodyType, formData, measureTime }}
          >
            ⬅ 결과 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </>
  );
};

export default FoodRecommendPage;
