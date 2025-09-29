// src/pages/InputMeasure.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { FaCheckCircle, FaCheck } from 'react-icons/fa'; // 체크 아이콘 import
import axios from 'axios'; // ✅ axios 추가
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

  // 🔥 체질 판별 로직 (임시)
  const determineBodyType = (data) => {
    const getValue = (organId, hand) => parseInt(data[organId]?.[hand] || 0);

    const sumLung = getValue('lung', 'left') + getValue('lung', 'right');
    const sumLiver = getValue('liver', 'left') + getValue('liver', 'right');
    const sumSpleen = getValue('spleen', 'left') + getValue('spleen', 'right');
    const sumKidney = getValue('kidney', 'left') + getValue('kidney', 'right');
    
    const lungLiverDiff = sumLung - sumLiver;
    const spleenKidneyDiff = sumSpleen - sumKidney;
    
    const diffThreshold = 10;

    if (lungLiverDiff > diffThreshold) {
      return { bodyType: '태양인', recommendations: { diet: '담백한 채소 위주', lifestyle: '상체 운동', alcohol: '담백한 술' } };
    } else if (lungLiverDiff < -diffThreshold) {
      return { bodyType: '태음인', recommendations: { diet: '따뜻한 음식 위주', lifestyle: '하체 운동', alcohol: '따뜻한 술' } };
    } else if (spleenKidneyDiff > diffThreshold) {
      return { bodyType: '소양인', recommendations: { diet: '찬 음식 피하기', lifestyle: '유산소 운동', alcohol: '차가운 맥주' } };
    } else if (spleenKidneyDiff < -diffThreshold) {
      return { bodyType: '소음인', recommendations: { diet: '따뜻한 음식 섭취', lifestyle: '가벼운 산책', alcohol: '따뜻한 막걸리' } };
    } else {
      return { bodyType: '평형인', recommendations: { diet: '균형 잡힌 식단', lifestyle: '규칙적인 생활', alcohol: '적당히' } };
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

  const handleRightHandSubmit = async () => {
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
        // ✅ 마지막 장기 입력 완료 시 DB 저장
        const userId = localStorage.getItem("userId"); // 로그인 시 저장했다고 가정
        try {
          await axios.post("http://localhost:8080/api/measurements", {
            userId: userId,
            leftKidney: parseInt(newFormData.kidney?.left || 0),
            rightKidney: parseInt(newFormData.kidney?.right || 0),
            leftSpleen: parseInt(newFormData.spleen?.left || 0),
            rightSpleen: parseInt(newFormData.spleen?.right || 0),
            leftLung: parseInt(newFormData.lung?.left || 0),
            rightLung: parseInt(newFormData.lung?.right || 0),
            leftHeart: parseInt(newFormData.heart?.left || 0),
            rightHeart: parseInt(newFormData.heart?.right || 0),
            leftLiver: parseInt(newFormData.liver?.left || 0),
            rightLiver: parseInt(newFormData.liver?.right || 0),
            leftBladder: parseInt(newFormData.bladder?.left || 0),
            rightBladder: parseInt(newFormData.bladder?.right || 0)
          });
          console.log("측정값 저장 성공!");
        } catch (error) {
  console.error("측정값 저장 실패:", error.response?.data || error.message);
  alert("DB 저장 중 오류: " + (error.response?.data?.message || error.message));
}

        // 🔥 결과 페이지 이동
        const result = determineBodyType(newFormData);
        const measureTime = new Date();
        navigate('/result', { state: { ...result, formData: newFormData, measureTime: measureTime } });
      }
    }
  };

  return (
    <>
      <Header />
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
