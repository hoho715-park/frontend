import React, { useState, useEffect } from "react";
import "./MissionModal.css";

const MissionModal = ({ bodyType, onClose, onProgressChange }) => {
  const username = localStorage.getItem("username") || "사용자";

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
  const todayKey = `mission_${new Date().toISOString().split("T")[0]}`;

  // ✅ 오늘 미션 체크 상태
  const [checked, setChecked] = useState([false, false, false, false]);

  useEffect(() => {
    const saved = localStorage.getItem(todayKey);
    if (saved) {
      setChecked(JSON.parse(saved));
    }
  }, [todayKey]);

  // ✅ 미션 체크 핸들러
  const handleCheck = (index) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setChecked(updated);

    // ✅ 로컬스토리지에 저장
    localStorage.setItem(todayKey, JSON.stringify(updated));

    // ✅ 체크 개수 계산
    const completed = updated.filter(Boolean).length;

    // ✅ ✅ 여기에 핵심 추가 (미션 진행도 저장)
    localStorage.setItem("missionProgress", completed);

    // ✅ 상위(MainPage)에 상태 전달
    onProgressChange(completed);

    // ✅ 팝업 닫기 (체크 시 바로 닫히도록)
    onClose();
  };

  return (
    <div className="mission-overlay">
      <div className="mission-modal">
        {/* ✅ 타이틀 영역 */}
        <h2 className="mission-title">
          🌿 <span className="mission-username">{username}</span>님의 오늘의 미션
        </h2>

        {/* ✅ 미션 리스트 */}
        <ul className="mission-list">
          {userMissions.map((mission, i) => (
            <li key={i} className={checked[i] ? "checked" : ""}>
              <label>
                <input
                  type="checkbox"
                  checked={checked[i]}
                  onChange={() => handleCheck(i)}
                />
                {mission}
              </label>
            </li>
          ))}
        </ul>

        {/* ✅ 닫기 버튼 */}
        <button className="mission-close" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default MissionModal;
