import { Button, Col, Input, InputNumber, Row } from "antd";
import { useState } from "react";

const PercepcionesForm = (props) => {
    const [percepcion, setPercepcion] = useState({
        monto:0,
        tipo:"percepcion",
    })
    return <>
    <Row>
        <Col span={24}>
            {/*<Input 
            onClick={(e)=>{e.target.select()}} 
            type="number"
            value={(percepcion.monto)}
            prefix="Monto Percepción" 
            onChange={(e)=>{
                setPercepcion(p=>({...p,monto:(e.target.value.length<1? "0":e.target.value)}))
            }} />*/}
            <InputNumber 
            style={{width:"300px"}}
            onClick={(e)=>{e.target.select()}} 
            value={percepcion.monto}
            onChange={(value)=>{
                setPercepcion(p=>({...p,monto:(value||"").toString().length<1? "0":value.toString()}))
            }}
            />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Button onClick={()=>{
                props?.callback?.(percepcion)
            }}>
                Agregar
            </Button>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
        </Col>
    </Row>
    </>
}

export default PercepcionesForm;