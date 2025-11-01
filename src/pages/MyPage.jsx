// src/pages/MyPage.jsx
import React from "react";
import Header from "../components/Header.jsx";
import "./MyPage.css";

const MyPage = () => {
  const username = localStorage.getItem("username") || "박성호";
  const bodyType = localStorage.getItem("bodyType") || "태양인";

  return (
    <>
      <Header />
      <div className="mypage-wrapper">
        {/* 좌측 영역 */}
        <div className="mypage-sidebar">
          <div className="mypage-profile-card">
            <img
              src="/default_profile.png"
              alt="프로필 이미지"
              className="mypage-profile-image"
            />
            <h2 className="mypage-profile-name">{username}</h2>
          </div>

          <div className="mypage-section">
            <button className="mypage-btn">장기수치 기록 조회하기</button>
            <button className="mypage-btn">QSCC 설문 결과 확인하기</button>
          </div>

          <div className="mypage-section">
            <button className="mypage-btn">회원정보 수정하기</button>
            <button className="mypage-btn mypage-delete">회원 탈퇴하기</button>
          </div>
        </div>

        {/* 우측 캐릭터 섹션 */}
        <div className="mypage-main">
          <h1 className="mypage-bodytype-title">{bodyType}</h1>

          <div className="mypage-character-section">
            <div className="mypage-character-box">
              <img
                src={`/characters/${bodyType}_character.png`}
                alt={`${bodyType} 캐릭터`}
                className="mypage-character-image"
              />
              <div className="mypage-gauge-bar">게이지</div>
            </div>

            <button className="mypage-mission-btn">오늘의 미션 확인하기</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
