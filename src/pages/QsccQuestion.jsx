// src/pages/QsccQuestion.jsx (수정된 전체 코드)

import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import { useNavigate } from 'react-router-dom';
import questionsData from '../../public/qscc/data/qsccii.json';
import './QsccQuestion.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // 화살표 아이콘 재사용

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

  const totalQuestions = questionsData.questions.length;
  const currentQuestion = questionsData.questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const progressPercentage = (answeredCount / totalQuestions) * 100;

  // **페이지 로직을 위한 상수 및 계산**
  const questionsPerPage = 10;
  // 현재 보고 있는 문제 그룹의 시작 인덱스 (0, 10, 20, ...)
  const startQuestionIndex = Math.floor(currentQuestionIndex / questionsPerPage) * questionsPerPage;
  // 현재 보고 있는 문제 그룹의 마지막 문제 번호 (10, 20, 30, ...)
  const endQuestionNumber = Math.min(startQuestionIndex + questionsPerPage, totalQuestions);
  
  // 현재 문제 그룹에 해당하는 문제 배열
  const visibleQuestions = questionsData.questions.slice(startQuestionIndex, endQuestionNumber);

  // **네비게이션 버튼 활성화/비활성화/표시 조건**
  const isFirstPage = startQuestionIndex === 0; // 1~10번 문제 그룹
  const isLastPage = endQuestionNumber === totalQuestions; // 마지막 문제 그룹 (예: 51~54)

  // 답변 처리 함수
  const handleAnswer = (optionId) => {
    const newAnswers = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(newAnswers);

    const isLastOfCurrentPage = (currentQuestionIndex + 1) % questionsPerPage === 0 || currentQuestionIndex === totalQuestions - 1;

    if (currentQuestionIndex === totalQuestions - 1) {
      alert('모든 설문이 완료되었습니다!');
      // 최종 결과 페이지 이동 로직 추가 (필요하다면)
    } else if (isLastOfCurrentPage && !isLastPage) {
        // 현재 페이지의 마지막 문제를 답변하고, 아직 마지막 페이지가 아니라면, 다음 페이지로 바로 이동
        setTimeout(() => {
          setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }, 300);
    } else {
        // 일반적인 다음 문제로 이동
        setTimeout(() => {
          setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }, 300);
    }
  };

  // **이전 페이지(10문제 묶음)로 이동**
  const handlePagerPrev = () => {
    if (startQuestionIndex > 0) {
      setCurrentQuestionIndex(startQuestionIndex - questionsPerPage);
    }
  };

  // **다음 페이지(10문제 묶음)로 이동**
  const handlePagerNext = () => {
    if (endQuestionNumber < totalQuestions) {
      // 다음 페이지의 첫 번째 문제로 이동
      setCurrentQuestionIndex(endQuestionNumber);
    }
  };

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
                
                <div className="option-divider"></div> 
                
                <div className="option-description">
                  {(Array.isArray(option.desc) ? option.desc : [option.desc]).map((desc, i) => (
                      <p key={i}>{desc}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="navigation-footer">
            
            {/* 좌측 화살표 (이전 페이지) - 첫 페이지(1~10번)일 때는 숨김 처리 */}
            {!isFirstPage && (
              <button 
                className="nav-arrow prev-button" 
                onClick={handlePagerPrev}
              >
                <FaChevronLeft />
              </button>
            )}
            {/* 좌측 화살표가 숨겨질 때 공간 확보를 위해 더미 요소 추가 */}
            {isFirstPage && <div className="nav-arrow-placeholder"></div>}
            
            <div className="pager-wrapper">
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
            </div>
            
            {/* 우측 화살표 (다음 페이지) - 마지막 페이지일 때는 숨김 처리 */}
            {!isLastPage && (
              <button 
                className="nav-arrow next-button" 
                onClick={handlePagerNext}
              >
                <FaChevronRight />
              </button>
            )}
            {/* 우측 화살표가 숨겨질 때 공간 확보를 위해 더미 요소 추가 */}
            {isLastPage && <div className="nav-arrow-placeholder"></div>}

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