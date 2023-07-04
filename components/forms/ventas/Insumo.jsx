import { Button, Col, Input, Row } from "antd";
import SelectCodigoVenta from "./SelectCodigoVenta";
import { useRef, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const VentasInsumo = (props) => {
    const [visible, setVisible] = useState(false);
    const precioRef =useRef(null);
    const [insumo, setInsumo] = useState({
        codigo: null,
        precio: 0,
        cantidad:1,
    })
    const on_codigo_change = (val) => {
        
        precioRef.current.value=val.precio;

        setInsumo((insumo)=>{
            const __insumo ={...insumo,codigo:val.codigo, precio: val.precio};
            props?.callback?.(__insumo);
            return __insumo;
        })
    }

    const on_precio_change = (e) => {
        
        setInsumo((insumo)=>{
            const __insumo = {...insumo, precio: e.target.value};
            props?.callback?.(__insumo);
            return __insumo;    
        })
        
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
                    <span>&nbsp;&nbsp;Precio: </span><input onChange={on_precio_change} ref={precioRef} style={{textAlign:"right", width:"100px", border: "1px solid #ccc", borderRadius:"6px", borderColor:"lightgray", padding:".4em", fontSize:"1.1em"}} />
                </Col>
                <Col span={1}>
                <Button danger onClick={()=>{setVisible(false)}}><DeleteOutlined/></Button>
                </Col>
            </Row>
        </>
        )
}

export default VentasInsumo;