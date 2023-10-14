import { Form, Tabs } from "antd";
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

    

    const tabs_items = [
        {
            key: 'lejos',
            label: 'Lejos',
            children: 
                <>
                <Form.Item label={"OD: "}>
                    <RecStockCristal onVisibleChange={(_value)=>onVisibleChange("lejos_od_visible",_value)} tipo='LEJOS_OD' buttonText={<SelectCodeButton />} callback={(v)=>{on_change("lejos_od",v)}}/>
                </Form.Item>
                <Form.Item  label={"OI: "}>    
                    <RecStockCristal onVisibleChange={(_value)=>onVisibleChange("lejos_oi_visible",_value)} tipo='LEJOS_OI' buttonText={<SelectCodeButton />} callback={(v)=>{on_change("lejos_oi",v)}}/>
                </Form.Item>
                <Form.Item  label={"ARMAZON: "}>    
                    <VentasArmazon onVisibleChange={(_value)=>onVisibleChange("lejos_armazon_visible",_value)} tipo='LEJOS_ARMAZON' buttonText={<SelectCodeButton />}  callback={(v)=>{on_change("lejos_armazon",v)}}/>
                </Form.Item>
                <Form.Item  label={"TRATAMIENTO: "}>    
                    <VentasTratamiento onVisibleChange={(_value)=>onVisibleChange("lejos_tratamiento_visible",_value)} tipo='LEJOS_TRATAMIENTO' buttonText={<SelectCodeButton />} callback={(v)=>{on_change("lejos_tratamiento",v)}}/>
                </Form.Item>
                </>
            
        },
        {
            key: 'cerca',
            label: 'Cerca',
            children: 
                <>
                <Form.Item  label={"OD: "}>
                    <RecStockCristal onVisibleChange={(_value)=>onVisibleChange("cerca_od_visible",_value)} tipo='CERCA_OD'  buttonText={<SelectCodeButton />} callback={(v)=>{on_change("cerca_od",v)}}/>
                </Form.Item>
                <Form.Item  label={"OI: "}>    
                    <RecStockCristal onVisibleChange={(_value)=>onVisibleChange("cerca_oi_visible",_value)} tipo='CERCA_OI'  buttonText={<SelectCodeButton />} callback={(v)=>{on_change("cerca_oi",v)}}/>
                </Form.Item>
                <Form.Item  label={"ARMAZON: "}>    
                    <VentasArmazon onVisibleChange={(_value)=>onVisibleChange("cerca_armazon_visible",_value)} tipo='CERCA_ARMAZON' buttonText={<SelectCodeButton />} callback={(v)=>{on_change("cerca_armazon",v)}}/>
                </Form.Item>
                <Form.Item  label={"TRATAMIENTO: "}>    
                    <VentasTratamiento onVisibleChange={(_value)=>onVisibleChange("cerca_tratamiento_visible",_value)} tipo='LEJOS_TRATAMIENTO' buttonText={<SelectCodeButton />} callback={(v)=>{on_change("cerca_tratamiento",v)}}/>
                </Form.Item>
                </>
            
        }
    ]

    return <Tabs defaultActiveKey="lejos" items={tabs_items} size="large"/>
    
}
export default RecetaStockItems;