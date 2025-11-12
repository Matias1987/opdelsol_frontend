import { Button, Col, Input, Row } from "antd";
import { useState } from "react";

const PercepcionesForm = (props) => {
    const [percepcion, setPercepcion] = useState({
        monto:0,
        tipo:"percepcion",
    })
    return <>
    <Row>
        <Col span={24}>
            <Input 
            type="number"
            value={(percepcion.monto)}
            prefix="Monto Percepción" 
            onChange={(e)=>{
                setPercepcion(p=>({...p,monto:(e.target.value.length<1? "0":e.target.value)}))
            }} />
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