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
        cerca_tratamiento: null
        
    })

    /*useEffect(()=>{
        alert(JSON.stringify(rcitems))
    })*/

    const on_change = (field, value) => {
        mlabitems[field] = value;
        setItems(mlabitems)
        props.callback(mlabitems)
    }

    

    const tabs_items = [
        {
            key: 'lejos',
            label: 'Lejos',
            children: 
                <>
                <Form.Item>
                    <MonofLabCristal tipo='LEJOS_OD' buttonText={"Elejir Ojo Izquierdo Lejos"} callback={(v)=>{on_change("lejos_oi",v)}}/>
                </Form.Item>
                <Form.Item>    
                    <MonofLabCristal tipo='LEJOS_OI' buttonText={"Elejir Ojo Derecho Lejos"} callback={(v)=>{on_change("lejos_od",v)}}/>
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
                    <MonofLabCristal tipo='CERCA_OD'  buttonText={"Elejir Ojo Derecho Cerca"} callback={(v)=>{on_change("cerca_od",v)}}/>
                </Form.Item>
                <Form.Item>    
                    <MonofLabCristal tipo='CERCA_OI'  buttonText={"Elejir Ojo Izquierdo Cerca"} callback={(v)=>{on_change("cerca_oi",v)}}/>
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
export default MonofLabItems;