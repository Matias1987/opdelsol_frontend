import { Button, Col, Input, Row } from "antd";
import SelectCodigoVenta from "./SelectCodigoVenta";
import { useRef, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import globals from "@/src/globals";

const VentasInsumo = (props) => {
    const [visible, setVisible] = useState(false);
    const precioRef =useRef(null);
    const [insumo, setInsumo] = useState({
        idcodigo: -1,
        codigo: null,
        precio: 0,
        cantidad:1,
    })
    const on_codigo_change = (val) => {
        
        precioRef.current.value=val.precio;

        setInsumo((insumo)=>{
            const __insumo ={...insumo,codigo:val.codigo,idcodigo: val.idcodigo, precio: val.precio};
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

    const onRemove = () => {
        on_codigo_change({precio:0, codigo:null, idcodigo: -1})
        setVisible(v=>{ props?.onVisibleChange?.(false); return false;})
    }

    return (
        !visible ? <Button type="primary" onClick={()=>{setVisible(v=>{ props?.onVisibleChange?.(true); return true;})}}>{
            typeof props.buttonText === 'undefined' ?
            "Insumo"
            :
            props.buttonText
            }</Button>  :
        <>
            <Row>
                <Col span={19}>
                    <SelectCodigoVenta buttonText="Seleccione Codigo Insumo" idfamilias={[globals.familiaIDs.INSUMO,globals.familiaIDs.LIQUIDOS]} callback={on_codigo_change} />
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

export default VentasInsumo;