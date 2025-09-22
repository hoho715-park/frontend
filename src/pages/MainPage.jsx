// src/pages/MainPage.jsx

import React from 'react';
import Menubar from '../components/Menubar';

const MainPage = () => {
  return (
    <div>
      <Menubar />
      {/* 여기에 메인 페이지의 콘텐츠를 추가하세요 */}
      <main style={{ padding: '20px' }}>
        <h2>메인 페이지입니다.</h2>
        <p>이곳에 서비스의 주요 내용을 담을 수 있습니다.</p>
      </main>
    </div>
  );
};

export default MainPage;