// src/pages/QsccIntro.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import './QsccIntro.css';

const questions = [
  {
    id: 1,
    question: 'QSCC 설문은 무엇인가요?',
    answer: 'QSCCⅡ 는 한의학의 사상체질을 과학적으로 분석하기 위해 개발된 표준화된 설문도구입니다. 이 설문지는 전통 한의학 이론을 현대적 연구방법과 결합하여 만들어졌으며, 총 54개의 신중하게 선별된 문항으로 구성되어 있습니다. 이 설문에 답변하면 당신의 체질을 확인할수 있어요!!',
  },
  {
    id: 2,
    question: '54가지 문항은 어떤 유형인가요?',
    answer: 'QSCCⅡ의 54가지 문항은 사상체질을 정확하게 판별하기 위해 네 가지 주요 영역으로 구성되어 있습니다. 신체적 특징은 체형, 얼굴형, 목소리 등을 파악하고, 성격적 특성은 행동양식, 사고방식, 대인관계 성향을 확인합니다. 생리적 반응은 소화력, 땀, 추위/더위 민감도들, 심리적 경향은 감정표현과 스트레스 반응 패턴을 종합적으로 분석합니다.',
  },
  {
    id: 3,
    question: '테스트 결과로 무엇을 알 수 있나요?',
    answer: 'QSCCⅡ 테스트를 통해 나의 사상체질 유형(태양인, 태음인, 소양인, 소음인)을 파악할 수 있습니다. 각 체질별 맞춤형 건강관리 방법과 식이요법 가이드를 제공받아 일상에서 실천 가능한 건강 정보를 얻습니다. 또한 체질에 따른 성격적 특성과 강점 분석을 통해 자신을 더 깊이 이해하고 활용할 수 있는 인사이트를 제공합니다.',
  },
];

const QsccIntro = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0, 1, 2 for questions
  const [isAnswering, setIsAnswering] = useState(false); // 질문/답변 상태 구분

  const handleNext = () => {
    if (isAnswering) {
      setCurrentStep(prevStep => prevStep + 1);
      setIsAnswering(false); // 다음 질문으로 넘어가기
    } else {
      setIsAnswering(true); // 답변 보여주기
    }
  };
  
  const currentItem = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1 && isAnswering;
  const progressPercentage = ((currentStep + 1) / questions.length) * 100;

  return (
    <>
      <Header />
      <div className="qscc-intro-container">
        <div className="qscc-intro-box">
          <div className="image-wrapper">
            {isAnswering ? (
                <img src="/qscc_intro_people2.png" alt="대답하는 사람" className="qscc-image" />
            ) : (
                <img src="/qscc_intro_people1.png" alt="질문하는 사람" className="qscc-image" />
            )}
          </div>
          <div className="dialog-box">
            <h3 className="question-number">{currentStep + 1}번 질문</h3>
            <div className="dialog-text">
                {!isAnswering ? (
                    <p className="dialog-question">{currentItem.question}</p>
                ) : (
                    <p className="dialog-answer">{currentItem.answer}</p>
                )}
            </div>
          </div>
          <div className="navigation-buttons">
            {!isLastStep && (
              <button onClick={handleNext} className="next-button">
                {isAnswering ? '다음' : '답변 보기'}
              </button>
            )}
            {isLastStep && (
              <Link to="/test/qsc-survey" className="start-button">
                테스트 시작하기
              </Link>
            )}
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QsccIntro;