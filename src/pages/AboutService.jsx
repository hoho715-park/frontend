import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./AboutService.css";

const AboutService = () => {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      id: 1,
      type: "simple",
      title: "01. 이음 서비스",
      desc: "이음 서비스는 당신의 사상체질을 예측해줍니다.",
      bg: "#e9e3ff",
    },
    {
      id: 2,
      type: "simple",
      title: "02. 추천 서비스",
      desc: "예측된 체질을 바탕으로\n당신에게 딱 맞는 모든 것을\n추천해줍니다.",
      bg: "#f0f8ff",
    },
    {
      id: 3,
      type: "action",
      title: "03. 예측 서비스",
      desc: "저희 이음 서비스는 두 가지 방법으로 사상체질을 예측해줍니다.",
      bg: "#fff0f6",
    },
  ];

  useEffect(() => {
    let isScrolling = false;
    const handleWheel = (e) => {
      if (isScrolling) return;
      isScrolling = true;

      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        setCurrentSection((prev) => prev + 1);
      } else if (e.deltaY < 0 && currentSection > 0) {
        setCurrentSection((prev) => prev - 1);
      }

      setTimeout(() => {
        isScrolling = false;
      }, 900);
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentSection]);

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  return (
    <>
      <Header />
      <div className="about-service-container">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`about-service-section ${
              index === currentSection
                ? "active"
                : index < currentSection
                ? "above"
                : "below"
            }`}
            style={{ backgroundColor: section.bg }}
          >
            {/* ✅ 기본 텍스트 섹션 */}
            {section.type === "simple" && (
              <div className="simple-section">
                <h1 className="simple-title">{section.title}</h1>
                <p className="simple-desc">
                  {section.desc.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
            )}

            {/* ✅ 액션 버튼 섹션 */}
            {section.type === "action" && (
              <div className="action-section">
                <h1 className="simple-title">{section.title}</h1>
                <p className="simple-desc">{section.desc}</p>
                <div className="action-button-group">
                  <button
                    className="action-btn qscc-btn"
                    onClick={() => handleNavigate("/test/qsc-survey")}
                  >
                    QSCC 설문을 통한 사상체질 알아보기
                  </button>
                  <button
                    className="action-btn bio-btn"
                    onClick={() => handleNavigate("/input")}
                  >
                    생체전류를 통한 사상체질 알아보기
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default AboutService;
