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
import QsccIntro from './pages/QsccIntro.jsx'; // QsccIntro 컴포넌트 import

function App() {
  return (
    <Routes>
      <Route path="/" element={<><Header /><MainPage /></>} />
      <Route path="/login" element={<Login />} />
      <Route path="/about/ieum" element={<><Header /><IntroIeum /></>} />
      <Route path="/input" element={<InputStart />} />
      <Route path="/input/measure" element={<InputMeasure />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/test/qsc-intro" element={<><Header /><QsccIntro /></>} /> {/* QSCC 소개 페이지 라우트 추가 */}
      <Route path="/test/qsc-survey" element={<><Header /><div>QSCC 설문 페이지 (추후 구현)</div></>} /> {/* 설문 페이지 임시 라우트 */}
    </Routes>
  );
}

export default App;