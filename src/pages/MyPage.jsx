import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import CalendarModal from "../components/CalendarModal.jsx";
import MissionModal from "../components/MissionModal.jsx";
import "./MyPage.css";

const MyPage = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "사용자";
  const userId = localStorage.getItem("userId") || null;

  // ✅ 체질 (DB에서 자동 계산)
  const [bodyType, setBodyType] = useState("확인 중...");

  // ✅ 프로필 색상
  const [iconColor, setIconColor] = useState(
    localStorage.getItem("profileColor") || "#9c89ff"
  );

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isMissionOpen, setIsMissionOpen] = useState(false);

  // ✅ 미션 진행 상태
  const [missionProgress, setMissionProgress] = useState(
    Number(localStorage.getItem("missionProgress")) || 0
  );

  // ✅ 식물 레벨 = 미션 진행도
  const [level, setLevel] = useState(missionProgress);
  const plantImage = `/mypage/level_${level}.png`;

  // ✅ 체질 데이터 가져오기 (백엔드에서 계산)
  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:8080/api/measurements/${userId}/dominant`)
      .then((res) => res.text())
      .then((data) => {
        if (data && data !== "데이터 없음") {
          setBodyType(data);
          localStorage.setItem("bodyType", data);
        } else {
          setBodyType("분석 중");
        }
      })
      .catch((err) => {
        console.error("체질 정보 불러오기 실패:", err);
        setBodyType("오류");
      });
  }, [userId]);

  // ✅ 색상 복원
  useEffect(() => {
    const savedColor = localStorage.getItem("profileColor");
    if (savedColor) setIconColor(savedColor);
  }, []);

  // ✅ 미션 진행도 저장
  const handleMissionProgress = (count) => {
    setMissionProgress(count);
    setLevel(count);
    localStorage.setItem("missionProgress", count);
  };

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
        {/* ✅ 사이드바 */}
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

        {/* ✅ 메인 영역 */}
        <div className="mypage-main">
          <h1 className="mypage-bodytype-title">{bodyType}</h1>

          <div className="mypage-character-box">
            <div className="mypage-character-placeholder">
              <img
                src={plantImage}
                alt={`level ${level}`}
                style={{ width: "240px", height: "240px" }}
              />
            </div>

            <div className="mypage-gauge-bar">
              <div
                className="mypage-gauge-fill"
                style={{ width: `${(level / 4) * 100}%` }}
              ></div>
            </div>

            <button
              className="mypage-mission-btn"
              onClick={() => setIsMissionOpen(true)}
            >
              오늘의 미션 확인하기
            </button>
          </div>
        </div>
      </div>

      {/* ✅ 모달 표시 */}
      {isCalendarOpen && (
        <CalendarModal
          onClose={() => setIsCalendarOpen(false)}
          userId={userId}
        />
      )}

      {isMissionOpen && (
        <MissionModal
          bodyType={bodyType}
          onClose={() => setIsMissionOpen(false)}
          onProgressChange={handleMissionProgress}
        />
      )}
    </>
  );
};

export default MyPage;
