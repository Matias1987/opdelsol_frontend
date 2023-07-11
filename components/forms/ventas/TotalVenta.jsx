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
            <Col span={5}><Input prefix={"SubTotal: $"} bordered={false} readOnly value={props.subtotal||0}/></Col>

            <Col span={5}><Input prefix={"Descuento: $"} onChange={onDescuentoChange} value={descuento} style={{backgroundColor:"lightyellow"}}/></Col>

            <Col span={14}><Input prefix={"Concepto Descuento: "} style={{backgroundColor:"lightyellow"}} ></Input></Col>
        </Row>
        <Row>
            <Col span={24}><Input prefix={"Total: $"}  bordered={false} readOnly  value={total} /></Col>
        </Row>
    </>)
}

export default TotalesVenta;