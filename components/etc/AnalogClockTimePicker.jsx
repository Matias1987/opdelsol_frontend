import React, { useState } from "react";

const AnalogClockTimePicker = () => {
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [isAM, setIsAM] = useState(true);

  const handleClockClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;

    // angle in radians
    const angle = Math.atan2(y, x);
    // convert to degrees (0 at 12 o’clock, clockwise)
    const degrees = (angle * 180) / Math.PI + 90;
    const normalized = (degrees + 360) % 360;

    if (e.shiftKey) {
      // Shift+Click → set minutes
      const minute = Math.round(normalized / 6) % 60; // 360/60
      setSelectedMinute(minute);
    } else {
      // Normal click → set hours
      const hour = Math.round(normalized / 30) % 12; // 360/12
      setSelectedHour(hour === 0 ? 12 : hour);
    }
  };

  const hourDeg = (selectedHour % 12) * 30 + (selectedMinute / 60) * 30;
  const minuteDeg = selectedMinute * 6;

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          position: "relative",
          width: "200px",
          height: "200px",
          border: "5px solid #333",
          borderRadius: "50%",
          margin: "20px auto",
          cursor: "pointer",
        }}
        onClick={handleClockClick}
      >
        {/* Hour hand */}
        <div
          style={{
            position: "absolute",
            width: "6px",
            height: "60px",
            backgroundColor: "#333",
            top: "40px",
            left: "97px",
            transformOrigin: "bottom center",
            transform: `rotate(${hourDeg}deg)`,
          }}
        />
        {/* Minute hand */}
        <div
          style={{
            position: "absolute",
            width: "4px",
            height: "80px",
            backgroundColor: "#666",
            top: "20px",
            left: "98px",
            transformOrigin: "bottom center",
            transform: `rotate(${minuteDeg}deg)`,
          }}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <span style={{ fontSize: "18px", marginRight: "10px" }}>
          {selectedHour}:{selectedMinute.toString().padStart(2, "0")}{" "}
          {isAM ? "AM" : "PM"}
        </span>
        <label>
          <input
            type="checkbox"
            checked={!isAM}
            onChange={() => setIsAM(!isAM)}
          />
          PM
        </label>
      </div>
      <p style={{ fontSize: "12px", color: "#555" }}>
        Tip: Click to set hour, Shift+Click to set minutes
      </p>
    </div>
  );
};

export default AnalogClockTimePicker;