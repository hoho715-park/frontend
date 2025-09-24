// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import MainPage from './pages/MainPage.jsx';
import Login from './pages/Login.jsx';
import IntroIeum from './pages/IntroIeum.jsx';
import InputStart from './pages/Input.jsx'; // 기존 Input 컴포넌트 이름 변경
import InputMeasure from './pages/InputMeasure.jsx'; // InputMeasure 컴포넌트 import
import SignUp from './pages/SignUp.jsx'; // SignUp 컴포넌트 import

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <Header />
          <MainPage />
        </>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/about/ieum" element={
        <>
          <Header />
          <IntroIeum />
        </>
      } />
      <Route path="/input" element={<InputStart />} /> // 시작 페이지 라우트
      <Route path="/input/measure" element={<InputMeasure />} /> // 입력 페이지 라우트
      <Route path="/signup" element={<SignUp />} /> // SignUp 라우트 추가
    </Routes>
  );
}

export default App;