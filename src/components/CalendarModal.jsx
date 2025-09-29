// src/components/CalendarModal.jsx

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './CalendarModal.css'; // 새로 생성할 CSS 파일

const CalendarModal = ({ onClose, onDateSelect, availableDates = [] }) => {
    const [date, setDate] = useState(new Date());

    // DB 기록이 있는 날짜에만 특정 클래스를 추가하는 로직 (추후 DB 연동 시 활용)
    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            // availableDates는 'YYYY-MM-DD' 형식의 문자열 배열이라고 가정
            const dateString = date.toISOString().slice(0, 10);
            if (availableDates.includes(dateString)) {
                return 'has-record'; // 기록이 있는 날짜에 클래스 추가
            }
        }
        return null;
    };

    const handleDateChange = (newDate) => {
        setDate(newDate);
        // 날짜를 선택하면 부모 컴포넌트로 전달하고 모달 닫기
        onDateSelect(newDate);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="calendar-modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}>
                    &times;
                </button>
                <h3 className="modal-title">이전 측정 기록 확인</h3>
                
                <div className="calendar-wrapper">
                    <Calendar
                        onChange={handleDateChange}
                        value={date}
                        locale="ko-KR" // 한국어 로케일 설정
                        calendarType="gregory"
                        tileClassName={tileClassName}
                    />
                </div>
                
                <p className="modal-footer-text">기록된 날짜를 클릭하여 그래프를 확인하세요.</p>
            </div>
        </div>
    );
};

export default CalendarModal;