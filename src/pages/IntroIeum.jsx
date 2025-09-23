// src/pages/IntroIeum.jsx

import React from 'react';
import './IntroIeum.css';

const IntroIeum = () => {
  return (
    <div className="intro-page-container">
      {/* 첫 번째 섹션 (하얀색 배경) */}
      <section className="intro-section first-section">
        <div className="section-content">
          <div className="logo-content">
            <img src="/ieum.png" alt="이음 로고" className="section-logo-img" />
          </div>
          <div className="text-content">
            <span className="section-title">“이음; 나의 체질과 하루를 잇다”</span>
            <p>
              건강한 삶을 위한 맞춤형 체질 분석, 누구나 쉽게 경험할 수 있는 건강 관리 플랫폼
            </p>
          </div>
        </div>
      </section>

      {/* 두 번째 섹션 (연보라색 배경) */}
      <section className="intro-section second-section">
        <div className="section-content">
          <div className="text-content">
            <span className="section-title">Why<br/>IEUM?</span>
            <p>
              <b>I</b> - Insight (통찰) : 오장육부 데이터와 QSCC 설문을 분석해 깊은 통찰을 얻습니다.<br/>
              <b>E</b> - Experience (경험) : 시각화와 웹 서비스를 통해 누구나 쉽게 체질을 체험할 수 있게 합니다.<br/>
              <b>U</b> - Unity (연결) : 환자와 전문가, 전통의학과 최신기술을 연결합니다.<br/>
              <b>M</b> - Medicine (치유) : 맞춤형 건강 관리와 예방법으로 삶의 질 향상을 돕습니다.
            </p>
          </div>
          <div className="logo-content">
            <img src="/ieum_세로.png" alt="이음 로고" className="section-logo-img" />
          </div>
        </div>
      </section>

      {/* 세 번째 섹션 (추후 구현) */}
      <section className="intro-section third-section">
        <div className="section-content">
          <h2 style={{ color: '#fff' }}>세 번째 섹션</h2>
          <p style={{ color: '#fff' }}>이곳에 내용을 채워 넣을 예정입니다.</p>
        </div>
      </section>
    </div>
  );
};

export default IntroIeum;