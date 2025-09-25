// src/pages/QsccQuestion.jsx

import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import { useNavigate } from 'react-router-dom';
import questionsData from '../../public/qscc/data/qsccii.json';
import './QsccQuestion.css';
import { FaCheckCircle, FaCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // 화살표 아이콘 import

const QsccQuestion = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  if (!questionsData || !questionsData.questions) {
    return (
      <>
        <Header />
        <div className="qscc-question-container">
          <p>설문 데이터를 불러오는 중입니다...</p>
        </div>
      </>
    );
  }

  const currentQuestion = questionsData.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questionsData.questions.length - 1;
  const answeredCount = Object.keys(answers).length;

  const handleAnswer = (optionId) => {
    const newAnswers = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      alert('모든 설문이 완료되었습니다!');
    } else {
      setTimeout(() => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      }, 300);
    }
  };

  // 페이저 로직
  const questionsPerPage = 10;
  const totalQuestions = questionsData.questions.length;
  const startQuestionIndex = Math.floor(currentQuestionIndex / questionsPerPage) * questionsPerPage;
  const endQuestionIndex = Math.min(startQuestionIndex + questionsPerPage, totalQuestions);
  const visibleQuestions = questionsData.questions.slice(startQuestionIndex, endQuestionIndex);
  
  const handlePagerPrev = () => {
    if (startQuestionIndex > 0) {
      setCurrentQuestionIndex(startQuestionIndex - questionsPerPage);
    }
  };

  const handlePagerNext = () => {
    if (endQuestionIndex < totalQuestions) {
      setCurrentQuestionIndex(startQuestionIndex + questionsPerPage);
    }
  };

  const progressPercentage = (answeredCount / totalQuestions) * 100;

  return (
    <>
      <Header />
      <div className="qscc-question-container">
        <div className="qscc-question-box">
          <div className="question-header">
            <h2 className="question-title">{currentQuestion.title}</h2>
            <p className="question-text">{currentQuestion.text}</p>
          </div>

          <div className="options-container">
            {currentQuestion.options.map(option => (
              <div
                key={option.id}
                className={`option-card ${answers[currentQuestion.id] === option.id ? 'selected' : ''}`}
                onClick={() => handleAnswer(option.id)}
              >
                <div className="option-image-wrapper">
                  <img src={option.image.src} alt={option.label} className="option-image" />
                </div>
                <div className="option-label">{option.label}</div>
                <div className="option-description">{option.description}</div>
              </div>
            ))}
          </div>

          <div className="navigation-footer">
            <button className="nav-arrow prev-button" onClick={handlePagerPrev} disabled={startQuestionIndex === 0}>
              <FaChevronLeft />
            </button>
            <div className="pager">
              {visibleQuestions.map((q, index) => {
                const questionNumber = startQuestionIndex + index + 1;
                const isAnswered = answers[q.id];
                const isActive = currentQuestionIndex === startQuestionIndex + index;
                
                let dotClass = '';
                if (isActive) {
                    dotClass = 'active';
                } else if (isAnswered) {
                    dotClass = 'answered';
                }
                
                return (
                  <span
                    key={q.id}
                    className={`pager-dot ${dotClass}`}
                    onClick={() => setCurrentQuestionIndex(startQuestionIndex + index)}
                  >
                    {questionNumber}
                  </span>
                );
              })}
            </div>
            <button className="nav-arrow next-button" onClick={handlePagerNext} disabled={endQuestionIndex >= totalQuestions}>
              <FaChevronRight />
            </button>
          </div>
          
          <div className="progress-counter-and-bar">
            <div className="progress-counter">
              {answeredCount} / {totalQuestions}
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QsccQuestion;