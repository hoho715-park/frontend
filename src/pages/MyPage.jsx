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

  const [bodyType, setBodyType] = useState("확인 중...");
  const [iconColor, setIconColor] = useState(
    localStorage.getItem("profileColor") || "#9c89ff"
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isMissionOpen, setIsMissionOpen] = useState(false);

  const [missionProgress, setMissionProgress] = useState(
    Number(localStorage.getItem("missionProgress")) || 0
  );

  // ✅ 식물 애니메이션용 상태
  const [level, setLevel] = useState(missionProgress);
  const [plantImage, setPlantImage] = useState(`/mypage/level_${level}.png`);
  const [fade, setFade] = useState(false);

  // ✅ 체질 데이터 불러오기
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
      .catch((err) => console.error("체질 정보 불러오기 실패:", err));
  }, [userId]);

  // ✅ fade 효과로 식물 이미지 전환
  useEffect(() => {
    setFade(true);
    const timeout = setTimeout(() => {
      setPlantImage(`/mypage/level_${level}.png`);
      setFade(false);
    }, 700); // 0.7초 후 이미지 변경
    return () => clearTimeout(timeout);
  }, [level]);

  // ✅ 미션 완료 → 레벨 변경
  const handleMissionProgress = (count) => {
    setMissionProgress(count);
    localStorage.setItem("missionProgress", count);

    // ✅ 팝업 닫힌 후 0.5초 뒤에 레벨업 애니메이션 시작
    setTimeout(() => {
      setLevel(count);
    }, 500);
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
        <div className="mypage-sidebar">
          {/* 프로필, 조회, 설정, 로그아웃 영역 그대로 유지 */}
        </div>

        <div className="mypage-main">
          <h1 className="mypage-bodytype-title">{bodyType}</h1>

          <div className="mypage-character-box">
            {/* ✅ fade 클래스 추가 */}
            <div className={`mypage-character-placeholder ${fade ? "fade" : ""}`}>
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

      {isCalendarOpen && (
        <CalendarModal onClose={() => setIsCalendarOpen(false)} userId={userId} />
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
