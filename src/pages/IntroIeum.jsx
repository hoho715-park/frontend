// src/pages/IntroIeum.jsx (수정)

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
        <div className="section-content-why">
          <div className="why-title">
            <span className="section-title">Why<br/>IEUM?</span>
          </div>
          <div className="why-content">
            <div className="why-text-box">
              <p>
                <b>I</b> - Insight (통찰) : 오장육부 데이터와 QSCC 설문을 분석해 깊은 통찰을 얻습니다.<br/>
                <b>E</b> - Experience (경험) : 시각화와 웹 서비스를 통해 누구나 쉽게 체질을 체험할 수 있게 합니다.<br/>
                <b>U</b> - Unity (연결) : 환자와 전문가, 전통의학과 최신기술을 연결합니다.<br/>
                <b>M</b> - Medicine (치유) : 맞춤형 건강 관리와 예방법으로 삶의 질 향상을 돕습니다.
              </p>
            </div>
            <div className="why-logo-box">
              <img src="/ieum_세로.png" alt="이음 로고" className="why-logo-img" />
            </div>
          </div>
        </div>
      </section>

      {/* 세 번째 섹션 (하얀색 배경) */}
      <section className="intro-section third-section">
        <div className="section-content">
            <div className="text-content">
                <span className="section-title">Why<br/>Start?</span>
                <p>
                  건강 정보를 찾아도 나에게 맞는지 모르겠죠?<br/>
                  이음은 손바닥 5포인트 측정과 설문을 결합해<br/>
                  내 체질을 수치로 보여주고,<br/>
                  그에 맞춘 식사법과 예방 팁을 제시합니다.<br/>
                  오늘부터 나만의 생활 루틴을 시작해 보세요.
                </p>
            </div>
            <div className="image-content">
                <img src="/introieum_start.png" alt="건강정보 이미지" className="section-image" />
            </div>
        </div>
      </section>

      {/* 네 번째 섹션 (아이콘 추가) */}
      <section className="intro-section fourth-section">
        <div className="about-logo-container">
          <h1 className="about-logo-title">About LOGO</h1>
          <div className="logo-description-wrapper">
            <div className="logo-description top-left">
              <div className="icon-title-group">
                <img src="/introieum_infinite.png" alt="무한대 아이콘" className="infinite-icon" />
                <h2>곡선과 연결 구조</h2>
              </div>
              <p>사람의 체질, 손바닥 수치, 음식, 주류, 운동까지 서로<br/><b>유기적으로 연결되어 있는 구조</b>를 상징</p>
            </div>
            <div className="logo-description top-right">
              <div className="icon-title-group">
                <h2>점</h2>
                <div className="dot"></div>
              </div>
              <p>흩어진 신호가 하나의 의미 있는 패턴이 되는 순간을 상징</p>
            </div>
            <div className="logo-description bottom-left">
              <div className="icon-title-group">
                <h2>보라색</h2>
                <div className="color-box violet"></div>
              </div>
              <p><b>조화로운 치유:</b> <br/><span className='purple_text'>보라색</span>은 붉은색의 에너지와 푸른색의<br/>차분함이 만나 완벽한 균형을 이루는 색
              <br/> 이는 이음이 지향하는 오장육부의 밸런스를 의미</p>
            </div>
            <div className="logo-description bottom-right">
              <div className="icon-title-group">
                <h2>초록색</h2>
                <div className="color-box green"></div>
              </div>
              <p><b>의학계열 상징:</b><br/><span className='green_text'>초록색</span>은 전 세계적으로 의료, 건강, 회복을 상징하는 색<br/>병원, 약국, 의료기기 로고에서 자주 쓰이며, 안정감과 치유를 직관적으로 떠올리게 함
              <br/><b>자연과 생명력:</b><br/> <span className='green_text'>초록색</span>은 풀과 나무의 색이자 몸이 회복되는 생명력의 색</p>
            </div>
            <img src="/ieum.png" alt="이음 로고" className="about-logo-image" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntroIeum;