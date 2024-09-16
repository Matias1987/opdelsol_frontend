import { Button, Col, Input, Row } from "antd";
import SelectCodigoVenta from "./SelectCodigoVenta";
import {useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import globals from "@/src/globals";
import { parse_float_string } from "@/src/helpers/string_helper";

const VentasTratamiento = (props) => {

    const [visible, setVisible] = useState(false);

    //const precioRef =useRef(null);

    const [tratamiento, setTratamiento] = useState({
        idcodigo: -1,
        codigo: null,
        precio: 0,
        cantidad:1,
    })

    const on_codigo_change = (val) => {
        //precioRef.current.value=val.precio;
        setTratamiento((_tratamiento_)=>{
            const _tratamiento = {..._tratamiento_,codigo: val.codigo, idcodigo: val.idcodigo, precio: val.precio}
            props?.callback(_tratamiento);
            return {..._tratamiento, codigo:val.codigo, precio: val.precio};
        })
    }
    
    const on_precio_change = (e) => {
        setTratamiento((_tratamiento_)=>{
            const p = parse_float_string(e.target.value)
            const _tratamiento = {..._tratamiento_,precio: p}
            props?.callback(_tratamiento)
            return _tratamiento
        })
    }

    const onRemove = () => {
        on_codigo_change({precio:0, codigo:null, idcodigo: -1})
        setVisible(v=>{ props?.onVisibleChange?.(false); return false;})
    }

    return (
        !visible ? <Button size="small" type="primary" onClick={()=>{setVisible(v=>{ props?.onVisibleChange?.(true); return true;})}}>{
            typeof props.buttonText === 'undefined' ?
            "Establecer Tratamiento"
            :
            props.buttonText
            }</Button>  :
        <>
            <Row>
                <Col span={19}>
                    <SelectCodigoVenta idfamilias={[globals.familiaIDs.TRATAMIENTO]} callback={on_codigo_change} />
                </Col>
                <Col span={4}>
                    {/*<span>&nbsp;&nbsp;Precio: </span><input readOnly onChange={on_precio_change} ref={precioRef} style={{textAlign:"right", width:"100px", border: "1px solid #ccc", borderRadius:"6px", borderColor:"lightgray", padding:".4em", fontSize:"1.1em"}} />*/}
                    <Input disabled={tratamiento.codigo==null} prefix="Precio: " readOnly={false} min={0}   type="number" onChange={on_precio_change} size="small"  style={{backgroundColor:"rgba(131,137,150, 0.4)"}} value={tratamiento.precio} />
                </Col>
                <Col span={1}>
                <Button size="small" danger onClick={()=>{onRemove()}}><DeleteOutlined/></Button>
                </Col>
            </Row>
        </>
        )
}

export default VentasTratamiento;