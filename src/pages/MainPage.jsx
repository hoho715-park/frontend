// src/pages/MainPage.jsx

import React from 'react';
import './MainPage.css';

const MainPage = () => {
  return (
    <>
      <section className="main-page-hero">
        <div className="main-text-container">
          <h1>“이음, 나의 체질과 하루를 잇다”</h1>
          <p>당신의 체질을 분석해 건강한 하루를 설계합니다.</p>
          <button className="test-button">
            테스트하기 <span className="arrow">→</span>
          </button>
        </div>
      </section>
      {/* <main>
        <h2>서비스 소개</h2>
        <p>더 많은 정보가 여기에 올 예정입니다.</p>
      </main> */}
    </>
  );
};

export default MainPage;