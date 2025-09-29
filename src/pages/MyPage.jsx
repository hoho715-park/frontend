// src/pages/MyPage.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";

const MyPage = () => {
  const username = localStorage.getItem("username") || "사용자";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="mypage-container">
      <h1>{username}님 환영합니다 🎉</h1>
      <button className="logout-button" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
