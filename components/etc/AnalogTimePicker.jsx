import React, { useState } from 'react';

const AnalogTimePicker = () => {
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);

  const renderMarks = (count, radius, type) => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i * 360 / count) * (Math.PI / 180);
      const x = Math.sin(angle) * radius + 150;
      const y = -Math.cos(angle) * radius + 150;
      const value = type === 'hour' ? (i === 0 ? 12 : i) : ".";

      return (
        <div
          key={`${type}-${i}`}
          className={`mark ${type}`}
          style={{ left: `${x}px`, top: `${y}px` }}
          onClick={() => type === 'hour' ? setSelectedHour(value) : setSelectedMinute(value)}
        >
          {value}
        </div>
      );
    });
  };

  return (
    <div className="picker-container">
      <div className="clock-face">
        {renderMarks(12, 100, 'hour')}
        {renderMarks(60, 120, 'minute')}
        <div className="center-dot"></div>
      </div>
      <div className="selected-time">
        Selected Time: {selectedHour !== null && selectedMinute !== null
          ? `${selectedHour}:${selectedMinute.toString().padStart(2, '0')}`
          : 'None'}
      </div>
    </div>
  );
};

export default AnalogTimePicker;
