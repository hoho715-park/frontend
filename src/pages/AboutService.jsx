import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./AboutService.css";

const AboutService = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSections = 3;
  const navigate = useNavigate(); // ✅ 페이지 이동용 hook

  // ✅ 스크롤 이동 제어
  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      if (e.deltaY > 0 && currentIndex < totalSections - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [currentIndex]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  // ✅ 버튼 클릭 시 페이지 이동
  const goToQSCC = () => navigate("/test/qsc-survey"); 
  const goToInput = () => navigate("/input");

  return (
    <>
      <Header />
      <div className="about-service-container">
        {/* 왼쪽 진행도 표시 */}
        <div className="page-indicator">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`dot ${currentIndex === index ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            ></div>
          ))}
        </div>

        {/* 01. 이음 서비스 */}
        <section
          className={`about-service-section ${
            currentIndex === 0 ? "active" : currentIndex > 0 ? "above" : "below"
          } section1`}
        >
          <h1 className="simple-title">01. 이음 서비스</h1>
          <p className="simple-desc">
            이음 서비스는{"\n"}당신의 사상체질을{"\n"}예측해줍니다.
          </p>
        </section>

        {/* 02. 추천 서비스 */}
        <section
          className={`about-service-section ${
            currentIndex === 1 ? "active" : currentIndex > 1 ? "above" : "below"
          } section2`}
        >
          <h1 className="simple-title">02. 추천 서비스</h1>
          <p className="simple-desc">
            예측된 체질을 바탕으로{"\n"}당신에게 딱 맞는 모든 것을{"\n"}추천해줍니다.
          </p>
        </section>

        {/* 03. 예측 서비스 */}
        <section
          className={`about-service-section ${
            currentIndex === 2 ? "active" : "below"
          } section3`}
        >
          <h1 className="simple-title">03. 예측 서비스</h1>
          <p className="simple-desc">
            저희 이음 서비스는 두 가지 방법으로{"\n"}사상체질을 예측해줍니다.
          </p>
          <div className="action-button-group">
            <button className="action-btn qscc-btn" onClick={goToQSCC}>
              QSCC 설문을 통한 사상체질 알아보기
            </button>
            <button className="action-btn bio-btn" onClick={goToInput}>
              생체전류를 통한 사상체질 알아보기
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutService;
