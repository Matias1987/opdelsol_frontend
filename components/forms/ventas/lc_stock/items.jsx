import { useState } from "react";
import VentasInsumo from "../Insumo";
import LCItem from "./lc_item";
import { Col, Row } from "antd";
import SelectCodeButton from "../selectCodeButton";

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
        setItems((__items)=>{
            const _items = {...__items,[index]:value};
            props?.callback?.(_items);
            return _items;
        })
    }

    const onVisibleChange = (field,value) => {
        //alert(`${field} : ${value}`)
        setItems(__items_=>{
            const _values = {...__items_,[field]:value}
            props?.callback(_values)
            return _values
        })
    }

    const _style_label = {
        paddingTop: "1em",
        textAlign: "left",
        fontWeight: "bold", 
        fontSize: ".75em",
    }

    return (
    <>
    <Row className="table-row-light" style={{padding:".7em"}}>
        <Col style={_style_label} span={1}>OD</Col>
        <Col span={23}>
            <LCItem buttonText={<SelectCodeButton />} onVisibleChange={(_value)=>onVisibleChange("od_visible",_value)} tipo="OD" callback={(v)=>{onChange("od",v)}}/>
        </Col>
    </Row>
    <Row className="table-row-dark" style={{padding:".7em"}}>
        <Col style={_style_label} span={1}>OI</Col>
        <Col span={23}>
            <LCItem buttonText={<SelectCodeButton />} onVisibleChange={(_value)=>onVisibleChange("oi_visible",_value)} tipo="OI" callback={(v)=>{onChange("oi",v)}}/>  
        </Col>
    </Row>
    <Row className="table-row-light" style={{padding:".7em"}}>
        <Col style={_style_label} span={1}>Insumo</Col>
        <Col span={23}>
            <VentasInsumo buttonText={<SelectCodeButton />} onVisibleChange={(_value)=>onVisibleChange("insumo_visible",_value)} tipo="insumo" callback={(v)=>{onChange("insumo",v)}} />  
        </Col>
    </Row>
     </>
    )
}

export default LCStockItems;