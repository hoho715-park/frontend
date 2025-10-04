import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaRegUser, FaLock, FaRegIdBadge, FaEnvelope, FaCalendar, FaVenusMars } from "react-icons/fa";
import "./SignUp.css";

const API_URL = "http://localhost:8080/api/auth/signup"; // ✅ 백엔드 회원가입 엔드포인트

const SignUp = () => {
  const [userId, setUserId] = useState("");       // 로그인 ID
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");         // "YYYY-MM-DD" (빈 값 가능)
  const [gender, setGender] = useState("");       // "male" | "female" (전송 시 대문자 변환)
  const [showPopup, setShowPopup] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const uid = userId.trim();
    const uname = userName.trim();
    const mail = email.trim();

    if (!uid) return "아이디를 입력해 주세요.";
    if (!/^[a-zA-Z0-9]{4,20}$/.test(uid)) return "아이디는 영문/숫자 4~20자로 입력해 주세요.";

    if (!password) return "비밀번호를 입력해 주세요.";
    if (password.length < 8 || password.length > 20) return "비밀번호는 8~20자여야 합니다.";

    if (password !== confirmPassword) return "비밀번호가 일치하지 않습니다.";

    if (!uname) return "이름을 입력해 주세요.";

    if (!mail) return "이메일을 입력해 주세요.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) return "이메일 형식이 올바르지 않습니다.";

    return null;
  };

  const handleSignUp = async () => {
    const err = validate();
    if (err) {
      alert(err);
      return;
    }

    const payload = {
      userId: userId.trim(),
      password,
      userName: userName.trim(),
      // phoneNumber,
      email: email.trim(),
      birth: birth && birth.length > 0 ? birth : null,             // "" → null (LocalDate 파싱오류 방지)
      gender: gender ? gender.toUpperCase() : null,                // "male" → "MALE"
    };

    try {
      setSubmitting(true);
      await axios.post(API_URL, payload, {
        headers: { "Content-Type": "application/json" },
        // withCredentials: true, // 쿠키/세션 기반이면 활성화(+ 서버 allowCredentials=true)
      });
      setShowPopup(true);
    } catch (error) {
      const resp = error.response;
      const msg =
        resp?.data?.message ||
        (typeof resp?.data === "string" ? resp.data : "") ||
        error.message;

      const fieldErrors = resp?.data?.errors
        ? Object.entries(resp.data.errors)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n")
        : "";

      alert(`회원가입 실패: ${msg || "요청 형식이 올바르지 않습니다."}${fieldErrors ? `\n${fieldErrors}` : ""}`);
      console.log("signup error:", resp || error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-page-container">
      <div className="signup-box">
        <div className="logo-container">
          <img src="/ieum_가로.png" alt="이음 로고" className="ieum-logo" />
        </div>

        <div className="form-section">
          <div className="input-group">
            <FaRegIdBadge className="input-icon" />
            <input
              type="text"
              placeholder="아이디"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <div className="input-group">
            <FaRegUser className="input-icon" />
            <input
              type="text"
              placeholder="이름"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              autoComplete="name"
            />
          </div>

          {/* 
          <div className="input-group">
            <FaRegUser className="input-icon" />
            <input
              type="tel"
              placeholder="전화번호"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div> 
          */}

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <FaCalendar className="input-icon" />
            <input
              type="date"
              placeholder="생년월일"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
            />
          </div>

          <div className="input-group gender-group">
            <FaVenusMars className="input-icon" />
            <div className="gender-buttons">
              <button
                type="button"
                className={`gender-button ${gender === "male" ? "selected" : ""}`}
                onClick={() => setGender("male")}
              >
                남자
              </button>
              <button
                type="button"
                className={`gender-button ${gender === "female" ? "selected" : ""}`}
                onClick={() => setGender("female")}
              >
                여자
              </button>
            </div>
          </div>
        </div>

        <button className="signup-button" onClick={handleSignUp} disabled={submitting}>
          {submitting ? "가입 중..." : "가입하기"}
        </button>
      </div>

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