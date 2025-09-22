import React, { useState } from 'react';
import './Header.css';

const navItems = [
  {
    name: 'About Us',
    subItems: [
      { name: '이음 소개', path: '/about/ieum' },
      { name: '서비스 소개', path: '/about/service' },
    ],
  },
  {
    name: 'Test',
    subItems: [
      { name: 'QSCC-II 설문', path: '/test/qsc-survey' },
      { name: 'QSCC-II 소개', path: '/test/qsc-intro' },
    ],
  },
  { name: 'Input', path: '/input' },
  { name: 'AI Chat', path: '/aichat' },
  {
    name: 'More',
    subItems: [
      { name: '자료실', path: '/more/archive' },
      { name: '커뮤니티', path: '/more/community' },
      { name: '문의 사항', path: '/more/inquiry' },
    ],
  },
];

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMouseEnter = (menuName) => {
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <nav className="menubar-container">
      <div className="menubar-logo">
        <img src="/ieum_가로.png" alt="ieum logo" />
      </div>

      <ul className="menubar-nav">
        {navItems.map((item) => (
          <li
            key={item.name}
            className="nav-item"
            onMouseEnter={() => handleMouseEnter(item.name)}
            onMouseLeave={handleMouseLeave}
          >
            <span className="nav-link">{item.name}</span>
            {item.subItems && (
              <ul className={`dropdown-menu ${activeMenu === item.name ? 'visible' : ''}`}>
                {item.subItems.map((subItem) => (
                  <li key={subItem.name} className="dropdown-item">
                    <a href={subItem.path}>{subItem.name}</a>
                  </li>
                ))}
              </ul>
            )}
            {!item.subItems && activeMenu === item.name && (
                <div className="underline"></div>
            )}
          </li>
        ))}
      </ul>

      <div className="menubar-login">
        <a href="/login">LOGIN</a>
      </div>
    </nav>
  );
};

export default Header;