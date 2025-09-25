// src/components/SurveyModal.jsx

import React from 'react';
import './SurveyModal.css';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa'; // 경고 아이콘, X 아이콘

const SurveyModal = ({ 
  type, 
  unansweredQuestions, 
  onClose, 
  onNavigate, 
  onViewResults 
}) => {
  
  if (type === 'incomplete') {
    // 1. 미응답 문항 팝업
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button className="modal-close-x-button" onClick={onClose}>
            <FaTimes />
          </button>
          <div className="icon-wrapper">
            <FaExclamationTriangle className="warning-icon" /> {/* 경고 아이콘 */}
          </div>
          <h3 className="modal-title incomplete">아직 응답하지 않은 문항이 있습니다.</h3>
          <p className="modal-subtitle">아래 문항을 클릭하여 이동할 수 있습니다.</p>
          
          <div className="unanswered-list">
            {unansweredQuestions.map(qId => ( 
              <span 
                key={qId} 
                className="unanswered-item" 
                onClick={() => onNavigate(qId)}
              >
                Q{qId}
              </span>
            ))}
          </div>
          
          <div className="modal-actions-single"> 
            <button className="modal-button primary-button" onClick={onClose}>
                닫기
            </button>
          </div>
        </div>
      </div>
    );
  } else if (type === 'complete') {
    // 2. 완료 팝업 (폭죽 아이콘만 추가)
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content complete" onClick={e => e.stopPropagation()}>
          <button className="modal-close-x-button" onClick={onClose}>
            <FaTimes />
          </button>
          <div className="icon-wrapper">
            <span className="confetti-icon">🎉</span> {/* 폭죽 아이콘 */}
          </div>
          <h3 className="modal-title complete">설문이 모두 완료되었습니다!</h3>
          <p className="modal-subtitle">결과를 확인하고 싶으시면 '결과보기' 버튼을 눌러주세요.</p>
          
          <div className="modal-actions-single">
            <button className="result-button" onClick={onViewResults}>
              결과보기
            </button>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default SurveyModal;