// src/pages/Input.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './Input.css';

const InputStart = () => {
  return (
    <>
      <Header />
      <div className="input-page-container">
        <div className="input-content-wrapper">
          <div className="input-image-box">
            <img src="/input_hand.png" alt="Input Hand" className="input-hand-img" />
          </div>
          <div className="input-text-box">
            <p className="input-description">
              손 그림을 참고하여 각 장기에 해당하는<br/>위치의 값을 측정하고 입력해 주세요.
            </p>
            <Link to="/input/measure" className="input-start-button">
              입력하기 →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputStart;