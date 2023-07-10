import { Button, Col, Form, Input, Row } from "antd";
import SelectCodigoVenta from "../SelectCodigoVenta";
import { useEffect, useRef, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import globals from "@/src/globals";

const RecStockCristal = (props) => {
    const [visible, setVisible] = useState(false);
    const precioRef = useRef(null)

    const [cristal , setCristal]= useState({
        idcodigo: -1,
        tipo: props.tipo,
        codigo: null,
        eje: -1,
        precio: 0,
        cantidad:1,
    })

    const onchange_codigo = (value) => {
        /*
        cristal.codigo = value.codigo;
        cristal.precio = value.precio;
        setPrecio(value.precio)
        alert(precioRef.current.value)
        props.callback(cristal)
        */
        precioRef.current.value = value.precio;
        setCristal(
            (cristal)=>{
                const _cristal = {...cristal, codigo: value.codigo, precio: value.precio, idcodigo: value.idcodigo}
                props?.callback(_cristal)
                return _cristal
            }
        )
        
    }
    const onchange_eje = (e) => {
        //cristal.eje = e.target.value;
        setCristal(
            (cristal)=>{
                const _cristal = {...cristal, eje: e.target.value}
                props?.callback(_cristal)
                return _cristal
            }
        )
    }
    const onchange_precio = (value) => {
        /*cristal.precio = e.target.value;
        setPrecio(e.target.value)
        props.callback(_cristal)*/
        setCristal(
            (cristal)=>{
                const _cristal = {...cristal, precio: value.precio}
                props?.callback(_cristal)
                return _cristal
            }
        )

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
                    <SelectCodigoVenta idfamilias={[globals.familiaIDs.CRISTALES]} buttonText={"Seleccionar Codigo Cristal"} callback={onchange_codigo} />
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