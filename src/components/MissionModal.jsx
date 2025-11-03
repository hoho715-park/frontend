import React, { useState, useEffect } from "react";
import "./MissionModal.css";

const MissionModal = ({ bodyType, onClose, onProgressChange }) => {
  // ✅ 체질별 미션 목록
  const missions = {
    태양인: [
      "30분 이상 가벼운 유산소 운동하기 (걷기, 자전거 등)",
      "하루 세끼 규칙적인 식사하기 (과식 X)",
      "심호흡 및 명상 10분하기",
      "하루 물 1.5L 이상 마시기",
    ],
    태음인: [
      "식사 후 15분 산책하기",
      "야식 금지 + 저녁은 가볍게 먹기",
      "하루 미지근한 물 1L 이상 마시기",
      "규칙적인 수면 (22시~23시 취침)",
    ],
    소양인: [
      "찬물 말고 미지근한 물 마시기",
      "맵고 자극적인 음식 안 먹기",
      "스트레칭 10분 하기",
      "충분한 수면 취하기 (7시간 이상)",
    ],
    소음인: [
      "아침식사 꼭 하기",
      "따뜻한 차 마시기",
      "스트레칭 또는 산책하기",
      "수면 전 따뜻한 목욕 or 족욕하기",
    ],
  };

  const userMissions = missions[bodyType] || [];

  // ✅ 날짜 기반 key (예: "mission_2025-11-03")
  const todayKey = `mission_${new Date().toISOString().split("T")[0]}`;

  // ✅ 오늘 날짜 미션 상태 불러오기
  const [checked, setChecked] = useState([false, false, false, false]);

  useEffect(() => {
    const saved = localStorage.getItem(todayKey);
    if (saved) {
      setChecked(JSON.parse(saved));
    }
  }, [todayKey]);

  // ✅ 체크 변경 핸들러
  const handleCheck = (index) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setChecked(updated);

    // ✅ localStorage에 저장 (오늘 날짜 기준)
    localStorage.setItem(todayKey, JSON.stringify(updated));

    const completed = updated.filter(Boolean).length;
    onProgressChange(completed);

    // ✅ 하나라도 체크 시 팝업 닫기
    onClose();

    // ✅ 모든 미션 완료 시 알림
    if (completed === 4) {
      alert("🎉 오늘의 미션을 모두 완료했습니다! 배지가 지급되었습니다!");
    }
  };

  return (
    <div className="mission-overlay">
      <div className="mission-modal">
        <h2 className="mission-title">🌿 {bodyType}의 오늘의 미션</h2>
        <ul className="mission-list">
          {userMissions.map((m, i) => (
            <li key={i} className={checked[i] ? "checked" : ""}>
              <label>
                <input
                  type="checkbox"
                  checked={checked[i]}
                  onChange={() => handleCheck(i)}
                />
                {m}
              </label>
            </li>
          ))}
        </ul>
        <button className="mission-close" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default MissionModal;
