import { Tooltip, Button, Switch, Input, InputNumber } from "antd";
import { useState } from "react";
import PosNegPicker from "./PosNegPicker";

const HelperToolTip = ({ disabled, callback, value, onChange, prefix }) => {
  const [enabled, setEnabled] = useState(true);

  return (
    <Tooltip
      placement="top"
      title={
        <>
          {/*<Switch
            size="large"
            checked={enabled}
            onChange={(_) => setEnabled(!enabled)}
            checkedChildren={<span style={{fontSize:"1.5em", fontWeight:"bolder", marginTop:"-32px"}}>-</span>}
            unCheckedChildren={<span style={{fontSize:"1.5em", fontWeight:"bolder", marginTop:"-12px"}}>+</span>}
            defaultChecked
            style={{
              backgroundColor: enabled ? "green" : "orange", padding: "0" // Set colors dynamically
            }}
          />*/}
          <PosNegPicker
            onChange={(_) => setEnabled(!enabled)}
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
