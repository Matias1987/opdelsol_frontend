import { Segmented } from "antd";
import { useState } from "react";

const PosNegPicker = ({ value, onChange }) => {
  const [internalValue, setInternalValue] = useState(value || "+");

  const handleChange = (val) => {
    setInternalValue(val);
    onChange?.(val);
    alert(`Selected: ${val}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <Segmented
        options={[
          { label: "+", value: "+" },
          { label: "-", value: "-" },
        ]}
        value={internalValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default PosNegPicker;
