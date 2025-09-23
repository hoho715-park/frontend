// src/pages/InputMeasure.jsx (전체 코드)

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { FaCheckCircle, FaCheck } from 'react-icons/fa'; // 체크 아이콘 import
import './InputMeasure.css';

const organs = [
  { id: 'kidney', name: '신장' },
  { id: 'spleen', name: '비장' },
  { id: 'lung', name: '폐' },
  { id: 'heart', name: '심장' },
  { id: 'liver', name: '간' },
  { id: 'bladder', name: '방광' },
];

const InputMeasure = () => {
  const navigate = useNavigate();
  const [currentOrganIndex, setCurrentOrganIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [leftHandValue, setLeftHandValue] = useState('');
  const [rightHandValue, setRightHandValue] = useState('');
  const [isLeftCompleted, setIsLeftCompleted] = useState(false);
  const [isRightCompleted, setIsRightCompleted] = useState(false);
  const [isLeftHandShaking, setIsLeftHandShaking] = useState(false);
  const [isRightHandShaking, setIsRightHandShaking] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false); // 페이지 전환 상태 추가

  const currentOrgan = organs[currentOrganIndex];

  useEffect(() => {
    // 장기가 바뀔 때마다 입력값과 완료 상태 초기화
    setLeftHandValue('');
    setRightHandValue('');
    setIsLeftCompleted(false);
    setIsRightCompleted(false);
    setIsTransitioning(false); // 전환이 끝나면 상태 초기화
  }, [currentOrganIndex]);

  const handleValueChange = (e, hand) => {
    const value = e.target.value;
    if (value < 0 || value > 50) {
      alert('0에서 50 사이의 정수만 입력 가능합니다.');
      return;
    }
    if (hand === 'left') {
      setLeftHandValue(value);
    } else {
      setRightHandValue(value);
    }
  };

  const handleLeftHandSubmit = () => {
    if (leftHandValue !== '') {
      setIsLeftCompleted(true);
      setIsLeftHandShaking(true);
      setTimeout(() => setIsLeftHandShaking(false), 500);

      const newFormData = { ...formData };
      if (!newFormData[currentOrgan.id]) newFormData[currentOrgan.id] = {};
      newFormData[currentOrgan.id].left = leftHandValue;
      setFormData(newFormData);
    }
  };

  const handleRightHandSubmit = () => {
    if (rightHandValue !== '') {
      setIsRightCompleted(true);
      setIsRightHandShaking(true);
      setTimeout(() => setIsRightHandShaking(false), 500);

      const newFormData = { ...formData };
      if (!newFormData[currentOrgan.id]) newFormData[currentOrgan.id] = {};
      newFormData[currentOrgan.id].right = rightHandValue;
      setFormData(newFormData);

      if (isLeftCompleted) {
        if (currentOrganIndex < organs.length - 1) {
          setIsTransitioning(true); // 애니메이션 시작
          setTimeout(() => {
            setCurrentOrganIndex(prevIndex => prevIndex + 1);
            setIsTransitioning(false);
          }, 500); // 애니메이션 시간만큼 지연
        } else {
          alert('모든 장기 입력이 완료되었습니다!');
          // navigate('/results', { state: { formData: newFormData } }); // 팝업창 이후에 연결 예정
        }
      } else {
        alert('왼손 수치를 먼저 입력해 주세요.');
      }
    }
  };

  return (
    <>
      <Header />
      {/* 페이지 전환 클래스 추가 */}
      <div className={`input-measure-page-container ${isTransitioning ? 'page-transition' : ''}`}>
        <nav className="organ-nav-menu">
          {organs.map((organ, index) => (
            <button
              key={organ.id}
              className={`organ-nav-item ${currentOrganIndex === index ? 'active' : ''}`}
              onClick={() => setCurrentOrganIndex(index)}
            >
              {organ.name}
              {formData[organ.id] && formData[organ.id].left && formData[organ.id].right && (
                <FaCheck className="check-icon-menu" />
              )}
            </button>
          ))}
        </nav>
        <div className="organ-input-container">
          <div className="input-field-group">
            <h3>왼손</h3>
            <div className={`hand-image-wrapper ${isLeftCompleted ? 'completed' : ''}`}>
              <img
                src="/input_left_hand.png"
                alt="Left Hand"
                className={`hand-input-img ${isLeftHandShaking ? 'shaking' : ''}`}
              />
              {isLeftCompleted && <FaCheckCircle className="check-icon" />}
            </div>
            <div className="input-with-button">
              <input
                type="number"
                placeholder="수치를 입력해 주세요"
                value={leftHandValue}
                onChange={(e) => handleValueChange(e, 'left')}
                disabled={isLeftCompleted}
              />
              <button onClick={handleLeftHandSubmit} className="submit-button" disabled={isLeftCompleted}>입력</button>
            </div>
          </div>
          <div className="organ-display-box">
            <img src={`/${currentOrgan.id}.png`} alt={`${currentOrgan.name} Image`} className="organ-image" />
            <p className="organ-name-text">{currentOrgan.name}</p>
          </div>
          <div className="input-field-group">
            <h3>오른손</h3>
            <div className={`hand-image-wrapper ${isRightCompleted ? 'completed' : ''}`}>
              <img
                src="/input_right_hand.png"
                alt="Right Hand"
                className={`hand-input-img ${isRightHandShaking ? 'shaking' : ''}`}
              />
              {isRightCompleted && <FaCheckCircle className="check-icon" />}
            </div>
            <div className="input-with-button">
              <input
                type="number"
                placeholder="수치를 입력해 주세요"
                value={rightHandValue}
                onChange={(e) => handleValueChange(e, 'right')}
                disabled={isRightCompleted}
              />
              <button onClick={handleRightHandSubmit} className="submit-button" disabled={isRightCompleted}>입력</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputMeasure;