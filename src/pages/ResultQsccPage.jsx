import React from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./ResultQsccPage.css";

const COLORS = ["#FFB703", "#219EBC", "#FB8500", "#8ECAE6"];

// ✅ 체질별 빙고 데이터
const BINGO_KEYWORDS = {
  태양인: [
    "리더십 강함", "감정 기복 큼", "자신감 넘침", "직설적임", "열정적 추진력",
    "고집 셈", "남 앞에 나서기 좋아함", "야망이 큼", "리스크 감수형", "즉흥적 결정",
    "자존심 강함", "타인 통제 경향", "성취지향적", "지적 욕구 강함", "의견 분명함",
    "참을성 부족", "결단 빠름", "승부욕 강함", "말보다 행동형", "자기주장 강함",
    "완벽주의 경향", "피드백에 민감함", "자존감 강함", "대담한 성격", "논리적 판단형"
  ],
  태음인: [
    "침착하고 느긋함", "감정 표현 적음", "신중한 의사결정", "식사 즐김", "계획적임",
    "현실적 사고", "책임감 강함", "한번 시작하면 끝까지", "신뢰를 중시함", "생각이 깊음",
    "안정 추구형", "묵묵히 행동함", "예의 바름", "겉보다 속이 깊음", "조용한 카리스마",
    "기억력 좋음", "감정 절제", "끈기 있음", "느리지만 정확함", "신중한 대화",
    "관찰력 뛰어남", "고민 많음", "단정한 성격", "체계적 사고", "신중한 리더형"
  ],
  소양인: [
    "외향적임", "유머감각 좋음", "감정 풍부함", "즉흥적임", "친화력 좋음",
    "말재주 있음", "도전정신 강함", "에너지 넘침", "활발한 성격", "리더형 끼 있음",
    "사교성 좋음", "즉각적 반응", "변화 선호", "감각적 사고", "낙천적임",
    "감정 표현 풍부", "상황 대처 빠름", "유연한 사고", "재치 있음", "감성 풍부",
    "생각보다 행동", "예의는 기본", "분위기 주도형", "기분파", "열정적임"
  ],
  소음인: [
    "조용한 편", "신중함", "내면 중심적", "감정 억제형", "규칙적 생활",
    "책임감 있음", "계획적 사고", "관찰자형", "질서 중시", "타인 배려형",
    "차분함", "감정 표현 적음", "소극적 경향", "인내심 강함", "사려 깊음",
    "내성적임", "주의 깊음", "디테일에 강함", "느리지만 확실함", "분석적 사고",
    "겸손함", "자기통제력 높음", "조용한 열정", "생각이 많음", "책임감 강함"
  ],
};

const ResultQsccPage = () => {
  const location = useLocation();
  const { fisherScores, percentages, dominantType } = location.state || {};

  // ✅ 결과 데이터가 없을 경우
  if (!fisherScores || !dominantType) {
    return (
      <>
        <Header />
        <div className="result-container">
          <h2>⚠️ 결과 데이터를 불러올 수 없습니다.</h2>
          <p>설문을 다시 진행해주세요.</p>
          <Link to="/test/qsc-survey-questions" className="retry-btn">
            다시 검사하기
          </Link>
        </div>
      </>
    );
  }

  const data = Object.keys(fisherScores).map((type) => ({
    name: type,
    value: Number(percentages[type]),
  }));

  const bingoWords = BINGO_KEYWORDS[dominantType] || [];

  return (
    <>
      <Header />
      <div className="result-container">
        <h1>
          당신은 <span className="highlight">{dominantType}</span> 입니다 🧭
        </h1>

        {/* ✅ 그래프 */}
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={130}
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* ✅ 빙고판 */}
        <div className="bingo-section">
          <h2 className="bingo-title">{dominantType} 빙고판</h2>
          <div className="bingo-grid">
            {bingoWords.slice(0, 25).map((word, i) => {
              const isCenter = i === 12;
              return (
                <div
                  key={i}
                  className={`bingo-cell ${isCenter ? "center-cell" : ""}`}
                >
                  {isCenter ? dominantType : word}
                </div>
              );
            })}
          </div>
        </div>

        {/* ✅ 추천 섹션 */}
        <h2 className="recommendation-title">나에게 좋은 추천</h2>
        <div className="recommendation-sections">
          {/* 음식 추천 */}
          <Link
            to="/recommend/food"
            state={{
              bodyType: dominantType,
              source: "qscc",
              fisherScores,
              percentages,
              dominantType,
            }}
            className="recommendation-card"
          >
            <img src="/recommend_food.png" alt="음식 추천" className="recommendation-img" />
            <h3>음식 추천</h3>
          </Link>

          {/* 주류 추천 */}
          <Link
            to="/recommend/alcohol"
            state={{
              bodyType: dominantType,
              source: "qscc",
              fisherScores,
              percentages,
              dominantType,
            }}
            className="recommendation-card"
          >
            <img src="/recommend_beer.png" alt="주류 추천" className="recommendation-img" />
            <h3>주류 추천</h3>
          </Link>

          {/* 생활 습관 */}
          <Link
            to="/recommend/lifestyle"
            state={{
              bodyType: dominantType,
              source: "qscc",
              fisherScores,
              percentages,
              dominantType,
            }}
            className="recommendation-card"
          >
            <img src="/recommend_life.png" alt="생활 습관" className="recommendation-img" />
            <h3>생활 습관</h3>
          </Link>

          {/* 운동 추천 */}
          <Link
            to="/recommend/sport"
            state={{
              bodyType: dominantType,
              source: "qscc",
              fisherScores,
              percentages,
              dominantType,
            }}
            className="recommendation-card"
          >
            <img src="/recommend_sport.png" alt="운동 추천" className="recommendation-img" />
            <h3>운동 추천</h3>
          </Link>
        </div>

        {/* 다시 검사하기 버튼 */}
        <Link to="/test/qsc-survey-questions" className="retry-btn">
          다시 검사하기
        </Link>
      </div>
    </>
  );
};

export default ResultQsccPage;
