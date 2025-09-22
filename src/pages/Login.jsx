// src/pages/Login.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page-container">
      <div className="login-box">
        <div className="logo-container">
          <img src="/ieum.png" alt="이음 로고" className="ieum-logo" />
        </div>
        <div className="input-group">
          <FaRegUser className="input-icon" />
          <input type="text" placeholder="ID" />
        </div>
        <div className="input-group password-group">
          <FaLock className="input-icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
          />
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button className="login-button">로그인</button>
        <div className="link-group">
          <Link to="/find-id" className="find-link">아이디 찾기</Link>
          <span className="divider">|</span>
          <Link to="/find-password" className="find-link">비밀번호 찾기</Link>
        </div>
        <div className="register-group">
          <span>아직 회원이 아니신가요?</span>
          <Link to="/register" className="register-link">회원가입</Link>
        </div>
        <div className="social-login-section">
          <button className="social-button google">
            <img src="/google_icon.png" alt="구글 로그인" />
            <span>Google로 로그인</span>
          </button>
          <button className="social-button kakao">
            <img src="/kakao_icon.png" alt="카카오 로그인" />
            <span>Kakao로 로그인</span>
          </button>
          <button className="social-button naver">
            <img src="/naver_icon.png" alt="네이버 로그인" />
            <span>Naver로 로그인</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;