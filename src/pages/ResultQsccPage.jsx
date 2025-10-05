import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ResultQsccPage.css';

// 체질별 색상 (태양인 / 태음인 / 소양인 / 소음인)
const COLORS = ['#FFB703', '#219EBC', '#FB8500', '#8ECAE6'];

const ResultQsccPage = () => {
  const location = useLocation();
  const { fisherScores, percentages, dominantType } = location.state || {};

  // state가 없으면 안내문 표시
  if (!fisherScores) {
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

  // 원형 그래프용 데이터 변환
  const data = Object.keys(fisherScores).map((type) => ({
    name: type,
    value: Number(percentages[type]),
  }));

  return (
    <>
      <Header />
      <div className="result-container">
        <h1>
          당신은 <span className="highlight">{dominantType}</span> 입니다 🧭
        </h1>

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

        {/* 점수 요약 제거됨 */}

        <Link to="/test/qsc-survey-questions" className="retry-btn">
          다시 검사하기
        </Link>
      </div>
    </>
  );
};

export default ResultQsccPage;
