import { Button, Col, Form, Input, Row } from "antd";
import SelectCodigoVenta from "../SelectCodigoVenta";
import { useEffect, useRef, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";

const RecStockCristal = (props) => {
    const [codigo, setCodigo] = useState(null);
    const [visible, setVisible] = useState(false);
    const [precio, setPrecio] = useState(0)
    const precioRef = useRef(null)

    //useEffect(()=>{},[codigo])

    const _cristal = {
        tipo: props.tipo,
        codigo: null,
        eje: -1,
        precio: 0
    }

    const onchange_codigo = (value) => {
        _cristal.codigo = value.codigo;
        _cristal.precio = value.precio;
         
        setPrecio(value.precio)
        precioRef.current.value = value.precio;
        alert(precioRef.current.value)

        props.callback(_cristal)
        
    }
    const onchange_eje = (e) => {
        _cristal.eje = e.target.value;
        /*if(typeof props.onChangeEje !== 'undefined'){
            props.onChangeEje(_cristal);
        }*/
        
    }
    const onchange_precio = (e) => {
        
        _cristal.precio = e.target.value;
        setPrecio(e.target.value)
        props.callback(_cristal)
        /*if(typeof props.onChangePrecio !== 'undefined'){
            alert("000")
            props.onChangePrecio(_cristal);
        }*/
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
                    <Input addonBefore={"Eje:"} onChange={onchange_eje} />&nbsp;
                </Col>
                <Col span={4}>
                    <span>&nbsp;&nbsp;Precio: </span><input onChange={onchange_precio} ref={precioRef} style={{textAlign:"right", width:"100px", border: "1px solid #ccc", borderRadius:"6px", borderColor:"lightgray", padding:".4em", fontSize:"1.1em"}} />
                </Col>
                <Col span={1}>
                    <Button danger  onClick={()=>{setVisible(false)}}><DeleteOutlined/></Button>
                </Col>
            </Row>

        </>
        )
}

export default RecStockCristal;