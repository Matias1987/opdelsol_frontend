import { Button, Col, Form, Input, Row } from "antd";
import SelectCodigoVenta from "../SelectCodigoVenta";
import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";

const RecStockCristal = (props) => {
    const [codigo, setCodigo] = useState(null);
    const [visible, setVisible] = useState(false);

    const _cristal = {
        tipo: props.tipo,
        codigo: "-1",
        eje: -1,
        precio: 0
    }

    const onchange_codigo = (value) => {
        _cristal.codigo = value;
        props.callback(_cristal);
    }
    const onchange_eje = (e) => {
        _cristal.eje = e.target.value;
        props.callback(_cristal);
    }
    const onchange_precio = (e) => {
        _cristal.precio = e.target.value;
        props.callback(_cristal);
    }
    
    return (
        !visible ? <Button size="small" onClick={()=>{setVisible(true)}}>{
            typeof props.buttonText === 'undefined' ?
            "Establecer Cristal"
            :
            props.buttonText
            }</Button> :
        <>
            <Row>
                <Col span={15}>
                    <SelectCodigoVenta buttonText={"Seleccionar Codigo Cristal"} callback={onchange_codigo} />
                </Col>
                <Col span={4}>
                    <Input addonBefore={"Eje:"} onChange={onchange_eje} />
                </Col>
                <Col span={4}>
                    <Input addonBefore={"Precio:"} onChange={onchange_precio} />
                </Col>
                <Col span={1}>
                    <Button danger  onClick={()=>{setVisible(false)}}><DeleteOutlined/></Button>
                </Col>
            </Row>

        </>
        )
}

export default RecStockCristal;