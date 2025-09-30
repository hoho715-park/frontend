// src/components/HistoryGraphModal.jsx
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import './HistoryGraphModal.css';

const GRAPH_ORDER = ['kidney', 'spleen', 'lung', 'heart', 'liver', 'bladder'];
const ORGAN_NAMES_KR = {
  kidney: '신장',
  spleen: '비장',
  lung: '폐',
  heart: '심장',
  liver: '간',
  bladder: '방광',
};

// 장기 수치를 그래프 좌표로 변환
const mapDataToSVGPoints = (data, hand) => {
  const maxValue = 50;
  const yAxisHeight = 160;
  const xUnit = 60;
  const xStart = 50;

  let points = "";
  let pointData = [];

  GRAPH_ORDER.forEach((organId, index) => {
    const key = `${hand}${organId.charAt(0).toUpperCase() + organId.slice(1)}`;
    const value = parseInt(data[key] || 25);
    const clampedValue = Math.max(0, Math.min(maxValue, value));

    const y = 180 - (clampedValue / maxValue) * yAxisHeight;
    const x = xStart + (index * xUnit);

    points += `${x},${y} `;
    pointData.push({ x, y, value: clampedValue });
  });

  return { points: points.trim(), pointData };
};

const HistoryGraphModal = ({ measurement, onClose }) => {
  if (!measurement) return null;

  const graphRef = useRef(null);

  // 날짜 포맷
  const formatDateTime = (dateString) => {
    const d = new Date(dateString);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hour = String(d.getHours()).padStart(2, '0');
    const minute = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}`;
  };

  // 그래프 저장
  const handleSaveAsPNG = async () => {
    if (!graphRef.current) return;
    try {
      const canvas = await html2canvas(graphRef.current, {
        useCORS: true,
        scale: 2,
      });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `측정그래프_${formatDateTime(measurement.createdAt)}.png`;
      link.click();
    } catch (error) {
      console.error("그래프 저장 실패:", error);
    }
  };

  const { points: leftPoints, pointData: leftPointData } = mapDataToSVGPoints(measurement, 'left');
  const { points: rightPoints, pointData: rightPointData } = mapDataToSVGPoints(measurement, 'right');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="history-graph-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        
        {/* ✅ 제목에 측정 날짜/시간 표시 */}
        <h3 className="modal-title">
          {formatDateTime(measurement.createdAt)} 측정 그래프
        </h3>

        {/* ✅ 그래프 영역 */}
        <div ref={graphRef} className="graph-container">
          {/* 왼손 그래프 */}
          <div className="graph-box">
            <h4>왼손</h4>
            <svg width="100%" height="200" viewBox="0 0 400 200">
              {[0, 10, 20, 30, 40, 50].map(v => (
                <g key={v}>
                  <text x="15" y={180 - (v / 50) * 160 + 5} fontSize="10" fill="#999" textAnchor="end">{v}</text>
                  <line x1="20" y1={180 - (v / 50) * 160} x2="380" y2={180 - (v / 50) * 160} stroke={v === 0 ? "#333" : "#ccc"} strokeWidth="1"/>
                </g>
              ))}
              <polyline fill="none" stroke="#4CAF50" strokeWidth="2" points={leftPoints} />
              {leftPointData.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="3" fill="#4CAF50" />
                  <text x={p.x} y={p.y - 10} fontSize="10" fill="#4CAF50" textAnchor="middle">{p.value}</text>
                </g>
              ))}
              {GRAPH_ORDER.map((id, index) => (
                <text key={id} x={50 + index * 60} y="195" fontSize="10" fill="#555" textAnchor="middle">{ORGAN_NAMES_KR[id]}</text>
              ))}
            </svg>
          </div>

          {/* 오른손 그래프 */}
          <div className="graph-box">
            <h4>오른손</h4>
            <svg width="100%" height="200" viewBox="0 0 400 200">
              {[0, 10, 20, 30, 40, 50].map(v => (
                <g key={v}>
                  <text x="15" y={180 - (v / 50) * 160 + 5} fontSize="10" fill="#999" textAnchor="end">{v}</text>
                  <line x1="20" y1={180 - (v / 50) * 160} x2="380" y2={180 - (v / 50) * 160} stroke={v === 0 ? "#333" : "#ccc"} strokeWidth="1"/>
                </g>
              ))}
              <polyline fill="none" stroke="#FF8C69" strokeWidth="2" points={rightPoints} />
              {rightPointData.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="3" fill="#FF8C69" />
                  <text x={p.x} y={p.y - 10} fontSize="10" fill="#FF8C69" textAnchor="middle">{p.value}</text>
                </g>
              ))}
              {GRAPH_ORDER.map((id, index) => (
                <text key={id} x={20 + index * 60} y="195" fontSize="10" fill="#555" textAnchor="middle">{ORGAN_NAMES_KR[id]}</text>
              ))}
            </svg>
          </div>
        </div>

        {/* ✅ 저장 버튼 */}
        <div className="graph-save-btn-wrapper">
          <button className="save-png-button" onClick={handleSaveAsPNG}>
            이미지 저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryGraphModal;
