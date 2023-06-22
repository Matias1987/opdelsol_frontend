import { Form, Tabs } from "antd";
import VentasArmazon from "../Armazon";
import VentasTratamiento from "../Tratamiento";
import { useEffect, useState } from "react";

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
        cerca_tratamiento: null
        
    })

    const on_change = (field, value) => {
        rcitems[field] = value;
        setItems(rcitems)
        props.callback(rcitems)
    }

    

    const tabs_items = [
        {
            key: 'lejos',
            label: 'Lejos',
            children: 
                <>
                <Form.Item>
                    <RecStockCristal tipo='LEJOS_OD' buttonText={"Elejir Ojo Izquierdo Lejos"} callback={(v)=>{on_change("lejos_oi",v)}}/>
                </Form.Item>
                <Form.Item>    
                    <RecStockCristal tipo='LEJOS_OI' buttonText={"Elejir Ojo Derecho Lejos"} callback={(v)=>{on_change("lejos_od",v)}}/>
                </Form.Item>
                <Form.Item>    
                    <VentasArmazon tipo='LEJOS' buttonText={"Elejir Armazon Lejos"}  callback={(v)=>{on_change("lejos_armazon",v)}}/>
                </Form.Item>
                <Form.Item>    
                    <VentasTratamiento tipo='LEJOS' buttonText={"Elejir Tratamiento Lejos"} callback={(v)=>{on_change("lejos_tratamiento",v)}}/>
                </Form.Item>
                </>
            
        },
        {
            key: 'cerca',
            label: 'Cerca',
            children: 
                <>
                <Form.Item>
                    <RecStockCristal tipo='CERCA_OD'  buttonText={"Elejir Ojo Derecho Cerca"} callback={(v)=>{on_change("cerca_od",v)}}/>
                </Form.Item>
                <Form.Item>    
                    <RecStockCristal tipo='CERCA_OI'  buttonText={"Elejir Ojo Izquierdo Cerca"} callback={(v)=>{on_change("cerca_oi",v)}}/>
                </Form.Item>
                <Form.Item>    
                    <VentasArmazon tipo='CERCA' buttonText={"Elejir Armazon Cerca"} callback={(v)=>{on_change("cerca_armazon",v)}}/>
                </Form.Item>
                <Form.Item>    
                    <VentasTratamiento tipo='LEJOS' buttonText={"Elejir Tratamiento Cerca"} callback={(v)=>{on_change("cerca_tratamiento",v)}}/>
                </Form.Item>
                </>
            
        }
    ]

    return <Tabs defaultActiveKey="lejos" items={tabs_items} size="large"/>
    
}
export default RecetaStockItems;