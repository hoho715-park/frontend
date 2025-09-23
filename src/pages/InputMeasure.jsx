// src/pages/InputMeasure.jsx

import React, { useState } from 'react';
import Header from '../components/Header';
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
  const [currentOrganId, setCurrentOrganId] = useState('kidney');
  const currentOrganName = organs.find(organ => organ.id === currentOrganId).name;

  const handleMenuClick = (organId) => {
    setCurrentOrganId(organId);
  };

  return (
    <>
      <Header />
      <div className="input-measure-page-container">
        {/* 장기 메뉴 네비게이션 */}
        <nav className="organ-nav-menu">
          {organs.map(organ => (
            <button
              key={organ.id}
              className={`organ-nav-item ${currentOrganId === organ.id ? 'active' : ''}`}
              onClick={() => handleMenuClick(organ.id)}
            >
              {organ.name}
            </button>
          ))}
        </nav>

        {/* 장기별 입력 컨테이너 */}
        <div className="organ-input-container">
          {/* 왼손 입력 */}
          <div className="input-field-group">
            <h3>왼손</h3>
            <img src="/input_left_hand.png" alt="Left Hand" className="hand-input-img" />
            <input type="number" placeholder="수치를 입력해 주세요" />
          </div>

          {/* 장기 이미지 */}
          <div className="organ-display-box">
            <img src={`/${currentOrganId}.png`} alt={`${currentOrganName} Image`} className="organ-image" />
            <p className="organ-name-text">{currentOrganName}</p>
          </div>

          {/* 오른손 입력 */}
          <div className="input-field-group">
            <h3>오른손</h3>
            <img src="/input_right_hand.png" alt="Right Hand" className="hand-input-img" />
            <input type="number" placeholder="수치를 입력해 주세요" />
          </div>
        </div>
      </div>
    </>
  );
};

export default InputMeasure;