// src/pages/Login.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaRegUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        username,
        password,
      });

      if (response.status === 200) {
        // ✅ 로그인 성공 시 localStorage에 상태 저장
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);

        // ✅ 메인페이지로 이동
        navigate("/");
        window.location.reload(); // 헤더 즉시 갱신
      }
    } catch (error) {
      alert("로그인 실패: " + (error.response?.data || "Network Error"));
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-box">
        <div className="logo-container">
          <img src="/ieum.png" alt="이음 로고" className="ieum-logo" />
        </div>
        <div className="input-group">
          <FaRegUser className="input-icon" />
          <input
            type="text"
            placeholder="ID"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group password-group">
          <FaLock className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button className="login-button" onClick={handleLogin}>
          로그인
        </button>
        <div className="link-group">
          <Link to="/find-id" className="find-link">아이디 찾기</Link>
          <span className="divider">|</span>
          <Link to="/find-password" className="find-link">비밀번호 찾기</Link>
        </div>
        <div className="register-group">
          <span>아직 회원이 아니신가요?</span>
          <Link to="/signup" className="register-link">회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
