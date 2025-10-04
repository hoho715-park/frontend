// src/pages/Login.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaRegUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

const API_URL = "http://localhost:8080/api/auth/login";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword((v) => !v);

  const handleLogin = async () => {
    const uid = userId.trim();
    if (!uid || !password) {
      alert("아이디와 비밀번호를 입력해 주세요.");
      return;
    }

    try {
      setSubmitting(true);

      const resp = await axios.post(
        API_URL,
        { userId: uid, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // 성공: HTTP 200 + 필수 키(userId, accessToken) 존재
      const ok =
        resp.status === 200 &&
        resp.data &&
        resp.data.userId &&
        resp.data.accessToken;

      if (!ok) {
        alert("로그인 실패: 응답 형식이 올바르지 않습니다.");
        return;
      }

      // 필요한 최소 정보만 저장
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", resp.data.accessToken);
      localStorage.setItem("userId", resp.data.userId);
      localStorage.setItem("userName", resp.data.userId); // 실명 없으면 userId로 표시

      // 새로고침 없이 라우팅만
      navigate("/");
    } catch (e) {
      const msg =
        e.response?.data?.message ??
        (typeof e.response?.data === "string" ? e.response.data : "") ??
        e.message ??
        "Network Error";
      alert("로그인 실패: " + msg);
    } finally {
      setSubmitting(false);
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
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            autoComplete="username"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLogin();
            }}
          />
        </div>

        <div className="input-group password-group">
          <FaLock className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLogin();
            }}
          />
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="link-group">
          <Link to="/find-id" className="find-link">아이디 찾기</Link>
          <span className="divider">|</span>
          <Link to="/find-password" className="find-link">비밀번호 찾기</Link>
        </div>
        <button className="login-button" onClick={handleLogin}>
          로그인
        </button>
        <div className="register-group">
          <span>아직 회원이 아니신가요?</span>
          <Link to="/signup" className="register-link">회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
