import { Col, Input, Row, Select } from "antd"
import { useState } from "react"

const MP_CtaCte = (props)=>{
    const [modoPago, setModoPago] = useState({
        monto: 0,
        ctacte_monto_cuotas:0,
        ctacte_cuotas:0,

    })
    const onChange = (idx,val)=>{setModoPago(_mp=>({..._mp,[idx]:val}))}
    const dataCuotas=[]
    return <>
    <Row style={{display: props.ctacteHidden  ? "none" : "flex"}}>
                <Col span={11}>
                    <Input 
                    type="number" 
                    onClick={(e)=>{e.target.select()}} 
                    value={modoPago.ctacte_monto} 
                    /*prefix={<><Button type="link" onClick={()=>{ if(modoPago.saldo<0){return} onChangeMontoCtaCte(modoPago.saldo)}}>Cta. Cte.: </Button></>} */
                    prefix="Cta. Cte.: " 
                    onChange={(e)=>{/*onChangeMontoCtaCte(e.target.value)*/}} 
                    />
                </Col>
                <Col span={1}>Cuotas</Col>
                <Col span={3}>
                    <Select options={dataCuotas} value={modoPago.ctacte_cuotas} onChange={(v)=>{
                        }
                        } />
                </Col>
                <Col span={8}><Input  type="number" readOnly={false} onClick={(e)=>{e.target.select()}} value={modoPago.ctacte_monto_cuotas}  prefix="Valor Cuota: " onChange={(e)=>{onChange("ctacte_monto_cuotas", parseFloat(e.target.value))}}></Input></Col>
            </Row>
    </>
}

export default MP_CtaCte;