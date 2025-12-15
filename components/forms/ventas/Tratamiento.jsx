import { Button, Col, Input, Row } from "antd";
import SelectCodigoVenta from "./SelectCodigoVenta";
import {useState } from "react";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import globals from "@/src/globals";
import { parse_float_string } from "@/src/helpers/string_helper";

const VentasTratamiento = (props) => {

    const [visible, setVisible] = useState(false);

    const [tratamiento, setTratamiento] = useState({
        idcodigo: -1,
        codigo: null,
        precio: 0,
        cantidad:1,
    })

    const on_codigo_change = (val) => {
        setTratamiento((_tratamiento_)=>{
            const _tratamiento = {..._tratamiento_,codigo: val.codigo, idcodigo: val.idcodigo, precio: val.precio}
            props?.callback(_tratamiento);
            return {..._tratamiento, codigo:val.codigo, precio: val.precio};
        })
    }
    
    const on_precio_change = (e) => {
        setTratamiento((_tratamiento_)=>{
            const p = (e.target.value.length<1? "0":e.target.value)
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
                    <SelectCodigoVenta idfamilias={[globals.familiaIDs.TRATAMIENTO]} callback={on_codigo_change} hideExtOpt="1"/>
                </Col>
                <Col span={4}>
                    <Input onClick={e=>{e.target.select()}} onWheel={(e)=>{e.target.blur()}} style={{minWidth:"100px", }} disabled={tratamiento.codigo==null} prefix="Precio: " readOnly={false} min={0}   type="number" onChange={on_precio_change} size="small"  value={tratamiento.precio} />
                </Col>
                <Col span={1}>
                <Button size="small" danger onClick={()=>{onRemove()}}><CloseOutlined/></Button>
                </Col>
            </Row>
        </>
        )
}

export default VentasTratamiento;