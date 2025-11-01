// src/pages/recommend/SportRecommendPage.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import './SportRecommendPage.css';

const SportRecommendPage = () => {
  const location = useLocation();
  const { bodyType = '태양인', formData, measureTime, source, fisherScores, percentages, dominantType } =
    location.state || {};

  // ✅ 돌아가기 경로 결정
  const backLink = source === 'qscc' ? '/result-qscc' : '/result';

  // 체질별 prefix 매핑
  const typePrefix = {
    '태양인': 'taeyang',
    '태음인': 'taeeum',
    '소양인': 'soyang',
    '소음인': 'soeum',
  };

  // 체질별 운동 데이터
  const SPORT_DATA = {
    '태양인': [
      { title: '등산', desc: '하체 근력 강화 및 유산소 운동' },
      { title: '줄넘기', desc: '순발력과 하체 발달에 효과적' },
      { title: '요가', desc: '심신 안정, 하체와 척추의 균형 강화' },
    ],
    '태음인': [
      { title: '수영', desc: '폐활량 강화 및 땀 배출' },
      { title: '조깅 및 마라톤', desc: '지구력과 심폐 능력 향상' },
      { title: '구기운동(축구,농구 등)', desc: '에너지 소모와 땀 흘리기' },
    ],
    '소양인': [
      { title: '스쿼트', desc: '하체 강화 및 균형 잡기' },
      { title: '걷기', desc: '하체 근력 강화, 심폐기능 강화' },
      { title: '에어로빅', desc: '하체 중심 밸런스 운동' },
    ],
    '소음인': [
      { title: '요가', desc: '몸을 따뜻하게 하고 유연성 증진' },
      { title: '걷기', desc: '적당한 강도의 유산소 운동, 소화 촉진' },
      { title: '웨이트 트레이닝', desc: '상체와 하체 근력 강화' },
    ],
  };

  const prefix = typePrefix[bodyType];
  const data = SPORT_DATA[bodyType];

  return (
    <>
      <Header />
      <div className="sport-wrapper">
        <div className="sport-page-container">
          <h1>{bodyType} 운동 추천 🏃</h1>

          <div className="sport-grid">
            {data.map((item, i) => (
              <div key={`sport-${i}`} className="sport-card">
                <img
                  src={`/recommend/sport/${prefix}_good_sport_${i + 1}.png`}
                  alt={`${bodyType} 운동 ${i + 1}`}
                />
                <hr />
                <p className="sport-title">{item.title}</p>
                <p className="sport-desc">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* ✅ 결과 페이지로 돌아가기 (출처별 분기 처리) */}
          <div className="back-button">
            <Link
              to={backLink}
              state={{
                bodyType,
                formData,
                measureTime,
                fisherScores,
                percentages,
                dominantType,
              }}
            >
              ⬅ 결과 페이지로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SportRecommendPage;
