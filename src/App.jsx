// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import MainPage from './pages/MainPage.jsx';
import Login from './pages/Login.jsx';

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
    </Routes>
  );
}

export default App;