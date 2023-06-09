import { Button, Col, Input, Row } from "antd";
import SelectCodigoVenta from "./SelectCodigoVenta";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const VentasTratamiento = (props) => {
    const [codigo, setCodigo] = useState(null);
    const [visible, setVisible] = useState(false);
    const _tratamiento = {
        codigo: null,
        precio: 0,
    }
    const on_codigo_change = (val) => {
        _tratamiento.codigo = val;
        props.callback(_tratamiento);
    }
    const on_precio_change = (e) => {
        _tratamiento.precio = e.target.value;
        props.callback(_tratamiento);
    }

    return (
        !visible ? <Button size="small" onClick={()=>{setVisible(true)}}>{
            typeof props.buttonText === 'undefined' ?
            "Establecer Cristal"
            :
            props.buttonText
            }</Button>  :
        <>
            <Row>
                <Col span={19}>
                    <SelectCodigoVenta callback={on_codigo_change} />
                </Col>
                <Col span={4}>
                    <Input addonBefore={"Precio:"} onChange={on_precio_change} />
                </Col>
                <Col span={1}>
                <Button danger onClick={()=>{setVisible(false)}}><DeleteOutlined/></Button>
                </Col>
            </Row>
        </>
        )
}

export default VentasTratamiento;