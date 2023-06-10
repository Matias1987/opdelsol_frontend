import { Button, Col, Input, Row } from "antd";
import SelectCodigoVenta from "./SelectCodigoVenta";
import { useRef, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const VentasArmazon = (props) => {
    const [codigo, setCodigo] = useState(null);
    const [visible, setVisible] = useState(false);
    const [precio, setPrecio] = useState(0);
    const precioRef = useRef(null)
    const _armazon = {
        codigo: null,
        precio: -1,
    }
    const on_precio_change = (e) => {
        _armazon.precio = e.target.value;
        setPrecio(e.target.value)
        props.callback(_armazon);
    }

    const on_codigo_change = (val) => {
        _armazon.codigo = val;
        precioRef.current.value=val.precio;
        setPrecio(val.precio);
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
                <Col span={19}>
                    <SelectCodigoVenta callback={on_codigo_change} />
                </Col>
                <Col span={4}>
                    
                    <span>Precio:&nbsp;<input onChange={on_precio_change}  ref={precioRef} style={{textAlign:"right", width:"100px", border: "1px solid #ccc", borderRadius:"6px", borderColor:"lightgray", padding:".4em", fontSize:"1.1em"}}  /></span>
                </Col>
                <Col span={1}>
                <Button danger onClick={()=>{setVisible(false)}}><DeleteOutlined/></Button>
                </Col>
            </Row>
        </>
        )
}

export default VentasArmazon;