import { Checkbox, Col, Input,  Row } from "antd";
import { useState } from "react";

const CostoCheckBox = (props) => {
    const [checked, setChecked] = useState(false);
    const toggleChecked = (e) => {
        props.callback(-1);
        setChecked(!checked)
    }
    return <>
    <Row>
        <Col span={4}>
            <Checkbox onChange={(e)=>{toggleChecked(e)}} checked={checked} >Modificar Costo</Checkbox>
        </Col>
        <Col span={18}>
            <Input type="number"  step={.01} onChange={(v)=>{props.callback(v)}} disabled={!checked} />
        </Col>
    </Row>
    
    
</>
}

export default CostoCheckBox;