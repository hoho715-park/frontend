// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import MainPage from './pages/MainPage.jsx';
import Login from './pages/Login.jsx';
import IntroIeum from './pages/IntroIeum.jsx'; // IntroIeum 컴포넌트 import

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
      <Route path="/about/ieum" element={ // 라우트 추가
        <>
          <Header />
          <IntroIeum />
        </>
      } />
    </Routes>
  );
}

export default App;