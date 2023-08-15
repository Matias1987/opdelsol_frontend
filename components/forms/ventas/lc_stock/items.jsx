import { useState } from "react";
import VentasInsumo from "../Insumo";
import LCItem from "./lc_item";
import { Col, Row } from "antd";

const LCStockItems = (props) => {

    const [items, setItems] = useState({
        od:null,
        oi:null,
        insumo: null,

        od_visible:null,
        oi_visible:null,
        insumo_visible: null,
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

    return (
    <>
    <Row>
        <Col span={24} style={{padding:'.25em'}}>
            <LCItem buttonText="OD Propio" onVisibleChange={(_value)=>onVisibleChange("od_visible",_value)} tipo="OD" callback={(v)=>{onChange("od",v)}}/>
        </Col>
    </Row>
    <Row>
        <Col span={24} style={{padding:'.25em'}}>
            <LCItem buttonText="OI Propio" onVisibleChange={(_value)=>onVisibleChange("oi_visible",_value)} tipo="OI" callback={(v)=>{onChange("oi",v)}}/>  
        </Col>
    </Row>
    <Row>
        <Col span={24} style={{padding:'.25em'}}>
            <VentasInsumo onVisibleChange={(_value)=>onVisibleChange("insumo_visible",_value)} tipo="insumo" callback={(v)=>{onChange("insumo",v)}} />  
        </Col>
    </Row>
     </>
    )
}

export default LCStockItems;