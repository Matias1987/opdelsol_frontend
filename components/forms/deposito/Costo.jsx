import { Checkbox, InputNumber } from "antd";
import { useState } from "react";

const CostoCheckBox = (props) => {
    const [checked, setChecked] = useState(false);
    const toggleChecked = (e) => {
        props.callback(-1);
        setChecked(!checked)
    }
    return <>
    <Checkbox onChange={(e)=>{toggleChecked(e)}} checked={checked} />&nbsp;
    <InputNumber max="500000" step={.01} onChange={(v)=>{props.callback(v)}} disabled={!checked} />
</>
}

export default CostoCheckBox;