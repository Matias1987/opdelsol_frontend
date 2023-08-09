import { Col, Form, Row } from "antd";
import { useState } from "react";
import VentasInsumo from "../Insumo";
import LCLabItem from "./lc_lab_item";


const LCLabItems = (props) => {

    
    const [items, setItems] = useState({
        od:null,
        oi:null,
        insumo:null,

        od_visible:false,
        oi_visible:false,
        insumo_visible:false,
    })

    const onChange= ( index, value) => {
        setItems((items)=>{
            const _items = {...items,[index]:value};
            props?.callback?.(_items);
            return _items;
        })
    }

    const onVisibleChange = (field,value) => {
        //alert(`${field} : ${value}`)
        setItems(_=>{
            const _values = {...items,[field]:value}
            props?.callback(_values)
            return _values
        })
    }

    return <>
    <Row>
        <Col span={24} style={{padding:'.25em'}}>
            <LCLabItem buttonText="L.C. OD Propio" onVisibleChange={(_value)=>onVisibleChange("od_visible",_value)}  tipo="OD" callback={(v)=>{onChange("od",v)}} />
        </Col>
    </Row>
    <Row>
        <Col span={24} style={{padding:'.25em'}}>
            <LCLabItem buttonText="L.C. OI Propio" onVisibleChange={(_value)=>onVisibleChange("oi_visible",_value)}  tipo="OI" callback={(v)=>{onChange("oi",v)}} />
        </Col>
    </Row>
    <Row>
        <Col span={24} style={{padding:'.25em'}}>
            <VentasInsumo onVisibleChange={(_value)=>onVisibleChange("insumo_visible",_value)}  tipo="INSUMO" callback={(v)=>{onChange("insumo",v)}} />
        </Col>
    </Row>
    </>
}

export default LCLabItems;