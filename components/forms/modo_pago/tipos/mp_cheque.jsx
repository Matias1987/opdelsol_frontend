import { Col, Input, Row, Select } from "antd"
import { useState } from "react"

const MP_Cheque = (props)=>{
    const [modoPago, setModoPago] = useState({
        monto:0,
        fk_banco:-1,
        
    })
    const bancos = []
    const onChange = (idx, val) => setModoPago((_mp)=>({
        ..._mp,[idx]:val
    }))
    return <>
    <Row>
        <Col span={9}>
            <Input 
            type="number" 
            onClick={(e)=>{e.target.select()}} 
            value={modoPago.monto} 
            prefix="Cheque: "  
            onChange={(e)=>{onChange("cheque_monto", e.target.value.length<1 ? 0 : e.target.value)}}
            />
        </Col>
        <Col span={14}>
            &nbsp;Banco:&nbsp;<Select value={modoPago.fk_banco} placeholder="Seleccione Banco" style={{width:"300px"}} options={bancos} onChange={(value)=>{onChange("fk_banco",value)}} />
        </Col>
    </Row></>
}

export default MP_Cheque;