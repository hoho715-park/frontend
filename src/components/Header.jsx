import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const navItems = [
  { name: 'About Us', subItems: [{ name: '이음 소개', path: '/about/ieum' }, { name: '서비스 소개', path: '/about/service' }] },
  { name: 'Test', subItems: [{ name: 'QSCC-II 설문', path: '/test/qsc-survey' }, { name: 'QSCC-II 소개', path: '/test/qsc-intro' }] },
  { name: 'Input', path: '/input' },
  { name: 'More', subItems: [{ name: '자료실', path: '/more/archive' }, { name: '커뮤니티', path: '/more/community' }, { name: '문의 사항', path: '/more/inquiry' }] },
];

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [iconColor, setIconColor] = useState(localStorage.getItem("profileColor") || "#9c89ff"); // ✅ 프로필 색상
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  // ✅ 로그인 상태 불러오기
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  // ✅ 프로필 색상 실시간 반영
  useEffect(() => {
    const savedColor = localStorage.getItem("profileColor") || "#9c89ff";
    setIconColor(savedColor);

    // 다른 탭 or 페이지에서 변경될 때 자동 갱신
    const handleStorageChange = (event) => {
      if (event.key === "profileColor") {
        setIconColor(event.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleMouseEnter = (menuName) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  };

  const handleProfileClick = () => {
    navigate("/mypage");
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="menubar-container">
      {/* 로고 */}
      <div className="menubar-logo">
        <Link to="/">
          <img src="/ieum_가로.png" alt="ieum logo" />
        </Link>
      </div>

      {/* 햄버거 버튼 (모바일 전용) */}
      <div className="hamburger-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
      </div>

      {/* 메뉴 리스트 */}
      <ul className={`menubar-nav ${menuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <li
            key={item.name}
            className="nav-item"
            onMouseEnter={() => handleMouseEnter(item.name)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              to={item.path || '#'}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
            {item.subItems && (
              <ul className={`dropdown-menu ${activeMenu === item.name ? 'visible' : ''}`}>
                {item.subItems.map((subItem) => (
                  <li key={subItem.name} className="dropdown-item">
                    <Link
                      to={subItem.path}
                      onClick={() => setMenuOpen(false)}
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}

        {/* ✅ 모바일용 로그인/프로필 */}
        <li className="mobile-login-item">
          {isLoggedIn ? (
            <div className="mobile-profile" onClick={handleProfileClick}>
              <FaUserCircle size={38} color={iconColor} className="profile-icon" /> {/* ✅ 색상 반영 */}
              <span>My Page</span>
            </div>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="mobile-login-btn">
              LOGIN
            </Link>
          )}
        </li>
      </ul>

      {/* ✅ 데스크탑용 로그인 / 프로필 */}
      <div className="menubar-login">
        {isLoggedIn ? (
          <FaUserCircle
            size={38}
            color={iconColor} // ✅ 색상 반영됨
            className="profile-icon"
            onClick={handleProfileClick}
          />
        ) : (
          <Link to="/login">LOGIN</Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
