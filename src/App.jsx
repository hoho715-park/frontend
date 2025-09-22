// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import MainPage from './pages/MainPage.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx'; // SignUp 컴포넌트 추가

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
      <Route path="/signup" element={<SignUp />} /> {/* SignUp 라우트 추가 */}
    </Routes>
  );
}

export default App;