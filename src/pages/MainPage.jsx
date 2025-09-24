import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <section className="main-page-hero">
        <div className="main-text-container">
          <h1>“이음, 나의 체질과 하루를 잇다”</h1>
          <p>당신의 체질을 분석해 건강한 하루를 설계합니다.</p>
          <div className="expand-title">나의 사상체질 알아보기!</div> {/* 텍스트를 버튼 위로 이동 */}
          <div className="test-button-wrapper"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div className={`test-button-main ${isHovered ? 'hidden' : ''}`}>
              테스트하기 <span className="arrow">→</span>
            </div>
            <div className={`test-button-expand ${isHovered ? 'visible' : ''}`}>
              <div className="expand-buttons">
                <Link to="/test/qsc-survey" className="expand-button-1">
                  QSCC 설문으로 알아보기
                </Link>
                <Link to="/input" className="expand-button-2">
                  손바닥 장기 수치로 알아보기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainPage;