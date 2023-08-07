import { Button, Col, Input, Row } from "antd";
import SelectCodigoVenta from "./SelectCodigoVenta";
import { useRef, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import globals from "@/src/globals";

const VentasTratamiento = (props) => {

    const [visible, setVisible] = useState(false);

    const precioRef =useRef(null);

    const [tratamiento, setTratamiento] = useState({
        idcodigo: -1,
        codigo: null,
        precio: 0,
        cantidad:1,
    })

    const on_codigo_change = (val) => {
        precioRef.current.value=val.precio;
        setTratamiento((tratamiento)=>{
            const _tratamiento = {...tratamiento,codigo: val.codigo, idcodigo: val.idcodigo, precio: val.precio}
            props?.callback(_tratamiento);
            return {...tratamiento, codigo:val.codigo, precio: val.precio};
        })
    }
    
    const on_precio_change = (e) => {
        setTratamiento((tratamiento)=>{
            const _tratamiento = {...tratamiento,precio: e.target.value}
            props?.callback(_tratamiento)
            return {...tratamiento, precio: e.target.precio}
        })
    }

    const onRemove = () => {
        on_codigo_change({precio:0, codigo:null, idcodigo: -1})
        setVisible(v=>{ props?.onVisibleChange?.(false); return false;})
    }

    return (
        !visible ? <Button size="small" onClick={()=>{setVisible(v=>{ props?.onVisibleChange?.(true); return true;})}}>{
            typeof props.buttonText === 'undefined' ?
            "Establecer Cristal"
            :
            props.buttonText
            }</Button>  :
        <>
            <Row>
                <Col span={19}>
                    <SelectCodigoVenta idfamilias={[globals.familiaIDs.TRATAMIENTO]} callback={on_codigo_change} />
                </Col>
                <Col span={4}>
                    <span>&nbsp;&nbsp;Precio: </span><input onChange={on_precio_change} ref={precioRef} style={{textAlign:"right", width:"100px", border: "1px solid #ccc", borderRadius:"6px", borderColor:"lightgray", padding:".4em", fontSize:"1.1em"}} />
                </Col>
                <Col span={1}>
                <Button danger onClick={()=>{onRemove()}}><DeleteOutlined/></Button>
                </Col>
            </Row>
        </>
        )
}

export default VentasTratamiento;