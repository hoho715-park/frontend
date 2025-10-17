import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import MainPage from './pages/MainPage.jsx';
import Login from './pages/Login.jsx';
import IntroIeum from './pages/IntroIeum.jsx';
import InputStart from './pages/Input.jsx';
import InputMeasure from './pages/InputMeasure.jsx';
import SignUp from './pages/SignUp.jsx';
import QsccIntro from './pages/QsccIntro.jsx';
import QsccSurvey from './pages/QsccSurvey.jsx';
import QsccQuestion from './pages/QsccQuestion.jsx';
import ResultPage from './pages/ResultPage.jsx';
import MyPage from './pages/MyPage.jsx';

// ✅ 추천 페이지 import
import FoodRecommendPage from './pages/recommend/FoodRecommendPage.jsx';
import AlcoholRecommendPage from './pages/recommend/AlcoholRecommendPage.jsx';
import LifestyleRecommendPage from './pages/recommend/LifestyleRecommendPage.jsx';
import SportRecommendPage from './pages/recommend/SportRecommendPage.jsx';

// ✅ QSCC 결과 페이지 import
import ResultQsccPage from './pages/ResultQsccPage.jsx';

// ✅ 서비스 소개 페이지 import (신규 추가)
import AboutService from './pages/AboutService.jsx';

function App() {
  return (
    <Routes>
      {/* 메인 페이지 */}
      <Route path="/" element={<><Header /><MainPage /></>} />

      {/* 로그인 & 회원가입 */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* 소개 페이지 */}
      <Route path="/about/ieum" element={<><Header /><IntroIeum /></>} />
      <Route path="/about/service" element={<><Header /><AboutService /></>} /> {/* ✅ 추가됨 */}

      {/* 입력 페이지 */}
      <Route path="/input" element={<InputStart />} />
      <Route path="/input/measure" element={<InputMeasure />} />

      {/* QSCC 테스트 관련 */}
      <Route path="/test/qsc-intro" element={<><Header /><QsccIntro /></>} />
      <Route path="/test/qsc-survey" element={<><Header /><QsccSurvey /></>} />
      <Route path="/test/qsc-survey-questions" element={<><Header /><QsccQuestion /></>} />
      <Route path="/results-qscc" element={<><Header /><ResultQsccPage /></>} />

      {/* 결과 / 마이페이지 */}
      <Route path="/result" element={<ResultPage />} />
      <Route path="/mypage" element={<><Header /><MyPage /></>} /> 

      {/* 추천 페이지 */}
      <Route path="/recommend/food" element={<FoodRecommendPage />} />
      <Route path="/recommend/alcohol" element={<AlcoholRecommendPage />} />
      <Route path="/recommend/lifestyle" element={<LifestyleRecommendPage />} />
      <Route path="/recommend/sport" element={<SportRecommendPage />} />
    </Routes>
  );
}

export default App;
