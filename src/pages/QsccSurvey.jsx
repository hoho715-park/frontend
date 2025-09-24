// src/pages/QsccSurvey.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import './QsccSurvey.css';

const QsccSurvey = () => {
  return (
    <>
      <Header />
      <div className="qsc-survey-container">
        <div className="qsc-main-hero">
          <img src="/qscc_main_hero.png" alt="나의 사상체질은?" className="qsc-hero-img" />
          <Link to="/test/qsc-survey-questions" className="start-test-button">
            테스트 시작하기
          </Link>
          <Link to="/test/qsc-intro" className="intro-link-text">
            QSCCII 설문이란?
          </Link>
        </div>
      </div>
    </>
  );
};

export default QsccSurvey;