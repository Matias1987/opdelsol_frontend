import { Button, Col, Form, Input, Row } from "antd";
import SelectCodigoVenta from "../SelectCodigoVenta";
import { useEffect, useRef, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";

const LCItem = (props) => {
    const [codigo, setCodigo] = useState(null);
    const [visible, setVisible] = useState(false);
    const [precio, setPrecio] = useState(0)
    const precioRef = useRef(null)

    const _lc = {
        tipo: props.tipo,
        codigo: null,
        eje: -1,
        precio: 0
    }

    const onchange_codigo = (value) => {
        _lc.codigo = value.codigo;
        _lc.precio = value.precio;
         
        setPrecio(value.precio)
        precioRef.current.value = value.precio;
        alert(precioRef.current.value)

        props.callback(_lc)
        
    }
    
    const onchange_precio = (e) => {
        
        _lc.precio = e.target.value;
        setPrecio(e.target.value)
        props.callback(_lc)
    }
    
    return (
        !visible ? <Button size="small" onClick={()=>{setVisible(true)}}>{
            typeof props.buttonText === 'undefined' ?
            "Propio"
            :
            props.buttonText
            }</Button> :
        <>
            <Row>
                <Col span={11}>
                    <SelectCodigoVenta buttonText={"Seleccionar Codigo LC"} callback={onchange_codigo} />
                </Col>
                
                <Col span={4}>
                    <span>&nbsp;&nbsp;Precio: </span><input onChange={onchange_precio} ref={precioRef} style={{textAlign:"right", width:"100px", border: "1px solid #ccc", borderRadius:"6px", borderColor:"lightgray", padding:".4em", fontSize:"1.1em"}} />
                </Col>
                <Col span={4}>
                    <span>&nbsp;&nbsp;Cantidad: </span><input onChange={onchange_precio} ref={precioRef} style={{textAlign:"right", width:"100px", border: "1px solid #ccc", borderRadius:"6px", borderColor:"lightgray", padding:".4em", fontSize:"1.1em"}} />
                </Col>
                <Col span={4}>
                    <Input addonBefore={"Total:"} />&nbsp;
                </Col>
                <Col span={1}>
                    <Button danger  onClick={()=>{setVisible(false)}}><DeleteOutlined/></Button>
                </Col>
            </Row>

        </>
        )
}

export default LCItem;