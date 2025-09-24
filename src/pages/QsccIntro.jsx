// src/pages/QsccIntro.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import './QsccIntro.css';

const questions = [
  {
    id: 1,
    question: 'QSCC 설문이란 무엇인가요?',
    answer: 'QSCC는 사상체질의학을 기반으로 개인의 체질을 과학적으로 분석하는 설문지입니다. 이 설문을 통해 자신의 체질 특성과 건강 상태에 대한 깊은 이해를 얻을 수 있습니다.',
  },
  {
    id: 2,
    question: '왜 QSCC 설문을 해야 하나요?',
    answer: 'QSCC 설문은 자신의 체질을 정확히 파악하여, 그에 맞는 맞춤형 건강 관리법과 생활 습관을 찾도록 돕습니다. 건강한 삶을 위한 첫걸음이 될 수 있습니다.',
  },
  {
    id: 3,
    question: '설문 결과는 어떻게 활용되나요?',
    answer: '설문 결과를 바탕으로 자신의 체질에 맞는 식단, 운동, 예방법 등을 추천받을 수 있습니다. 또한, 전문가와 상담 시 유용한 기초 자료로 활용될 수 있습니다.',
  },
];

const QsccIntro = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <>
      <Header />
      <div className="qscc-intro-container">
        <div className="qscc-intro-box">
          <div className="qscc-question-box">
            <h2 className="qscc-question-title">
              Q{currentQuestion.id}. {currentQuestion.question}
            </h2>
            <p className="qscc-answer-text">{currentQuestion.answer}</p>
          </div>
          <div className="navigation-buttons">
            {!isLastQuestion && (
              <button onClick={handleNext} className="next-button">
                다음
              </button>
            )}
            {isLastQuestion && (
              <Link to="/test/qsc-survey" className="start-button">
                테스트 시작하기
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QsccIntro;