// src/pages/InputMeasure.jsx (전체 코드)

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { FaCheckCircle, FaCheck } from 'react-icons/fa';
import './InputMeasure.css';

const organs = [
  { id: 'kidney', name: '신장' },
  { id: 'spleen', name: '비장' },
  { id: 'lung', name: '폐' },
  { id: 'heart', name: '심장' },
  { id: 'liver', name: '간' },
  { id: 'bladder', name: '방광' },
  // 총 12개 장기를 가정했으므로 나머지 장기 ID도 필요하지만, 현재는 6개만 사용합니다.
  // DB 연동 시 총 12개의 장기 데이터를 전송해야 합니다.
];

const InputMeasure = () => {
  const navigate = useNavigate();
  const [currentOrganIndex, setCurrentOrganIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [leftHandValue, setLeftHandValue] = useState('');
  const [rightHandValue, setRightHandValue] = useState('');
  
  // 완료 상태 (계산 속성)
  const currentOrgan = organs[currentOrganIndex];
  const isLeftCompleted = !!(formData[currentOrgan.id] && formData[currentOrgan.id].left);
  const isRightCompleted = !!(formData[currentOrgan.id] && formData[currentOrgan.id].right);

  const [isLeftHandShaking, setIsLeftHandShaking] = useState(false);
  const [isRightHandShaking, setIsRightHandShaking] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setLeftHandValue('');
    setRightHandValue('');
    setIsTransitioning(false);
  }, [currentOrganIndex]);


  // 🔥 [핵심] 임시 체질 판별 로직
  const determineBodyType = (data) => {
      // ------------------------------------------------
      // TODO: 머신러닝 모델 적용 시 이 로직을 대체해야 함
      // ------------------------------------------------
      const getValue = (organId, hand) => parseInt(data[organId]?.[hand] || 0);

      // 현재는 6개 장기만 정의되어 있으므로, 12개 장기 수치 합산 로직은 임시로 간소화합니다.
      // 폐/간/비장/신장 수치를 사용합니다. (양손 합산)
      const sumLung = getValue('lung', 'left') + getValue('lung', 'right');
      const sumLiver = getValue('liver', 'left') + getValue('liver', 'right');
      const sumSpleen = getValue('spleen', 'left') + getValue('spleen', 'right');
      const sumKidney = getValue('kidney', 'left') + getValue('kidney', 'right');
      
      const lungLiverDiff = sumLung - sumLiver;
      const spleenKidneyDiff = sumSpleen - sumKidney;
      
      const diffThreshold = 10; // 차이가 클 경우의 임시 기준점

      if (lungLiverDiff > diffThreshold) {
          // 폐 > 간, 차이가 클 때
          return {
              bodyType: '태양인',
              recommendations: { diet: '담백한 채소 위주', lifestyle: '상체 운동' }
          };
      } else if (lungLiverDiff < -diffThreshold) {
          // 폐 < 간, 차이가 클 때
          return {
              bodyType: '태음인',
              recommendations: { diet: '따뜻한 음식 위주', lifestyle: '하체 운동' }
          };
      } else if (spleenKidneyDiff > diffThreshold) {
          // 비장 > 신장, 차이가 클 때
          return {
              bodyType: '소양인',
              recommendations: { diet: '찬 음식 피하기', lifestyle: '유산소 운동' }
          };
      } else if (spleenKidneyDiff < -diffThreshold) {
          // 비장 < 신장, 차이가 클 때
          return {
              bodyType: '소음인',
              recommendations: { diet: '따뜻한 음식 섭취', lifestyle: '가벼운 산책' }
          };
      } else {
          return {
              bodyType: '평형인', // 모든 조건에 해당하지 않을 경우
              recommendations: { diet: '균형 잡힌 식단', lifestyle: '규칙적인 생활' }
          };
      }
  };


  const handleValueChange = (e, hand) => {
    const value = e.target.value;
    if (value < 0 || value > 50) {
      alert('0에서 50 사이의 정수만 입력 가능합니다.');
      if (hand === 'left') {
        setLeftHandValue('');
      } else {
        setRightHandValue('');
      }
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
      setIsLeftHandShaking(true);
      setTimeout(() => setIsLeftHandShaking(false), 500);

      const newFormData = { ...formData };
      if (!newFormData[currentOrgan.id]) newFormData[currentOrgan.id] = {};
      newFormData[currentOrgan.id].left = leftHandValue;
      setFormData(newFormData);
      
      setLeftHandValue(''); 
    }
  };

  const handleRightHandSubmit = () => {
    if (rightHandValue !== '') {
      if (!isLeftCompleted) { 
        alert('왼손 수치를 먼저 입력해 주세요.');
        return;
      }
      
      setIsRightHandShaking(true);
      setTimeout(() => setIsRightHandShaking(false), 500);

      const newFormData = { ...formData };
      if (!newFormData[currentOrgan.id]) newFormData[currentOrgan.id] = {};
      newFormData[currentOrgan.id].right = rightHandValue;
      setFormData(newFormData);
      
      setRightHandValue('');

      if (currentOrganIndex < organs.length - 1) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentOrganIndex(prevIndex => prevIndex + 1);
        }, 500);
      } else {
        // 마지막 장기 입력 완료 시
        const result = determineBodyType(newFormData); // 최종 체질 판별
        
        // 결과 페이지로 이동 (state에 체질 정보와 추천 정보를 담아 전달)
        navigate('/result', { state: result }); 
      }
    }
  };

  return (
    // ... (나머지 JSX는 동일) ...
    <>
      <Header />
      <div className={`input-measure-page-container ${isTransitioning ? 'page-transition' : ''}`}>
        {/* 장기 메뉴 네비게이션 */}
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
          {/* 왼손 입력 */}
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
          {/* 장기 이미지 */}
          <div className="organ-display-box">
            <img src={`/${currentOrgan.id}.png`} alt={`${currentOrgan.name} Image`} className="organ-image" />
            <p className="organ-name-text">{currentOrgan.name}</p>
          </div>
          {/* 오른손 입력 */}
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