// src/components/HistoryGraphModal.jsx
import React from 'react';
import './CalendarModal.css';

const GRAPH_ORDER = ['kidney', 'spleen', 'lung', 'heart', 'liver', 'bladder'];
const ORGAN_NAMES_KR = {
  'kidney': '신장', 'spleen': '비장', 'lung': '폐',
  'heart': '심장', 'liver': '간', 'bladder': '방광'
};

const HistoryGraphModal = ({ measurement, onClose }) => {
  if (!measurement) return null;

  const mapData = (hand) => {
    return GRAPH_ORDER.map(org => {
      const key = `${hand}${org.charAt(0).toUpperCase() + org.slice(1)}`;
      return measurement[key] || 0;
    });
  };

  const leftValues = mapData('left');
  const rightValues = mapData('right');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="history-graph-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        <h3>측정 그래프</h3>
        <div className="graph-container">
          <div className="graph-box">
            <h4>왼손</h4>
            <ul>
              {leftValues.map((v, i) => (
                <li key={i}>{ORGAN_NAMES_KR[GRAPH_ORDER[i]]}: {v}</li>
              ))}
            </ul>
          </div>
          <div className="graph-box">
            <h4>오른손</h4>
            <ul>
              {rightValues.map((v, i) => (
                <li key={i}>{ORGAN_NAMES_KR[GRAPH_ORDER[i]]}: {v}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryGraphModal;
