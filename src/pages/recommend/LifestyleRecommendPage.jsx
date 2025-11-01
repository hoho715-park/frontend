// src/pages/recommend/LifestyleRecommendPage.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import './LifestyleRecommendPage.css';

const LifestyleRecommendPage = () => {
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

  // 체질별 생활 습관 데이터
  const LIFESTYLE_DATA = {
    '태양인': [
      { title: '과로·야식·음주 피하기', desc: '무리한 과로 방지 · 야식·술 절제' },
      { title: '규칙적 운동', desc: '허리 강화 · 스트레칭 습관화' },
      { title: '감정 관리', desc: '명상 · 호흡법으로 마음 안정' },
    ],
    '태음인': [
      { title: '땀 배출 습관', desc: '유산소 운동 · 반신욕으로 체내 순환 강화' },
      { title: '생활 리듬 유지', desc: '규칙적 식사·수면 · 밤샘 피하기' },
      { title: '도전적 목표 설정', desc: '현실 안주 지양 · 성취와 좌절 경험 활용' },
    ],
    '소양인': [
      { title: '식습관 관리', desc: '급하게 먹지 않기 · 물 자주 마시기' },
      { title: '하체 운동 습관', desc: '걷기 · 스쿼트 등 하체 중심 운동' },
      { title: '협동심 강화', desc: '단체 활동 참여 · 끈기 훈련' },
    ],
    '소음인': [
      { title: '햇볕 산책', desc: '햇볕 쬐며 산책 · 걷기 습관' },
      { title: '체온 관리', desc: '요가 · 근력 운동으로 몸 따뜻하게' },
      { title: '규칙적 생활', desc: '충분한 수분 섭취 · 소식·휴식 습관' },
    ],
  };

  const prefix = typePrefix[bodyType];
  const data = LIFESTYLE_DATA[bodyType];

  return (
    <>
      <Header />
      <div className="lifestyle-wrapper">
        <div className="lifestyle-page-container">
          <h1>{bodyType} 생활 습관 🧘</h1>

          <div className="lifestyle-grid">
            {data.map((item, i) => (
              <div key={`lifestyle-${i}`} className="lifestyle-card">
                <img
                  src={`/recommend/lifestyle/${prefix}_good_lifestyle_${i + 1}.png`}
                  alt={`${bodyType} 생활 습관 ${i + 1}`}
                />
                <hr />
                <p className="lifestyle-title">{item.title}</p>
                <p className="lifestyle-desc">{item.desc}</p>
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

export default LifestyleRecommendPage;
