// src/pages/SignUp.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser, FaLock, FaRegIdBadge, FaEnvelope, FaCalendar, FaVenusMars, FaMobileAlt } from 'react-icons/fa';
import './SignUp.css';

const SignUp = () => {
  const [selectedGender, setSelectedGender] = useState(null);

  return (
    <div className="signup-page-container">
      <div className="signup-box">
        {/* 이음 로고 */}
        <div className="logo-container">
          <img src="/ieum_가로.png" alt="이음 로고" className="ieum-logo" />
        </div>

        {/* 입력 필드 그룹 */}
        <div className="form-section">
          {/* 아이디 입력 필드 */}
          <div className="field-container"> {/* 새로운 컨테이너 추가 */}
            <div className="input-group">
              <FaRegIdBadge className="input-icon" />
              <input type="text" placeholder="아이디" />
            </div>
            <div className="additional-info">
                <span className="info-text">영문, 숫자만 사용</span>
                <span className="check-icon">✓</span>
            </div>
          </div>

          {/* 비밀번호 입력 필드 */}
          <div className="field-container"> {/* 새로운 컨테이너 추가 */}
            <div className="input-group">
              <FaLock className="input-icon" />
              <input type="password" placeholder="비밀번호" />
            </div>
            <div className="additional-info">
                <span className="info-text password-info">영문, 숫자, 특수기호 혼합 8자리 이상</span>
                <span className="check-icon">✓</span>
            </div>
          </div>

          {/* 비밀번호 확인 입력 필드 */}
          <div className="field-container"> {/* 새로운 컨테이너 추가 */}
            <div className="input-group">
              <FaLock className="input-icon" />
              <input type="password" placeholder="비밀번호 확인" />
            </div>
            <div className="additional-info">
                <span className="check-icon">✓</span>
            </div>
          </div>

          {/* 이름 입력 필드 */}
          <div className="input-group">
            <FaRegUser className="input-icon" />
            <input type="text" placeholder="이름" />
          </div>

          {/* 이메일 입력 필드 */}
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input type="email" placeholder="이메일" />
          </div>

          {/* 생년월일 입력 필드 */}
          <div className="input-group">
            <FaCalendar className="input-icon" />
            <input type="text" placeholder="생년월일" />
          </div>

          {/* 성별 선택 */}
          <div className="input-group gender-group">
            <FaVenusMars className="input-icon" />
            <div className="gender-buttons">
              <button
                className={`gender-button ${selectedGender === 'male' ? 'selected' : ''}`}
                onClick={() => setSelectedGender('male')}
              >
                남자
              </button>
              <button
                className={`gender-button ${selectedGender === 'female' ? 'selected' : ''}`}
                onClick={() => setSelectedGender('female')}
              >
                여자
              </button>
            </div>
          </div>
          
          {/* 휴대전화번호 입력 필드 */}
          <div className="phone-field-container"> {/* 새로운 컨테이너 추가 */}
            <div className="input-group phone-group">
              <FaMobileAlt className="input-icon" />
              <input type="tel" placeholder="휴대전화번호" />
            </div>
            <button className="cert-button">인증하기</button>
          </div>

          {/* 인증번호 입력 필드 */}
          <div className="input-group">
            <FaMobileAlt className="input-icon" />
            <input type="text" placeholder="인증번호" />
          </div>
        </div>

        {/* 가입하기 버튼 */}
        <button className="signup-button">가입하기</button>
      </div>
    </div>
  );
};

export default SignUp;