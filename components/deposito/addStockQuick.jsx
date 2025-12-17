import CodeSelect from "../CodeSelect";

import { Row, Col, Button, Input, Divider, InputNumber } from "antd";
import SubGroupSelectV2 from "../SubGrupoSelectV2";


const AddStockQuick = (props) => {

    return <>
    
    <Row style={{padding:"8px"}}>
        <Col span={24}><Input prefix={<span style={{fontWeight:"bold"}}>C&oacute;digo: </span>} allowClear /></Col>
    </Row>
    <Row style={{padding:"8px"}}>
        <Col span={24}><Input prefix={<span style={{fontWeight:"bold"}}>Descripci&oacute;n: </span>} allowClear /></Col>
    </Row>
    <Row style={{padding:"8px"}}>
        <Col span={24}>
        <InputNumber style={{width:"300px"}} decimalSeparator="." prefix={<span style={{fontWeight:"bold"}}>Precio: </span>} />
        </Col>
    </Row>
    <Row style={{padding:"8px"}}>
        <Col>
        <SubGroupSelectV2 callback={_id=>{}} />
        </Col>
    </Row>
    <Divider />
    <Row style={{padding:"8px"}}>
        <Col span={24} style={{display:"flex", justifyContent:"end"}}>
            <Button type="primary">Guardar</Button>
        </Col>
    </Row>
    </>
}

export default AddStockQuick;