import { Button, Col, Input, Row } from "antd";
import SelectCodigoVenta from "./SelectCodigoVenta";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const VentasArmazon = (props) => {
    const [codigo, setCodigo] = useState(null);
    const [visible, setVisible] = useState(false);
    const _armazon = {
        codigo: null,
        precio: -1,
    }
    const on_precio_change = (e) => {
        _armazon.precio = e.target.value;
        props.callback(_armazon);
    }

    const on_codigo_change = (val) => {
        _armazon.codigo = val;
        props.callback(_armazon);
    }

    return (
        !visible ? <Button size="small" onClick={()=>{setVisible(true)}}>{
            typeof props.buttonText === 'undefined' ?
            "Establecer Armazon"
            :
            props.buttonText
            }</Button>  :
        <>
            <Row>
                <Col span={8}>
                    <SelectCodigoVenta callback={on_codigo_change} />
                </Col>
                <Col span={8}>
                    <Input addonBefore={"Precio:"} onChange={on_precio_change} />
                </Col>
                <Col span={8}>
                <Button danger onClick={()=>{setVisible(false)}}><DeleteOutlined/></Button>
                </Col>
            </Row>
        </>
        )
}

export default VentasArmazon;