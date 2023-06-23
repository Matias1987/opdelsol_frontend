import { Button, Col, Input, Row } from "antd";
import SelectCodigoVenta from "./SelectCodigoVenta";
import { useRef, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const VentasInsumo = (props) => {
    const [visible, setVisible] = useState(false);
    const precioRef =useRef(null);
    const [tratamiento, setTratamiento] = useState({
        codigo: null,
        precio: 0,
    })
    const on_codigo_change = (val) => {
        /*ratamiento.codigo = val;
        props.callback(tratamiento);*/
        precioRef.current.value=val.precio;
        setTratamiento((tratamiento)=>{
            const __tratamiento ={...tratamiento,codigo:val.codigo, precio: val.precio};
            props?.callback(__tratamiento);
            return __tratamiento;
        })
    }
    const on_precio_change = (e) => {
        /*tratamiento.precio = e.target.value;
        props.callback(tratamiento);*/
        
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