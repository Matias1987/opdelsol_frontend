import { Button, Col, Input, Row, Select } from "antd";
import { useState } from "react";

const RetencionesForm = (props) => {
    const [retencion, setRetencion] = useState({
        monto:0,
        tipo:"iva",

    })
    return <>
        <Row style={{padding:"1em"}}>
            <Col span={24}>
                <Input prefix="Monto Retención: " onChange={(e)=>{
                    setRetencion(r=>({...r,monto:parseFloat(e.target.value)}))
                }} />
            </Col>
        </Row>
        <Row style={{padding:"1em"}}>
            <Col span={3} style={{paddingTop:".3em"}}>
            Detalle
            </Col>
            <Col span={21}>
                <Select 
                value={retencion.tipo}
                style={{width:"100%"}}
                options={[
                    {label:"RETENCIONES IVA", value:"iva"},
                    {label:"RETENCIONES GANANCIAS", value:"ganancias"},
                ]}
                onChange={(v)=>{
                    setRetencion(r=>({...r,tipo:v}))
                }}
                />
            </Col>
        </Row>
        <Row style={{padding:"1em"}}>
            <Col span={24}>
                <Button onClick={()=>{props?.callback?.(retencion)}}>Agregar</Button>
            </Col>
        </Row>
        
        <Row>
            <Col span={24}>
            </Col>
        </Row>
    </>
}

export default RetencionesForm;