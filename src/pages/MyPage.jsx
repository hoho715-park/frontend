import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import CalendarModal from "../components/CalendarModal.jsx";
import MissionModal from "../components/MissionModal.jsx";
import BadgeModal from "../components/BadgeModal.jsx";
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
  const [isBadgeOpen, setIsBadgeOpen] = useState(false);

  // ✅ 미션 진행 상태
  const [missionProgress, setMissionProgress] = useState(
    Number(localStorage.getItem("missionProgress")) || 0
  );

  // ✅ 식물 성장 상태
  const [level, setLevel] = useState(missionProgress);
  const [plantImage, setPlantImage] = useState(`/mypage/level_${level}.png`);
  const [fade, setFade] = useState(false);

  // ✅ 배지 관련
  const [badgeEarned, setBadgeEarned] = useState(false);
  const [earnedBadgeInfo, setEarnedBadgeInfo] = useState(null);

  // ✅ 체질 정보 불러오기
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

  // ✅ 페이지 진입 시 미션 진행도 반영
  useEffect(() => {
    const savedProgress = Number(localStorage.getItem("missionProgress")) || 0;
    setMissionProgress(savedProgress);
    setLevel(savedProgress);
  }, []);

  // ✅ localStorage 변경 감지
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedProgress =
        Number(localStorage.getItem("missionProgress")) || 0;
      setMissionProgress(updatedProgress);
      setLevel(updatedProgress);
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ 색상 복원
  useEffect(() => {
    const savedColor = localStorage.getItem("profileColor");
    if (savedColor) setIconColor(savedColor);
  }, []);

  // ✅ 식물 성장 애니메이션 (버그 수정 완성 버전)
  useEffect(() => {
    const prevLevel = Number(localStorage.getItem("prevLevel")) || 0;

    // 🔹 MyPage 첫 진입 시 이전 단계와 현재 단계 다르면 애니메이션 강제 실행
    if (prevLevel !== level) {
      setFade(true);

      const timeout = setTimeout(() => {
        setPlantImage(`/mypage/level_${level}.png`);
        setFade(false);
        localStorage.setItem("prevLevel", level);
      }, 700);

      return () => clearTimeout(timeout);
    }
  }, [level]); // missionProgress 제거

  // ✅ 미션 진행 업데이트
  const handleMissionProgress = (count) => {
    setMissionProgress(count);
    setLevel(count);
    localStorage.setItem("missionProgress", count);

    // ✅ 배지 지급 처리
    if (count === 4) {
      const today = new Date().toISOString().split("T")[0];
      const newBadge = {
        id: 1,
        image: "/mypage/badge/badge_1.png",
        date: today,
      };

      const badges = JSON.parse(localStorage.getItem("badges") || "[]");
      const alreadyEarned = badges.find((b) => b.date === today);

      if (!alreadyEarned) {
        badges.push(newBadge);
        localStorage.setItem("badges", JSON.stringify(badges));

        setEarnedBadgeInfo(newBadge);
        setBadgeEarned(true);
        setTimeout(() => setBadgeEarned(false), 4000);
      }
    }
  };

  // ✅ 로그아웃
  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.clear();
      navigate("/login");
    }
  };

  // ✅ 색상 변경
  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setIconColor(newColor);
    localStorage.setItem("profileColor", newColor);
    window.dispatchEvent(
      new CustomEvent("profileColorChange", { detail: newColor })
    );
  };

  // ✅ 캘린더
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
            <div
              className={`mypage-character-placeholder ${fade ? "fade" : ""}`}
            >
              <img
                src={plantImage}
                alt={`level ${level}`}
                style={{ width: "300px", height: "300px" }}
              />
            </div>

            <div className="mypage-gauge-bar">
              <div
                className="mypage-gauge-fill"
                style={{ width: `${(level / 4) * 100}%` }}
              ></div>
            </div>

            <div className="mypage-button-row">
              <button
                className="mypage-mission-btn"
                onClick={() => setIsMissionOpen(true)}
              >
                오늘의 미션 확인하기
              </button>
              <button
                className="mypage-badge-btn"
                onClick={() => setIsBadgeOpen(true)}
              >
                뱃지 도감 보기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ 모달 */}
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

      {isBadgeOpen && <BadgeModal onClose={() => setIsBadgeOpen(false)} />}

      {/* ✅ 배지 획득 연출 */}
      {badgeEarned && earnedBadgeInfo && (
        <div className="badge-popup-fullscreen">
          <div className="badge-popup-content">
            <img
              src={earnedBadgeInfo.image}
              alt="획득한 배지"
              className="badge-popup-img-big"
            />
            <p className="badge-popup-text-big">
              🎉 뱃지 획득! ({earnedBadgeInfo.date})
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default MyPage;
