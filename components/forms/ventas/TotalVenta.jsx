import { Col, Input, Row } from "antd";
import { useEffect, useState } from "react";

const TotalesVenta = (props) => {
    const [descuento, setDescuento] = useState(0);
    const [total, setTotal] = useState(0);
    const totales = {
        descuento: 0,
        concepto_descuento: "",
        nro_orden: "",
        total: 0,
    }
    const onDescuentoChange = (e)=>{
        setDescuento(e.target.value)
        setTotal(props.total - e.target.value)
    }
    useEffect(()=>{
        setTotal(props.total - descuento)
    })
return (
    <>
        <Row>
            <h4>Totales</h4>
        </Row>
        <Row>
            <Col span={5}><Input prefix={"SubTotal: $"} readOnly value={props.total}/></Col>

            <Col span={5}><Input prefix={"Descuento: $"} onChange={onDescuentoChange} style={{backgroundColor:"lightyellow"}}/></Col>

            <Col span={14}><Input prefix={"Concepto Descuento: "} style={{backgroundColor:"lightyellow"}} ></Input></Col>
        </Row>
        <Row>
            <Col span={24}><Input prefix={"Total: $"} readOnly  value={total} /></Col>
        </Row>
    </>)
}

export default TotalesVenta;