import { Button, Col, Input, Row } from "antd";
import SelectCodigoVenta from "./SelectCodigoVenta";
import { useRef, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import globals from "@/src/globals";

const VentasArmazon = (props) => {
    const [visible, setVisible] = useState(false);
    const [armazon, setArmazon] = useState({
        idcodigo: -1,
        codigo: null,
        precio: -1,
        cantidad:1,
    })
    const precioRef = useRef(null)

    const on_precio_change = (e) => {
        
        setArmazon(
            (armazon) => 
            { 
                const _armazon = {...armazon,precio: e.target.value};
                props.callback(_armazon); 
                return _armazon; 
            })
    }

    const on_codigo_change = (val) => {

        precioRef.current.value = val.precio;
       
        setArmazon((armazon)=>{
            const _armazon = {
                ...armazon,
                codigo: val.codigo,
                idcodigo: val.idcodigo,
                precio: val.precio,
            };

            

            props?.callback(_armazon);
            return {
                _armazon
            }
        })
    }

    const on_remove = () => {
        setVisible(v=>{ props?.onVisibleChange?.(false); return false;})
        setArmazon((armazon)=>{
            const _armazon = {
                ...armazon,
                codigo: null,
                precio: 0,
            };

            props?.callback(_armazon);
            return {
                _armazon
            }
        })
    }

    return (
        !visible ? <Button size="small" onClick={()=>{setVisible(v=>{ props?.onVisibleChange?.(true); return true;})}}>{
            typeof props.buttonText === 'undefined' ?
            "Armazon Propio"
            :
            props.buttonText
            }</Button>  :
        <>
            <Row>
                <Col span={19}>
                    <SelectCodigoVenta idfamilias={[globals.familiaIDs.ARMAZON]} callback={on_codigo_change} />
                </Col>
                <Col span={4}>
                    
                    <span>Precio:&nbsp;<input onChange={on_precio_change}  ref={precioRef} style={{textAlign:"right", width:"100px", border: "1px solid #ccc", borderRadius:"6px", borderColor:"lightgray", padding:".4em", fontSize:"1.1em"}}  /></span>
                </Col>
                <Col span={1}>
                <Button danger onClick={()=>{on_remove()}}><DeleteOutlined/></Button>
                </Col>
            </Row>
        </>
        )
}

export default VentasArmazon;