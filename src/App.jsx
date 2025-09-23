// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import MainPage from './pages/MainPage.jsx';
import Login from './pages/Login.jsx';
import IntroIeum from './pages/IntroIeum.jsx';
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
      {/* SignUp 페이지 라우트 추가 */}
      <Route path="/signup" element={<SignUp />} /> 
    </Routes>
  );
}

export default App;