import { Col, Input, Row } from "antd";
import { useEffect, useState } from "react";

const TotalesVenta = (props) => {
    const [descuento, setDescuento] = useState(0);
    const [total, setTotal] = useState(0);
    
    const onDescuentoChange = (e)=>{
        setDescuento((descuento)=>{
            props?.callback?.(e.target.value)
            setTotal(e.target.value)
            return e.target.value
        })
    }

    useEffect(()=>{
        setTotal((props?.subtotal||0) - descuento)
    })

return (
    <>
        <Row>
            <Col span={5}><Input style={{fontWeight: "bold"}} prefix={"SubTotal: $"} bordered={false} readOnly value={props.subtotal||0}/></Col>

            <Col span={5}><Input  type="number" onClick={(e)=>{e.target.select()}}  prefix={"Descuento: $"} onChange={onDescuentoChange} value={descuento} style={{backgroundColor:"rgba(255, 99, 71, 0.3)"}}/></Col>

            <Col span={14}><Input prefix={"Concepto Descuento: "} style={{backgroundColor:"rgba(255, 99, 71, 0.3)"}} ></Input></Col>
        </Row>
        <Row>
            <Col span={24}><Input prefix={"Total: $"} style={{fontWeight: "bold"}}  bordered={false} readOnly  value={total} /></Col>
        </Row>
    </>)
}

export default TotalesVenta;