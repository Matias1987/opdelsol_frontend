import { Form, Tabs } from "antd";
import VentasArmazon from "../Armazon";
import VentasTratamiento from "../Tratamiento";
import { useEffect, useState } from "react";
import MonofLabCristal from "./MonofLabCristal";

const MonofLabItems = (props) => {
    const [mlabitems, setItems] = useState({
        lejos_od: null,
        lejos_oi: null,
        lejos_armazon: null,
        lejos_tratamiento: null,
        cerca_od: null,
        cerca_oi: null,
        cerca_armazon: null,
        cerca_tratamiento: null,

        lejos_od_visible: null,
        lejos_oi_visible: null,
        lejos_armazon_visible: null,
        lejos_tratamiento_visible: null,

        cerca_od_visible: null,
        cerca_oi_visible: null,
        cerca_armazon_visible: null,
        cerca_tratamiento_visible: null
        
    })

    const on_change = (field, value) => {

        setItems((mlabitems)=>{
            const _items = {...mlabitems,[field]:value}
            props?.callback(_items)
            return _items;
        })

    }

    const onVisibleChange = (field,value) => {
        alert(`${field} : ${value}`)
        setItems(_=>{
            const _values = {...mlabitems,[field]:value}
            props?.callback(_values)
            return _values
        })
    }

    

    const tabs_items = [
        {
            key: 'lejos',
            label: 'Lejos',
            children: 
                <>
                <Form.Item>
                    <MonofLabCristal onVisibleChange={(_value)=>onVisibleChange("lejos_od_visible",_value)}  tipo='LEJOS_OD' buttonText={"Elejir Ojo Derecho Lejos"} callback={(v)=>{on_change("lejos_oi",v)}}/>
                </Form.Item>
                <Form.Item>    
                    <MonofLabCristal onVisibleChange={(_value)=>onVisibleChange("lejos_oi_visible",_value)}  tipo='LEJOS_OI' buttonText={"Elejir Ojo Izquierdo Lejos"} callback={(v)=>{on_change("lejos_od",v)}}/>
                </Form.Item>
                <Form.Item>    
                    <VentasArmazon onVisibleChange={(_value)=>onVisibleChange("lejos_armazon_visible",_value)}  tipo='LEJOS_ARMAZON' buttonText={"Elejir Armazon Lejos"}  callback={(v)=>{on_change("lejos_armazon",v)}}/>
                </Form.Item>
                <Form.Item>    
                    <VentasTratamiento onVisibleChange={(_value)=>onVisibleChange("lejos_tratamiento_visible",_value)}  tipo='LEJOS_TRATAMIENTO' buttonText={"Elejir Tratamiento Lejos"} callback={(v)=>{on_change("lejos_tratamiento",v)}}/>
                </Form.Item>
                </>
            
        },
        {
            key: 'cerca',
            label: 'Cerca',
            children: 
                <>
                <Form.Item>
                    <MonofLabCristal onVisibleChange={(_value)=>onVisibleChange("cerca_od_visible",_value)}  tipo='CERCA_OD'  buttonText={"Elejir Ojo Derecho Cerca"} callback={(v)=>{on_change("cerca_od",v)}}/>
                </Form.Item>
                <Form.Item>    
                    <MonofLabCristal onVisibleChange={(_value)=>onVisibleChange("cerca_oi_visible",_value)}  tipo='CERCA_OI'  buttonText={"Elejir Ojo Izquierdo Cerca"} callback={(v)=>{on_change("cerca_oi",v)}}/>
                </Form.Item>
                <Form.Item>    
                    <VentasArmazon onVisibleChange={(_value)=>onVisibleChange("cerca_armazon_visible",_value)}  tipo='CERCA_ARMAZON' buttonText={"Elejir Armazon Cerca"} callback={(v)=>{on_change("cerca_armazon",v)}}/>
                </Form.Item>
                <Form.Item>    
                    <VentasTratamiento onVisibleChange={(_value)=>onVisibleChange("cerca_tratamiento_visible",_value)}  tipo='CERCA_TRATAMIENTO' buttonText={"Elejir Tratamiento Cerca"} callback={(v)=>{on_change("cerca_tratamiento",v)}}/>
                </Form.Item>
                </>
            
        }
    ]

    return <Tabs defaultActiveKey="lejos" items={tabs_items} size="large"/>
    
}
export default MonofLabItems;