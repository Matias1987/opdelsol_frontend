import { Segmented } from "antd";
import { useState } from "react";

const PosNegPicker = ({ value, onChange }) => {
  const [internalValue, setInternalValue] = useState(value || "-");

  const handleChange = (val) => {
    setInternalValue(val);
    onChange?.(val);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <Segmented
        options={[
          { label: "+", value: "+", className: "segmented-blue" },
          { label: "-", value: "-", className: "segmented-danger" },
        ]}
        value={internalValue}
        onChange={handleChange}
        styles={{
          label: {
            fontSize: "23px",
            fontWeight: "600",
            fontFamily: "Courier New, monospace",
          },
        }}
        className="custom-segmented"
      />
    </div>
  );
};

export default PosNegPicker;
