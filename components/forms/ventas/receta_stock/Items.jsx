import { Form, Tabs, Row, Col } from "antd";
import VentasArmazon from "../Armazon";
import VentasTratamiento from "../Tratamiento";
import { useEffect, useState } from "react";
import SelectCodeButton from "../selectCodeButton";

const { default: RecStockCristal } = require("./RecStockCristal")

const RecetaStockItems = (props) => {
    const [rcitems, setItems] = useState({
        lejos_od: null,
        lejos_oi: null,
        lejos_armazon: null,
        lejos_tratamiento: null,
        
        cerca_od: null,
        cerca_oi: null,
        cerca_armazon: null,
        cerca_tratamiento: null,

        lejos_od_visible: false,
        lejos_oi_visible: false,
        lejos_armazon_visible: false,
        lejos_tratamiento_visible: false,

        cerca_od_visible: false,
        cerca_oi_visible: false,
        cerca_armazon_visible: false,
        cerca_tratamiento_visible: false
        
    })

    const on_change = (field, value) => {
        setItems((rcitems)=>{
            const _rcitems = {...rcitems,[field]:value}
            props?.callback(_rcitems)
            //alert(JSON.stringify(_rcitems))
            return _rcitems;
        })
    }

    const onVisibleChange = (field,value) => {
        //alert(`${field} : ${value}`)
        setItems(_=>{
            const _values = {...rcitems,[field]:value}
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
    

    const tabs_items = [
        {
            key: 'lejos',
            label: 'Lejos',
            children: 
                <>
                
                <Row className="table-row-light" style={{padding:".7em"}}>
                    <Col style={_style_label} span={2}>OD</Col>
                    <Col span={22}>
                        <RecStockCristal onVisibleChange={(_value)=>onVisibleChange("lejos_od_visible",_value)} tipo='LEJOS_OD' buttonText={<SelectCodeButton />} callback={(v)=>{on_change("lejos_od",v)}}/>
                    </Col>
                </Row>
                <Row className="table-row-dark" style={{padding:".7em"}}>
                    <Col style={_style_label} span={2}>OI</Col>
                    <Col span={22}>
                        <RecStockCristal onVisibleChange={(_value)=>onVisibleChange("lejos_oi_visible",_value)} tipo='LEJOS_OI' buttonText={<SelectCodeButton />} callback={(v)=>{on_change("lejos_oi",v)}}/>
                    </Col>
                </Row>
                <Row className="table-row-light"  style={{padding:".7em"}}>
                    <Col style={_style_label} span={2}>ARMAZON</Col>
                    <Col span={22}>
                    <VentasArmazon onVisibleChange={(_value)=>onVisibleChange("lejos_armazon_visible",_value)} tipo='LEJOS_ARMAZON' buttonText={<SelectCodeButton />}  callback={(v)=>{on_change("lejos_armazon",v)}}/>
                
                    </Col>
                </Row>
                <Row className="table-row-dark" style={{padding:".7em"}}>
                    <Col style={_style_label} span={2}>TRATAMIENTO</Col>
                    <Col span={22}>
                        <VentasTratamiento onVisibleChange={(_value)=>onVisibleChange("lejos_tratamiento_visible",_value)} tipo='LEJOS_TRATAMIENTO' buttonText={<SelectCodeButton />} callback={(v)=>{on_change("lejos_tratamiento",v)}}/>
                
                    </Col>
                </Row>
                </>
            
        },
        {
            key: 'cerca',
            label: 'Cerca',
            children: 
                <>
                <Row className="table-row-light" style={{padding:".7em"}}>
                    <Col style={_style_label} span={2}>OD</Col>
                    <Col span={22}>
                        <RecStockCristal onVisibleChange={(_value)=>onVisibleChange("cerca_od_visible",_value)} tipo='CERCA_OD'  buttonText={<SelectCodeButton />} callback={(v)=>{on_change("cerca_od",v)}}/>
                
                    </Col>
                </Row>
                <Row className="table-row-dark" style={{padding:".7em"}}>
                    <Col style={_style_label} span={2}>OI</Col>
                    <Col span={22}>
                        <RecStockCristal onVisibleChange={(_value)=>onVisibleChange("cerca_oi_visible",_value)} tipo='CERCA_OI'  buttonText={<SelectCodeButton />} callback={(v)=>{on_change("cerca_oi",v)}}/>
                
                    </Col>
                </Row>
                <Row className="table-row-light" style={{padding:".7em"}}>
                    <Col style={_style_label} span={2}>ARMAZ&Oacute;N</Col>
                    <Col span={22}>
                        <VentasArmazon onVisibleChange={(_value)=>onVisibleChange("cerca_armazon_visible",_value)} tipo='CERCA_ARMAZON' buttonText={<SelectCodeButton />} callback={(v)=>{on_change("cerca_armazon",v)}}/>
                
                    </Col>
                </Row>
                <Row className="table-row-dark" style={{padding:".7em"}}>
                    <Col style={_style_label} span={2}>TRATAMIENTO</Col>
                    <Col span={22}>
                        <VentasTratamiento onVisibleChange={(_value)=>onVisibleChange("cerca_tratamiento_visible",_value)} tipo='LEJOS_TRATAMIENTO' buttonText={<SelectCodeButton />} callback={(v)=>{on_change("cerca_tratamiento",v)}}/>
                
                    </Col>
                </Row>
                </>
            
        }
    ]

    return <Tabs defaultActiveKey="lejos" items={tabs_items} size="large"/>
    
}
export default RecetaStockItems;