// src/pages/AboutService.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./AboutService.css";

const AboutService = () => {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      id: 1,
      title: "01. 이음 서비스 소개",
      desc: "건강한 하루를 위한 맞춤형 체질 분석 서비스",
      bg: "#e9e3ff",
    },
    {
      id: 2,
      title: "02. 손바닥 측정",
      desc: "손바닥 5포인트 데이터를 기반으로 체질을 시각화합니다.",
      bg: "#f0f8ff",
    },
    {
      id: 3,
      title: "03. 설문 기반 분석",
      desc: "QSCC-II 설문을 통해 체질적 성향을 정확히 파악합니다.",
      bg: "#fff0f6",
    },
    {
      id: 4,
      title: "04. 개인 맞춤 제안",
      desc: "당신의 체질에 맞는 식단, 운동, 생활 루틴을 추천합니다.",
      bg: "#f6fff0",
    },
  ];

  // ✅ 스크롤 이벤트로 섹션 전환
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
      }, 900); // 전환 속도와 맞춰 조절
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentSection]);

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
            <h1>{section.title}</h1>
            <p>{section.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AboutService;
