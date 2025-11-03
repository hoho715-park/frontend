import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import CalendarModal from "../components/CalendarModal.jsx";
import "./MyPage.css";

const MyPage = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "사용자";
  const bodyType = localStorage.getItem("bodyType") || "태양인";
  const userId = localStorage.getItem("userId") || null;

  const [iconColor, setIconColor] = useState(
    localStorage.getItem("profileColor") || "#9c89ff"
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.clear();
      alert("로그아웃 되었습니다.");
      navigate("/login");
    }
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setIconColor(newColor);
    localStorage.setItem("profileColor", newColor);
    window.dispatchEvent(
      new StorageEvent("storage", { key: "profileColor", newValue: newColor })
    );
  };

  useEffect(() => {
    const savedColor = localStorage.getItem("profileColor");
    if (savedColor) setIconColor(savedColor);
  }, []);

  const handleOpenCalendar = () => {
    if (!userId) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }
    setIsCalendarOpen(true);
  };

  return (
    <>
      <Header />
      <div className="mypage-container">
        <div className="mypage-sidebar">
          <div className="mypage-section">
            <div className="mypage-section-title">프로필</div>
            <div className="mypage-profile-card">
              <FaUserCircle
                className="mypage-profile-icon"
                color={iconColor}
                size={110}
              />
              <h2 className="mypage-username">{username}</h2>
              <label className="mypage-change-profile">
                프로필 색상 변경하기
                <input
                  type="color"
                  value={iconColor}
                  onChange={handleColorChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>

          <div className="mypage-section">
            <div className="mypage-section-title">조회하기</div>
            <button className="mypage-btn" onClick={handleOpenCalendar}>
              장기수치 기록 조회하기
            </button>
            <button className="mypage-btn">QSCC 설문 결과 확인하기</button>
          </div>

          <div className="mypage-section">
            <div className="mypage-section-title">설정하기</div>
            <button className="mypage-btn edit">회원정보 수정하기</button>
            <button className="mypage-btn delete">회원 탈퇴하기</button>
          </div>

          <div className="mypage-section">
            <div className="mypage-section-title">로그아웃</div>
            <button className="mypage-btn logout" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        </div>

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

      {isCalendarOpen && (
        <CalendarModal
          onClose={() => setIsCalendarOpen(false)}
          userId={userId}
        />
      )}
    </>
  );
};

export default MyPage;
