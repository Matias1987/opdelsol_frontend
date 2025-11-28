import { Button, Col, Input, InputNumber, Radio, Row, Select } from "antd";
import { useState } from "react";

const IVAForm = (props) => {
    const [iva, setIva] = useState({
        monto:0,
        tipo:"21"
    })
    return <>
    <Row style={{padding:"1em"}}>
        <Col span={24}>
            Tipo:&nbsp;&nbsp;
            <Radio.Group  onChange={(e)=>{
                setIva(i=>({...i,tipo:e.target.value}))
            }} value={iva.tipo}>
                <Radio value={"21"}>21%</Radio>
                <Radio value={"10.5"}>10.5%</Radio>
                <Radio value={"27"}>27%</Radio>
                <Radio value={"2.5"}>2.5%</Radio>
            </Radio.Group>
        </Col>
       
    </Row>
    <Row style={{padding:"1em"}}>
        <Col span={24}>
            {/*<Input 
            onClick={(e)=>{e.target.select()}} 
            type="number"
            style={{width:"100%"}}
            value={(iva.monto)}
            prefix="Monto: "  
            onChange={(e)=>{setIva(i=>({...i,monto:(e.target.value.length<1? "0":e.target.value)}))}}/>*/}
            <InputNumber 
            prefix="Monto: "
            decimalSeparator="." 
            onClick={(e)=>{e.target.select()}}
            style={{width:"100%"}}
            value={iva.monto}
            onChange={(value)=>{setIva(i=>({...i,monto:(value||"").toString().length<1? "0":value.toString()}))}}/>
        </Col>
    </Row>
    <Row style={{padding:"1em"}}>
        <Col span={24}>
        <Button type="primary" block onClick={()=>{props?.callback?.(iva)}}>Agregar</Button>
        </Col>
    </Row>
    
    </>
}

export default IVAForm;