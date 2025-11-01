import React from "react";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";

const MyPage = () => {
  const navigate = useNavigate();

  // ✅ 로그인 시 저장된 정보 불러오기
  const username = localStorage.getItem("username") || "사용자";
  const gender = localStorage.getItem("gender") || "male"; // "male" 또는 "female"
  const bodyType = localStorage.getItem("bodyType") || "태양인";

  // ✅ 성별별 프로필 이미지 지정
  const profileImage =
    gender === "female" ? "/girl_profile.png" : "/boy_profile.png";

  // ✅ 로그아웃 기능
  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.clear();
      alert("로그아웃 되었습니다.");
      navigate("/login"); // 로그인 페이지로 이동 (메인으로 가도 됨)
    }
  };

  return (
    <>
      <Header />
      <div className="mypage-container">
        {/* ===== 왼쪽 사이드바 ===== */}
        <div className="mypage-sidebar">
          {/* 프로필 카드 */}
          <div className="mypage-profile-card">
            <div className="mypage-profile-image-wrapper">
              <img
                src={profileImage}
                alt="프로필 이미지"
                className="mypage-profile-image"
              />
            </div>
            <h2 className="mypage-username">{username}</h2>
          </div>

          {/* 기능 섹션 */}
          <div className="mypage-section">
            <button className="mypage-btn">장기수치 기록 조회하기</button>
            <button className="mypage-btn">QSCC 설문 결과 확인하기</button>
          </div>

          {/* 회원 정보 섹션 */}
          <div className="mypage-section">
            <button className="mypage-btn">회원정보 수정하기</button>
            <button className="mypage-btn delete">회원 탈퇴하기</button>
          </div>

          {/* ✅ 로그아웃 버튼 섹션 */}
          <div className="mypage-section logout-box">
            <button className="mypage-btn logout" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        </div>

        {/* ===== 오른쪽 캐릭터 영역 ===== */}
        <div className="mypage-main">
          <h1 className="mypage-bodytype-title">{bodyType}</h1>

          <div className="mypage-character-box">
            <div className="mypage-character-placeholder">
              <p className="mypage-character-label">캐릭터</p>
            </div>
            <div className="mypage-gauge-bar">
              <div className="mypage-gauge-fill"></div>
            </div>
            <button className="mypage-mission-btn">오늘의 미션 확인하기</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
