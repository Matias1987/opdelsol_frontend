import { Button, Col, Input, InputNumber, Row } from "antd";
import { useRef, useState } from "react";
import { CloseOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import SelectCodigoVenta from "../SelectCodigoVenta";
import globals from "@/src/globals";
import { parse_float_string, validate_esf_cil_eje } from "@/src/helpers/string_helper";

const LCLabItem = (props) =>{
    const [visible, setVisible] = useState(false);
    const [LC, setLC] = useState({
        idcodigo: -1,
        codigo: null,
        precio: 0,
        precio_str: "0",
        cantidad:1,
        esf: "",
        cil: "",
        cb: "0",
        eje: "",
        diametro: 0,
    })
    const on_codigo_change = (val) => {
        
        setLC((_LC)=>{
            const __LC ={..._LC,codigo:val.codigo, precio: val.precio, precio_str: val.precio, idcodigo: val.idcodigo};
            props?.callback?.(__LC);
            return __LC;
        })
    }

    const on_change = (val, idx) => {
        if(!validate_esf_cil_eje(val))
        {
            return
        }
        setLC((_LC)=>{
            const __LC ={..._LC,[idx]:val};
            props?.callback?.(__LC);
            return __LC;
        })
    }

    const on_precio_change = (v) => {
        
        setLC((_LC)=>{
            const p=parseFloat( v.lentgh<1 ? "0": v);
            const __LC = {..._LC, precio: isNaN(p) ? "0" : p , precio_str: v};
            props?.callback?.(__LC);
            return __LC;    
        })
        
    }

    const onRemove = () => {
        setVisible(v=>{ props?.onVisibleChange?.(false); return false;})
        on_codigo_change({precio:0, codigo:null, idcodigo: -1})
    }

    return (
        !visible ? <Button size="small"  type="primary" onClick={()=>{setVisible(v=>{ props?.onVisibleChange?.(true); return true;})}}>{
            typeof props.buttonText === 'undefined' ?
            "Propio"
            :
            props.buttonText
            }</Button>  :
        <>
            <Row>
                <Col span={5}>
                    <SelectCodigoVenta idfamilias={[globals.familiaIDs.LC]} callback={on_codigo_change} />
                </Col>
                <Col span={3}>
                    <Input style={{minWidth:"90px"}}  disabled={LC.codigo==null} size="small" prefix="Eje" type="text" value={LC.eje} onChange={(e=>{on_change(e.target.value,"eje")})} />
                </Col>
                <Col span={3}>
                    <Input style={{minWidth:"90px"}}  disabled={LC.codigo==null} size="small" prefix="Esf." type="text" value={LC.esf} onChange={(e=>{on_change(e.target.value,"esf")})} />
                </Col>
                <Col span={3}>
                    <Input style={{minWidth:"90px"}}  disabled={LC.codigo==null} size="small" prefix="Cil." type="text" value={LC.cil} onChange={(e=>{on_change(e.target.value,"cil")})} />
                </Col>
                <Col span={3}>
                    <Input style={{minWidth:"90px"}}  disabled={LC.codigo==null} size="small" prefix="C.B." type="text" value={LC.cb} onChange={(e=>{on_change(e.target.value,"cb")})} />
                </Col>
                <Col span={3}>
                    <Input style={{minWidth:"90px"}}  disabled={LC.codigo==null} size="small" prefix="Diám." type="text" value={LC.diametro} onChange={(e=>{on_change(e.target.value,"diametro")})} />
                </Col>
                <Col span={3}>
                    <Input onWheel={(e)=>{e.target.blur()}} style={{minWidth:"100px"}} disabled={LC.codigo==null} size="small" readOnly={false} type="number" prefix={"Precio: "} value={LC.precio_str} onChange={(v)=>{on_precio_change(v.target.value)}} />
                </Col>
                <Col span={1}>
                    <Button size="small" danger onClick={()=>{onRemove()}}><CloseOutlined/></Button>
                </Col>
            </Row>
        </>
        )
}

export default LCLabItem;