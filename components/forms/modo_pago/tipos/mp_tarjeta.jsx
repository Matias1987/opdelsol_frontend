import { Col, Input, Row, Select } from "antd"
import { useState } from "react"

const MP_Tarjeta = (props)=>{
    const [modoPago, setModoPago] = useState({
        monto:0,
        fk_tarjeta:-1,
        tarjeta_tarjeta:-1,
    })
    const onChange = (idx, val) => setModoPago((_mp)=>({
        ..._mp,[idx]:val
    }))
    return <>
    <Row style={{display: props?.tarjetaHidden ? "none" : "flex"}}>
                <Col span={6}>
                    <Input 
                    type="number" 
                    min={0} 
                    step={0.01}  
                    onClick={(e)=>{e.target.select()}} 
                    value={modoPago.monto}  
                    /*prefix={<><Button type="link" onClick={()=>{ if(modoPago.saldo<0){return} onChange("tarjeta_monto",modoPago.saldo)}}>Tarjeta</Button></> }*/
                    prefix="Tarjeta: "  
                    onChange={(e)=>{onChange("tarjeta_monto", e.target.value.length<1 ? 0 : e.target.value)}} 
                    />
                </Col>
                <Col span={9}> 
                    <Select placeholder="Seleccione Tarjeta" value={modoPago.fk_tarjeta} options={[]} style={{width:'100%'}} onChange={(value)=>{onChange("fk_tarjeta", value)}} />
                </Col>
 
                <Col span={4}>
                    <Input value={modoPago.tarjeta_tarjeta}  onClick={(e)=>{e.target.select()}}  prefix="C. Cuotas: " onChange={(e)=>{onChange("tarjeta_tarjeta", e.target.value)}} />
                </Col>
                
            </Row>
    </>
}

export default MP_Tarjeta;