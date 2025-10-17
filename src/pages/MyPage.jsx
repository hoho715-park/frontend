// src/pages/MyPage.jsx
import React from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import "./MyPage.css";

const MyPage = () => {
  const username = localStorage.getItem("username") || "사용자";
  // 아래 값들은 백엔드 연동 전까지 localStorage/기본값 사용
  const constitution = localStorage.getItem("constitution") || "OOO";
  const lastDiagDate = localStorage.getItem("lastDiagnosisDate") || "YYYY-MM-DD";

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    navigate("/");
    window.location.reload();
  };

  const handleDeleteAccount = () => {
    // 실제 회원 탈퇴 처리로 교체 예정
    alert("회원 탈퇴 요청이 접수되었습니다. (연동 시 실제 API 호출로 대체)");
  };

  return (
    <div className="mypage-wrap">
      {/* 좌측 사이드바 */}
      <aside className="mypage-sidebar">
        <div className="sidebar-section">
          <h2 className="sidebar-title">나의 정보</h2>

          <div className="user-card">
            <div className="user-line"><span className="label">이름</span>: {username}</div>
            <div className="user-line"><span className="label">체질</span>: {constitution}</div>
            <div className="user-line"><span className="label">최근 진단</span>: {lastDiagDate}</div>
          </div>

          <nav className="menu-list">
            <NavLink to="/mypage/profile" className="menu-item">
              기본 정보 수정
            </NavLink>
            <NavLink to="/mypage/password" className="menu-item">
              비밀번호 변경
            </NavLink>
          </nav>
        </div>

        <hr className="sidebar-divider" />

        <div className="sidebar-section">
          <h3 className="sidebar-subtitle">조회</h3>
          <nav className="menu-list">
            <NavLink to="/mypage/qscc" className="menu-item">
              QSCC-II 설문 조회
            </NavLink>
            <NavLink to="/mypage/measurements" className="menu-item">
              생체전류 측정 기록 조회
            </NavLink>
          </nav>
        </div>

        <hr className="sidebar-divider" />

        <div className="sidebar-section">
          <h3 className="sidebar-subtitle">리포트</h3>
          <nav className="menu-list">
            <NavLink to="/mypage/report" className="menu-item">
              변화 살펴보기
            </NavLink>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <button className="logout-button" onClick={handleLogout}>
            로그아웃
          </button>
          <button className="danger-button" onClick={handleDeleteAccount}>
            회원 탈퇴
          </button>
        </div>
      </aside>

      {/* 우측 콘텐츠 */}
      <main className="mypage-content">
        {/* 기본 환영 화면 (아직 중첩 라우트가 없을 때) */}
        <div className="content-welcome">
          <h1 className="content-title">{username}님 환영합니다 🎉</h1>
          <p className="content-desc">
            왼쪽 메뉴에서 정보를 조회하거나 수정할 수 있어요.
          </p>
        </div>

        {/* 중첩 라우트가 있다면 여기에 렌더링 */}
        <Outlet />
      </main>
    </div>
  );
};

export default MyPage;
