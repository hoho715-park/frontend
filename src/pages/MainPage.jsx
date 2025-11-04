// src/pages/MainPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import MissionModal from "../components/MissionModal";
import "./MainPage.css";

const MainPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [isMissionOpen, setIsMissionOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ 페이지 진입 시 항상 미션 팝업 띄우기
  useEffect(() => {
    setIsMissionOpen(true);
  }, []);

  // ✅ 미션 진행 상태 변화 시 처리
  const handleMissionProgress = (completedCount) => {
    if (completedCount > 0) {
      // 팝업 닫기 먼저 실행
      setIsMissionOpen(false);

      // 0.5초 후 MyPage로 이동 (자연스러운 전환)
      setTimeout(() => {
        navigate("/mypage");
      }, 500);
    }
  };

  return (
    <>
      <Header />
      <section className="main-page-hero">
        <div className="main-text-container">
          <h1 className="text1">“이음, 나의 체질과 하루를 잇다”</h1>
          <p className="text2">당신의 체질을 분석해 건강한 하루를 설계합니다.</p>
          <div className="expand-title" id="text3">
            나의 사상체질 알아보기!
          </div>

          <div
            className="test-button-wrapper"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className={`test-button-main ${isHovered ? "hidden" : ""}`}>
              <span className="text4">테스트하기</span>
              <span className="arrow">→</span>
            </div>
            <div className={`test-button-expand ${isHovered ? "visible" : ""}`}>
              <div className="expand-buttons">
                <Link
                  to="/test/qsc-survey"
                  className="expand-button-1"
                  onMouseEnter={() => setActiveButton("survey")}
                  onMouseLeave={() => setActiveButton(null)}
                >
                  <div className="button-text-wrapper">
                    <span className="text4">QSCC 설문으로 알아보기</span>
                  </div>
                </Link>
                <Link
                  to="/input"
                  className="expand-button-2"
                  onMouseEnter={() => setActiveButton("hand")}
                  onMouseLeave={() => setActiveButton(null)}
                >
                  <div className="button-text-wrapper">
                    <span className="text4">손바닥 장기 수치로 알아보기</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {activeButton === "survey" && (
            <img
              src="/mainpage_survey.png"
              alt="설문지 아이콘"
              className="button-icon-survey animating"
            />
          )}
          {activeButton === "hand" && (
            <img
              src="/mainpage_hand.png"
              alt="손 아이콘"
              className="button-icon-hand animating"
            />
          )}
        </div>
      </section>

      {/* ✅ 오늘의 미션 모달 */}
      {isMissionOpen && (
        <MissionModal
          bodyType={localStorage.getItem("bodyType") || "소양인"}
          onClose={() => setIsMissionOpen(false)}
          onProgressChange={handleMissionProgress}
        />
      )}
    </>
  );
};

export default MainPage;
