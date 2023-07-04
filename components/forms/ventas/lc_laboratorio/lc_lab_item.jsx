import { Button, Col, Input, InputNumber, Row } from "antd";
import { useRef, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import SelectCodigoVenta from "../SelectCodigoVenta";

const LCLabItem = (props) =>{
    const [visible, setVisible] = useState(false);
    const [LC, setLC] = useState({
        codigo: null,
        precio: 0,
        cantidad:1,
    })
    const on_codigo_change = (val) => {
        
        setLC((LC)=>{
            const __LC ={...LC,codigo:val.codigo, precio: val.precio};
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

    return (
        !visible ? <Button size="small" onClick={()=>{setVisible(true)}}>{
            typeof props.buttonText === 'undefined' ?
            "Propio"
            :
            props.buttonText
            }</Button>  :
        <>
            <Row>
                <Col span={19}>
                    <SelectCodigoVenta callback={on_codigo_change} />
                </Col>
                <Col span={4}>
                    <InputNumber value={LC.precio} onChange={on_precio_change(v)} />
                </Col>
                <Col span={1}>
                <Button danger onClick={()=>{setVisible(false)}}><DeleteOutlined/></Button>
                </Col>
            </Row>
        </>
        )
}

export default LCLabItem;