// src/components/CalendarModal.jsx
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import HistoryGraphModal from './HistoryGraphModal.jsx';
import './CalendarModal.css';

const CalendarModal = ({ onClose, userId }) => {
  const [date, setDate] = useState(new Date());
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [measurements, setMeasurements] = useState([]);
  const [graphData, setGraphData] = useState(null);

  // 기록된 날짜 가져오기
  useEffect(() => {
    axios.get(`http://localhost:8080/api/measurements/${userId}/dates`)
      .then(res => {
        console.log("백엔드에서 받은 날짜들:", res.data);
        setAvailableDates(res.data);
      })
      .catch(err => console.error(err));
  }, [userId]);

  // 달력에 기록 표시
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toLocaleDateString('sv-SE'); // ✅ "2025-09-30"
      if (availableDates.includes(dateString)) {
        return 'has-record';
      }
    }
    return null;
  };

  // 날짜 클릭 → 해당 날짜의 측정 기록 가져오기
  const handleDateChange = async (newDate) => {
    const dateString = newDate.toLocaleDateString('sv-SE'); // ✅ 동일한 포맷
    setSelectedDate(dateString);

    try {
      const res = await axios.get(`http://localhost:8080/api/measurements/${userId}/by-date?date=${dateString}`);
      console.log("선택한 날짜의 측정 기록:", res.data);
      setMeasurements(res.data);
    } catch (err) {
      console.error("해당 날짜 데이터 불러오기 실패:", err);
    }
  };

  const handleTimeSelect = (m) => {
    setGraphData(m);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="calendar-modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        <h3 className="modal-title">이전 측정 기록 확인</h3>

        <div className="calendar-wrapper">
          <Calendar
            onChange={handleDateChange}
            value={date}
            locale="ko-KR"
            calendarType="gregory"
            tileClassName={tileClassName}
            showNeighboringMonth={false} 
          />
        </div>

        {selectedDate && (
          <div className="time-button-list">
            <h4>{selectedDate} 측정 기록</h4>
            {measurements.map(m => {
              const time = new Date(m.createdAt).toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit'
              });
              return (
                <button key={m.id} className="time-button" onClick={() => handleTimeSelect(m)}>
                  {time}
                </button>
              );
            })}
          </div>
        )}

        {graphData && (
          <HistoryGraphModal measurement={graphData} onClose={() => setGraphData(null)} />
        )}

        <p className="modal-footer-text">기록된 날짜를 클릭하여 그래프를 확인하세요.</p>
      </div>
    </div>
  );
};

export default CalendarModal;
