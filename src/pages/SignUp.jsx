// src/pages/SignUp.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaRegUser, FaLock, FaRegIdBadge, FaEnvelope, FaCalendar, FaVenusMars } from "react-icons/fa";
import "./SignUp.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [showPopup, setShowPopup] = useState(false); // 팝업 상태 관리

  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/users/register", {
        username,
        password,
        email,
        birthday,
        gender,
      });

      // 회원가입 성공 → 팝업 띄우기
      setShowPopup(true);

    } catch (error) {
      alert("회원가입 실패: " + (error.response?.data || "Network Error"));
    }
  };

  return (
    <div className="signup-page-container">
      <div className="signup-box">
        {/* 로고 */}
        <div className="logo-container">
          <img src="/ieum_가로.png" alt="이음 로고" className="ieum-logo" />
        </div>

        {/* 입력 필드 */}
        <div className="form-section">
          <div className="input-group">
            <FaRegIdBadge className="input-icon" />
            <input type="text" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

          <div className="input-group">
            <FaRegUser className="input-icon" />
            <input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="input-group">
            <FaCalendar className="input-icon" />
            <input type="date" placeholder="생년월일" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
          </div>

          <div className="input-group gender-group">
            <FaVenusMars className="input-icon" />
            <div className="gender-buttons">
              <button className={`gender-button ${gender === "male" ? "selected" : ""}`} onClick={() => setGender("male")}>남자</button>
              <button className={`gender-button ${gender === "female" ? "selected" : ""}`} onClick={() => setGender("female")}>여자</button>
            </div>
          </div>
        </div>

        {/* 가입하기 버튼 */}
        <button className="signup-button" onClick={handleSignUp}>가입하기</button>
      </div>

      {/* 팝업 */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>회원가입 성공 🎉</h2>
            <p>이제 로그인 하실 수 있습니다.</p>
            <button className="popup-button" onClick={() => navigate("/login")}>
              로그인하러 가기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
