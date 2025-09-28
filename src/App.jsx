// src/App.jsx

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
import ResultPage from './pages/ResultPage.jsx'; // ResultPage 컴포넌트 import

function App() {
  return (
    <Routes>
      <Route path="/" element={<><Header /><MainPage /></>} />
      <Route path="/login" element={<Login />} />
      <Route path="/about/ieum" element={<><Header /><IntroIeum /></>} />
      <Route path="/input" element={<InputStart />} />
      <Route path="/input/measure" element={<InputMeasure />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/test/qsc-intro" element={<><Header /><QsccIntro /></>} />
      <Route path="/test/qsc-survey" element={<><Header /><QsccSurvey /></>} />
      <Route path="/test/qsc-survey-questions" element={<><Header /><QsccQuestion /></>} />
      <Route path="/result" element={<ResultPage />} /> {/* 결과 페이지 라우트 추가 */}
    </Routes>
  );
}

export default App;