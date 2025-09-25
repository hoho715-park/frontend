// src/pages/QsccQuestion.jsx

import React, { useState } from 'react'; 
import Header from '../components/Header.jsx';
import { useNavigate } from 'react-router-dom';
import questionsData from '../../public/qscc/data/qsccii.json'; 
import SurveyModal from '../components/SurveyModal.jsx';
import './QsccQuestion.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const QsccQuestion = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [modalType, setModalType] = useState(null); // 'incomplete' 또는 'complete'
  const [isPatchingMode, setIsPatchingMode] = useState(false); // **[NEW] 패치 모드 상태**

  // 데이터 로딩 및 검증
  if (!questionsData || !questionsData.questions || questionsData.questions.length === 0) {
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
  // 문제 ID는 number 타입으로 저장되어 있다고 가정
  const allQuestionIds = questionsData.questions.map(q => q.id);
  const answeredCount = Object.keys(answers).length;

  // 팝업 관련 함수
  const getUnansweredList = (currentAnswers) => {
    const answeredIds = new Set(Object.keys(currentAnswers).map(Number)); 
    // 미응답 문항 ID (숫자)를 오름차순으로 정렬하여 반환
    return allQuestionIds.filter(qId => !answeredIds.has(qId)).sort((a, b) => a - b);
  };

  const handleModalClose = () => {
    setModalType(null);
  };
  
  const handleNavigateToQuestion = (qId) => {
    const targetIndex = questionsData.questions.findIndex(q => q.id === qId);
    
    if (targetIndex !== -1) {
      setCurrentQuestionIndex(targetIndex);
      setModalType(null);
      setIsPatchingMode(true); // **[NEW] 모달을 통해 이동하면 패치 모드 활성화**
    }
  };
  
  const handleViewResults = () => {
    setModalType(null);
    navigate('/results-qscc', { state: { answers: answers } }); 
  };

  // 답변 처리 로직 (핵심 수정 부분)
  const handleAnswer = (optionId) => {
    const currentQId = currentQuestion.id;
    
    // 1. 답변 저장
    const newAnswers = { ...answers, [currentQId]: optionId };
    setAnswers(newAnswers);
    
    // 2. 업데이트된 미응답 문항 리스트 및 완료 여부 확인
    const unansweredAfterAnswer = getUnansweredList(newAnswers); 
    const isCompleted = unansweredAfterAnswer.length === 0;

    if (isCompleted) {
        // 모든 문항 완료 시: 즉시 결과보기 팝업 (이전 요청사항)
        setTimeout(() => {
            setModalType('complete');
        }, 100);
        setIsPatchingMode(false); // 완료되면 모드 해제
        return; 
    }
    
    // 3. 패치 모드 (미응답 문항 채우는 중) 로직
    if (isPatchingMode) {
        // 현재 답변한 문제 이후에 남아있는 미응답 문제 중 가장 첫 번째 문제 ID를 찾습니다.
        const nextUnansweredId = unansweredAfterAnswer.find(qId => qId > currentQId);
        
        if (nextUnansweredId) {
            // 미응답 문제(예: 29번)가 존재하면, 그 문제로 이동
            const targetIndex = questionsData.questions.findIndex(q => q.id === nextUnansweredId);
            if (targetIndex !== -1) {
                 setTimeout(() => {
                    setCurrentQuestionIndex(targetIndex);
                    // isPatchingMode는 유지 (다음 미응답 문제로 계속 점프해야 하므로)
                }, 300);
                return;
            }
        } 
        
        // 다음 미응답 문제가 없거나 찾지 못했다면, 패치 모드를 해제합니다.
        // (예: 29번을 풀었는데 더 이상 미응답 문항이 없는 경우)
        setIsPatchingMode(false);
    }

    // 4. 일반적인 순차 이동 또는 54번 완료 처리
    
    if (currentQuestionIndex === totalQuestions - 1) {
        // 54번을 풀었지만 아직 미응답 문항이 남아있다면, 미완료 팝업 표시
        setTimeout(() => {
            setModalType('incomplete');
        }, 100);
        return;
    }
    
    // 순차 이동 (패치 모드가 아니거나, 패치 모드가 해제된 경우)
    setTimeout(() => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }, 300);
  };

  // Pager 클릭 시 완료 체크 로직 (유지)
  const handlePagerClick = (index) => {
      setCurrentQuestionIndex(index);
  }


  // --- Pager 및 렌더링 로직 (유지) ---
  const questionsPerPage = 10;
  const startQuestionIndex = Math.floor(currentQuestionIndex / questionsPerPage) * questionsPerPage;
  const endQuestionNumber = Math.min(startQuestionIndex + questionsPerPage, totalQuestions);
  const visibleQuestions = questionsData.questions.slice(startQuestionIndex, endQuestionNumber);
  
  const handlePagerPrev = () => {
    if (startQuestionIndex > 0) {
      setCurrentQuestionIndex(startQuestionIndex - questionsPerPage);
    }
  };

  const handlePagerNext = () => {
    if (endQuestionNumber < totalQuestions) {
      setCurrentQuestionIndex(endQuestionNumber);
    }
  };

  const progressPercentage = (answeredCount / totalQuestions) * 100;
  const isFirstPage = startQuestionIndex === 0;
  const isLastPage = endQuestionNumber === totalQuestions;


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
            
            {/* 좌측 화살표 - 첫 페이지일 때 숨김 */}
            {!isFirstPage && (
              <button 
                className="nav-arrow prev-button" 
                onClick={handlePagerPrev}
              >
                <FaChevronLeft />
              </button>
            )}
            {isFirstPage && <div className="nav-arrow-placeholder"></div>}
            
            <div className="pager-wrapper">
              <div className="pager">
                {visibleQuestions.map((q, index) => {
                  const questionId = q.id;
                  const questionNumber = startQuestionIndex + index + 1;
                  const isAnswered = answers[questionId];
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
                      onClick={() => handlePagerClick(startQuestionIndex + index)}
                    >
                      {questionNumber}
                    </span>
                  );
                })}
              </div>
            </div>
            
            {/* 우측 화살표 - 마지막 페이지일 때 숨김 */}
            {!isLastPage && (
              <button 
                className="nav-arrow next-button" 
                onClick={handlePagerNext}
              >
                <FaChevronRight />
              </button>
            )}
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
      
      {/* 모달 렌더링 */}
      {modalType && (
        <SurveyModal
          type={modalType}
          unansweredQuestions={getUnansweredList(answers)}
          onClose={handleModalClose}
          onNavigate={handleNavigateToQuestion}
          onViewResults={handleViewResults}
        />
      )}
    </>
  );
};

export default QsccQuestion;