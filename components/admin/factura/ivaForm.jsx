import { Button, Col, Input, Row, Select } from "antd";
import { useState } from "react";

const IVAForm = (props) => {
    const [iva, setIva] = useState({
        monto:0,
        tipo:"21"
    })
    return <>
    <Row>
        <Col span={3}>
        </Col>
        <Col span={21}>
            <Select 
            style={{width:"200px"}}
            options={[
                {value:"21", label:"21%"},
                {value:"10", label:"10%"},
            ]}
            onChange={v=>{
                setIva(i=>({...i,tipo:v}))
            }}
            />
        </Col>
    </Row>
    <Row>
        <Col span={21}>
            <Input 
            value={parseFloat(iva.monto||"0")}
            prefix="Monto: "  
            onChange={(e)=>{setIva(i=>({...i,monto:parseFloat(e.target.value)}))}}/>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
        <Button onClick={()=>{props?.callback?.(iva)}}>Agregar</Button>
        </Col>
    </Row>
    
    </>
}

export default IVAForm;