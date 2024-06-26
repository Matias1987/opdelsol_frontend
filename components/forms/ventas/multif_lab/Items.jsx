import { useState } from "react"
import VentasArmazon from "../Armazon"
import VentasTratamiento from "../Tratamiento"
import MultifLabCristal from "./MultifLabCristal"
import { Row, Col } from "antd"
import SelectCodeButton from "../selectCodeButton"

const MultifLabItems = (props) => {
    const [mlabitems, setItems] = useState({
        od: null,
        oi: null,
        armazon: null,
        tratamiento: null,
        
        od_visible: false,
        oi_visible: false,
        armazon_visible: false,
        tratamiento_visible: false,
    })

    
    const on_change = (field, value) => {
        setItems((_mlabitems_=>{
            const _items = {..._mlabitems_,[field]:value}
            props?.callback(_items)
            return _items
        }))
        
    }

    const onVisibleChange = (field,value) => {
        //alert(`${field} : ${value}`)
        setItems(_mlabitems_=>{
            const _values = {..._mlabitems_,[field]:value}
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


    return <>
        <Row className="table-row-light" style={{padding:".7em"}}>
            <Col style={_style_label} span={2}>
                OD
            </Col>
            <Col span={22}>
            <MultifLabCristal onVisibleChange={(_value)=>onVisibleChange("od_visible",_value)}  tipo='OD' buttonText={<SelectCodeButton />} callback={(v)=>{on_change("od",v)}}/>
            </Col>
        </Row>
        <Row className="table-row-dark" style={{padding:".7em"}} >
            <Col style={_style_label} span={2}>
                OI
            </Col>
            <Col span={22}>
            <MultifLabCristal onVisibleChange={(_value)=>onVisibleChange("oi_visible",_value)}  tipo='OI' buttonText={<SelectCodeButton />} callback={(v)=>{on_change("oi",v)}}/>
            </Col>
        </Row>
        <Row className="table-row-light" style={{padding:".7em"}}>
            <Col style={_style_label} span={2}>
                ARMAZ&Oacute;N
            </Col>
            <Col span={22}>
            <VentasArmazon onVisibleChange={(_value)=>onVisibleChange("armazon_visible",_value)}  tipo='ARMAZON' buttonText={<SelectCodeButton />}  callback={(v)=>{on_change("armazon",v)}}/>
            </Col>
        </Row>
        <Row className="table-row-dark" style={{padding:".7em"}} >
            <Col style={_style_label} span={2}>
                TRATAMIENTO
            </Col>
            <Col span={22}>
            <VentasTratamiento onVisibleChange={(_value)=>onVisibleChange("tratamiento_visible",_value)}  tipo='TRATAMIENTO' buttonText={<SelectCodeButton />} callback={(v)=>{on_change("tratamiento",v)}}/>
            </Col>
        </Row>
    </>
}

export default MultifLabItems;

