import React from "react";
import Header from "../components/Header";
import "./AboutService.css";

const AboutService = () => {
  return (
    <>
      <Header />
      <div className="service-page-container">
        <section className="service-section section1">
          <h1>01. 이음 서비스 소개</h1>
          <p>건강한 하루를 위한 맞춤형 체질 분석 서비스</p>
        </section>

        <section className="service-section section2">
          <h1>02. 손바닥 측정</h1>
          <p>손바닥 5포인트 데이터를 기반으로 체질을 시각화합니다.</p>
        </section>

        <section className="service-section section3">
          <h1>03. 설문 기반 분석</h1>
          <p>QSCC-II 설문을 통해 체질적 성향을 정확히 파악합니다.</p>
        </section>

        <section className="service-section section4">
          <h1>04. 개인 맞춤 제안</h1>
          <p>당신의 체질에 맞는 식단, 운동, 생활 루틴을 추천합니다.</p>
        </section>
      </div>
    </>
  );
};

export default AboutService;
