import { Button, Col, Input, Row } from "antd";
import SelectCodigoVenta from "./SelectCodigoVenta";
import { useRef, useState } from "react";
import { CloseOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import globals from "@/src/globals";
import { parse_float_string } from "@/src/helpers/string_helper";

const VentasArmazon = (props) => {
    const [visible, setVisible] = useState(false);
    const [armazon, setArmazon] = useState({
        idcodigo: -1,
        codigo: null,
        precio: 0,
        cantidad:1,
    })
    
    const on_precio_change = (e) => {
        
        setArmazon(
            (__armazon) => 
            { 
                const _armazon = {...__armazon,precio: parse_float_string(e.target.value)};
                props.callback(_armazon); 
                return _armazon; 
            })
    }

    const on_codigo_change = (val) => {
        
        setArmazon((__armazon)=>{
        
            const _armazon = {
                ...__armazon,
                codigo: val.codigo,
                idcodigo: val.idcodigo,
                precio: val.precio,
            };

            props?.callback(_armazon);
            return _armazon
        })
    }

    const on_remove = () => {
        setVisible(v=>{ props?.onVisibleChange?.(false); return false;})
        setArmazon((__armazon)=>{
            const _armazon = {
                ...__armazon,
                codigo: null,
                precio: 0,
            };

            props?.callback(_armazon);
            return _armazon
        })
    }

    return (
        !visible ? <Button size="small" type="primary" onClick={()=>{setVisible(v=>{ props?.onVisibleChange?.(true); return true;})}}>{
            typeof props.buttonText === 'undefined' ?
            "Armazon Propio"
            :
            props.buttonText
            }</Button>  :
        <>
            <Row>
                <Col span={19}>
                    <SelectCodigoVenta idfamilias={[globals.familiaIDs.ARMAZON]} callback={on_codigo_change} hideExtOpt="1"/>
                </Col>
                <Col span={4}>
                    <Input onWheel={(e)=>{e.target.blur()}} style={{minWidth:"100px"}} disabled={armazon.codigo==null} type="number" prefix="Precio: " value={armazon.precio} readOnly={false} onChange={on_precio_change} size="small" />
                    {/*<span>Precio:&nbsp;<input readOnly onChange={on_precio_change}  ref={precioRef} style={{textAlign:"right", width:"100px", border: "1px solid #ccc", borderRadius:"6px", borderColor:"lightgray", padding:".4em", fontSize:"1.1em"}}  /></span>*/}
                </Col>
                <Col span={1}>
                <Button size="small" danger onClick={()=>{on_remove()}}><CloseOutlined/></Button>
                </Col>
            </Row>
        </>
        )
}

export default VentasArmazon;