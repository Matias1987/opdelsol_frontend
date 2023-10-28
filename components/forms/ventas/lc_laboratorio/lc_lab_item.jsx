import { Button, Col, Input, InputNumber, Row } from "antd";
import { useRef, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import SelectCodigoVenta from "../SelectCodigoVenta";
import globals from "@/src/globals";

const LCLabItem = (props) =>{
    const [visible, setVisible] = useState(false);
    const [LC, setLC] = useState({
        idcodigo: -1,
        codigo: null,
        precio: 0,
        cantidad:1,
        cb: 0,
        diametro: 0,
    })
    const on_codigo_change = (val) => {
        
        setLC((LC)=>{
            const __LC ={...LC,codigo:val.codigo, precio: val.precio, idcodigo: val.idcodigo};
            props?.callback?.(__LC);
            return __LC;
        })
    }

    const on_change = (val, idx) => {
        setLC((LC)=>{
            const __LC ={...LC,[idx]:val};
            props?.callback?.(__LC);
            return __LC;
        })
    }

    const on_precio_change = (v) => {
        
        setLC((LC)=>{
            const __LC = {...LC, precio: v};
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
                <Col span={11}>
                    <SelectCodigoVenta idfamilias={[globals.familiaIDs.LC]} callback={on_codigo_change} />
                </Col>
                <Col span={4}>
                    <Input size="small" prefix="CB" type="number" value={LC.cb} onChange={(e=>{on_change(e.target.value,"cb")})} />
                </Col>
                <Col span={4}>
                    <Input size="small" prefix="Diámetro" type="number" value={LC.diametro} onChange={(e=>{on_change(e.target.value,"diametro")})} />
                </Col>
                <Col span={4}>
                    <Input size="small" style={{backgroundColor:"rgba(131,137,150, 0.4)"}} readOnly type="number" prefix={"Precio: "} value={LC.precio} onChange={(v)=>{on_precio_change(v)}} />
                </Col>
                <Col span={1}>
                    <Button size="small" danger onClick={()=>{onRemove()}}><DeleteOutlined/></Button>
                </Col>
            </Row>
        </>
        )
}

export default LCLabItem;