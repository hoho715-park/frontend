// src/pages/MyPage.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";

const MyPage = () => {
  const userName = localStorage.getItem("userName") || "사용자";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="mypage-container">
      <h1>{userName}님 환영합니다 🎉</h1>
      <button className="logout-button" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
