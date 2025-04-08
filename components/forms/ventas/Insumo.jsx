import { Button, Col, Input, Row } from "antd";
import SelectCodigoVenta from "./SelectCodigoVenta";
import { useRef, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import globals from "@/src/globals";
import { parse_float_string } from "@/src/helpers/string_helper";

const VentasInsumo = (props) => {
    const [visible, setVisible] = useState(false);
    
    const [insumo, setInsumo] = useState({
        idcodigo: -1,
        codigo: null,
        precio: 0,
        cantidad:1,
    })

    const on_codigo_change = (val) => {
        setInsumo((_insumo_)=>{
            const __insumo ={..._insumo_,codigo:val.codigo,idcodigo: val.idcodigo, precio: val.precio};
            props?.callback?.(__insumo);
            return __insumo;
        })
    }

    const on_precio_change = (e) => {
        
        setInsumo((_insumo_)=>{
            const __insumo = {..._insumo_, precio: parse_float_string(e.target.value)};
            props?.callback?.(__insumo);
            return __insumo;    
        })
        
    }

    const onRemove = () => {
        on_codigo_change({precio:0, codigo:null, idcodigo: -1})
        setVisible(v=>{ props?.onVisibleChange?.(false); return false;})
    }

    return (
        !visible ? <Button size="small" type="primary" onClick={()=>{setVisible(v=>{ props?.onVisibleChange?.(true); return true;})}}>{
            typeof props.buttonText === 'undefined' ?
            "Insumo"
            :
            props.buttonText
            }</Button>  :
        <>
            <Row>
                <Col span={19}>
                    <SelectCodigoVenta buttonText="Seleccione Código Insumo" idfamilias={[globals.familiaIDs.INSUMO,globals.familiaIDs.LIQUIDOS]} callback={on_codigo_change} />
                </Col>
                <Col span={4}>
                    <Input disabled={insumo.codigo==null} type="number" min={0} prefix={"Precio: "} readOnly={false} value={insumo.precio} onChange={on_precio_change} size="small" />
                </Col>
                <Col span={1}>
                <Button danger size="small" onClick={()=>{onRemove()}}><DeleteOutlined/></Button>
                </Col>
            </Row>
        </>
        )
}

export default VentasInsumo;