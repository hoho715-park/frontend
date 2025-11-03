import React, { useEffect, useState } from "react";
import "./BadgeModal.css";

const BadgeModal = ({ onClose }) => {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("badges") || "[]");
    setBadges(saved);
  }, []);

  return (
    <div className="badge-overlay">
      <div className="badge-modal">
        <h2 className="badge-title">🏅 나의 뱃지 도감</h2>
        {badges.length === 0 ? (
          <p>아직 획득한 뱃지가 없습니다.</p>
        ) : (
          <div className="badge-list">
            {badges.map((b, i) => (
              <div key={i} className="badge-item">
                <img src={b.image} alt={`badge_${b.id}`} />
                <p>{b.date}</p>
              </div>
            ))}
          </div>
        )}
        <button className="badge-close" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default BadgeModal;
