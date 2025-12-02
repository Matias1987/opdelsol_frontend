import { Button, Col, Input, InputNumber, Row, Select } from "antd";
import { useState } from "react";

const RetencionesForm = (props) => {
    const [retencion, setRetencion] = useState({
        monto:0,
        tipo:"iva",

    })
    return <>
        <Row style={{padding:"1em"}}>
            <Col span={24}>
                {/*<Input 
                type="number"
                onClick={(e)=>{e.target.select()}} 
                value={(retencion.monto)}
                prefix="Monto Retención: " 
                onChange={(e)=>{
                    setRetencion(r=>({...r,monto:(e.target.value.length<1? "0":e.target.value)}))
                }} />*/}
                <InputNumber 
                style={{width:"300px"}}
                onClick={(e)=>{e.target.select()}} 
                value={retencion.monto}
                onChange={(value)=>{
                    setRetencion(r=>({...r,monto:(value||"").toString().length<1? "0":value.toString()}))
                }}
                />
            </Col>
        </Row>
        <Row  style={{padding:"1em"}}>
            <Col span={24}>
                <Row>
                    <Col span={24} style={{paddingTop:".3em"}}>
                    Detalle
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
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
            </Col>
        </Row>
        
        <Row style={{padding:"1em"}}>
            <Col span={24}>
                <Button type="primary" block onClick={()=>{props?.callback?.(retencion)}}>Agregar</Button>
            </Col>
        </Row>
        
        <Row>
            <Col span={24}>
            </Col>
        </Row>
    </>
}

export default RetencionesForm;