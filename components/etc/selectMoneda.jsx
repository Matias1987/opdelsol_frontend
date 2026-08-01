import { Select } from "antd";
import { useEffect } from "react";

const SelectMoneda = ({ value, onChange }) => {
  useEffect(() => {
    if (!value) {
      onChange("ARS");
    }
  }, [value, onChange]);

  return (
    <Select
      prefix="Moneda: "
      defaultValue={"ARS"}
      value={value}
      onChange={onChange}
    >
      <option value="ARS">ARS</option>
      <option value="USD">USD</option>
    </Select>
  );
};

export default SelectMoneda;
