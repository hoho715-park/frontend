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
  const [isPatchingMode, setIsPatchingMode] = useState(false); // 패치 모드 상태

  // ✅ 데이터 로딩 검증
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
  const allQuestionIds = questionsData.questions.map((q) => q.id);
  const answeredCount = Object.keys(answers).length;

  // ✅ 미응답 문항 리스트 계산
  const getUnansweredList = (currentAnswers) => {
    const answeredIds = new Set(Object.keys(currentAnswers).map(Number));
    return allQuestionIds.filter((qId) => !answeredIds.has(qId)).sort((a, b) => a - b);
  };

  const handleModalClose = () => setModalType(null);

  const handleNavigateToQuestion = (qId) => {
    const targetIndex = questionsData.questions.findIndex((q) => q.id === qId);
    if (targetIndex !== -1) {
      setCurrentQuestionIndex(targetIndex);
      setModalType(null);
      setIsPatchingMode(true);
    }
  };

  // ✅ 결과보기 클릭 시 Fisher 판별식 적용
  const handleViewResults = () => {
    setModalType(null);

    // 1️⃣ 척도 합계 계산
    const scaleTotals = {
      '태양척도': 0,
      '소양척도': 0,
      '태음척도': 0,
      '소음척도': 0,
    };

    Object.entries(answers).forEach(([qId, optionId]) => {
      const question = questionsData.questions.find((q) => q.id === Number(qId));
      const option = question?.options.find((opt) => opt.id === optionId);
      if (option?.scores) {
        scaleTotals['태양척도'] += option.scores['태양인'] || 0;
        scaleTotals['소양척도'] += option.scores['소양인'] || 0;
        scaleTotals['태음척도'] += option.scores['태음인'] || 0;
        scaleTotals['소음척도'] += option.scores['소음인'] || 0;
      }
    });

    const { 태양척도, 소양척도, 태음척도, 소음척도 } = scaleTotals;

    // 2️⃣ Fisher 판별식 정의 (순서 수정 완료)
    const fisherFormulas = {
      '태양인': (t, s, te, se) =>
        0.828 * t + (-0.07021) * s + 0.533 * te + 0.373 * se - 13.638,
      '소양인': (t, s, te, se) =>
        0.352 * t + 0.4101 * s + 0.5 * te + 0.449 * se - 11.809,
      '태음인': (t, s, te, se) =>
        0.361 * t + 0.03093 * s + 1.113 * te + 0.349 * se - 12.427,
      '소음인': (t, s, te, se) =>
        0.339 * t + 0.164 * s + 0.644 * te + 0.649 * se - 12.379,
    };

    // 3️⃣ 판별식 점수 계산
    const fisherScores = {
      '태양인': fisherFormulas['태양인'](태양척도, 소양척도, 태음척도, 소음척도),
      '소양인': fisherFormulas['소양인'](태양척도, 소양척도, 태음척도, 소음척도),
      '태음인': fisherFormulas['태음인'](태양척도, 소양척도, 태음척도, 소음척도),
      '소음인': fisherFormulas['소음인'](태양척도, 소양척도, 태음척도, 소음척도),
    };

    // ✅ 디버깅용 로그 (원하면 삭제 가능)
    console.log('척도 합계:', scaleTotals);
    console.log('Fisher 결과:', fisherScores);

    // 4️⃣ 비율 계산
    const total = Object.values(fisherScores).reduce((a, b) => a + b, 0);
    const percentages = {};
    Object.entries(fisherScores).forEach(([type, val]) => {
      percentages[type] = ((val / total) * 100).toFixed(1);
    });

    // 5️⃣ 최고 점수 체질 판별
    const dominantType = Object.entries(fisherScores).reduce((a, b) =>
      fisherScores[a[0]] > fisherScores[b[0]] ? a : b
    )[0];

    // 6️⃣ 결과 페이지로 이동
    navigate('/results-qscc', {
      state: {
        scaleTotals,
        fisherScores,
        percentages,
        dominantType,
      },
    });
  };

  // ✅ 답변 선택 처리
  const handleAnswer = (optionId) => {
    const currentQId = currentQuestion.id;
    const newAnswers = { ...answers, [currentQId]: optionId };
    setAnswers(newAnswers);

    const unansweredAfterAnswer = getUnansweredList(newAnswers);
    const isCompleted = unansweredAfterAnswer.length === 0;

    if (isCompleted) {
      setTimeout(() => setModalType('complete'), 100);
      setIsPatchingMode(false);
      return;
    }

    if (isPatchingMode) {
      const nextUnansweredId = unansweredAfterAnswer.find((qId) => qId > currentQId);
      if (nextUnansweredId) {
        const targetIndex = questionsData.questions.findIndex((q) => q.id === nextUnansweredId);
        if (targetIndex !== -1) {
          setTimeout(() => setCurrentQuestionIndex(targetIndex), 300);
          return;
        }
      }
      setIsPatchingMode(false);
    }

    if (currentQuestionIndex === totalQuestions - 1) {
      setTimeout(() => setModalType('incomplete'), 100);
      return;
    }

    setTimeout(() => setCurrentQuestionIndex((prev) => prev + 1), 300);
  };

  const handlePagerClick = (index) => setCurrentQuestionIndex(index);

  // ✅ 페이저 로직
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

  // ✅ 렌더링
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
            {currentQuestion.options.map((option) => (
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

          {/* ✅ 하단 네비게이션 */}
          <div className="navigation-footer">
            {!isFirstPage && (
              <button className="nav-arrow prev-button" onClick={handlePagerPrev}>
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
                  if (isActive) dotClass = 'active';
                  else if (isAnswered) dotClass = 'answered';

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

            {!isLastPage && (
              <button className="nav-arrow next-button" onClick={handlePagerNext}>
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

      {/* ✅ 모달 (미응답 / 완료) */}
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
