import { Tooltip, Button, Switch, Input, InputNumber } from "antd";
import { useState } from "react";

const HelperToolTip = ({ disabled, callback, value, onChange, prefix }) => {
  const [enabled, setEnabled] = useState(false);

  return (
    <Tooltip
      placement="top"
      title={
        <>
          <Switch
            checked={enabled}
            onChange={(_) => setEnabled(!enabled)}
            checkedChildren="-"
            unCheckedChildren="+"
            defaultChecked
            style={{
              backgroundColor: enabled ? "green" : "orange", // Set colors dynamically
            }}
          />
        </>
      }
      color="cyan"
    >
      <InputNumber
        onClick={(e) => {
          e.target.select();
        }}
        style={{ width: "130px",  }}
        prefix={<span style={{fontWeight:"500"}}>{`${enabled ? '-' : '+'}`}</span>}
        size="small"
        addonBefore={`${prefix}:`}
        disabled={disabled}
        value={value}
        defaultValue={0}
        step={"0.25"}
        min={0}
        onChange={(e) => {
          onChange?.(e);
        }}
      />
    </Tooltip>
  );
};

export default HelperToolTip;
