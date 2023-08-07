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
    })
    const on_codigo_change = (val) => {
        
        setLC((LC)=>{
            const __LC ={...LC,codigo:val.codigo, precio: val.precio, idcodigo: val.idcodigo};
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
        !visible ? <Button   type="primary" onClick={()=>{setVisible(v=>{ props?.onVisibleChange?.(true); return true;})}}>{
            typeof props.buttonText === 'undefined' ?
            "Propio"
            :
            props.buttonText
            }</Button>  :
        <>
            <Row>
                <Col span={19}>
                    <SelectCodigoVenta idfamilias={[globals.familiaIDs.LC]} callback={on_codigo_change} />
                </Col>
                <Col span={4}>
                    <InputNumber value={LC.precio} onChange={(v)=>{on_precio_change(v)}} />
                </Col>
                <Col span={1}>
                <Button danger onClick={()=>{onRemove()}}><DeleteOutlined/></Button>
                </Col>
            </Row>
        </>
        )
}

export default LCLabItem;