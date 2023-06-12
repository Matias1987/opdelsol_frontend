import { Form, Tabs } from "antd";
import VentasArmazon from "../Armazon";
import VentasTratamiento from "../Tratamiento";

const { default: RecStockCristal } = require("./Cristal")

const RecetaStockItems = (props) => {
    const items = {
        lejos_od: null,
        lejos_oi: null,
        lejos_armazon: null,
        lejos_tratamiento: null,
        cerca_od: null,
        cerca_oi: null,
        cerca_armazon: null,
        cerca_tratamiento: null
        
    }


    const onChangePrecio = (val) => {
        if(typeof props.onChangePrecio !== 'undefined'){
            props.onChangePrecio(items)
        }
    }
    const onChangeCodigo = (val) => {
        if(typeof props.onChangeCodigo !== 'undefined'){
            props.onChangeCodigo(items)
        }
    }
    const onChangeEje = (val) => {
        if(typeof props.onChangeEje !== 'undefined'){
            props.onChangeEje(items)
        }
    }


    const tabs_items = [
        {
            key: 'lejos',
            label: 'Lejos',
            children: 
                <>
                <Form.Item>
                    <RecStockCristal tipo='LEJOS_OD' buttonText={"Elejir Ojo Izquierdo Lejos"} callback={(val)=>{items.lejos_od=val; props.callback(items);}}/>
                </Form.Item>
                <Form.Item>    
                    <RecStockCristal tipo='LEJOS_OI' buttonText={"Elejir Ojo Derecho Lejos"} callback={(val)=>{items.lejos_oi=val; props.callback(items);}}/>
                </Form.Item>
                <Form.Item>    
                    <VentasArmazon tipo='LEJOS' buttonText={"Elejir Armazon Lejos"}  callback={(val)=>{items.lejos_armazon=val; props.callback(items);}}/>
                </Form.Item>
                <Form.Item>    
                    <VentasTratamiento tipo='LEJOS' buttonText={"Elejir Tratamiento Lejos"} callback={(val)=>{items.lejos_tratamiento=val; props.callback(items);}}/>
                </Form.Item>
                </>
            
        },
        {
            key: 'cerca',
            label: 'Cerca',
            children: 
                <>
                <Form.Item>
                    <RecStockCristal tipo='CERCA_OD'  buttonText={"Elejir Ojo Derecho Cerca"} callback={(val)=>{items.cerca_od=val; props.callback(items);}}/>
                </Form.Item>
                <Form.Item>    
                    <RecStockCristal tipo='CERCA_OI'  buttonText={"Elejir Ojo Izquierdo Cerca"} callback={(val)=>{items.cerca_oi=val; props.callback(items);}}/>
                </Form.Item>
                <Form.Item>    
                    <VentasArmazon tipo='CERCA' buttonText={"Elejir Armazon Cerca"} callback={(val)=>{items.cerca_armazon=val; props.callback(items);}}/>
                </Form.Item>
                <Form.Item>    
                    <VentasTratamiento tipo='LEJOS' buttonText={"Elejir Tratamiento Cerca"} callback={(val)=>{items.cerca_tratamiento=val; props.callback(items);}}/>
                </Form.Item>
                </>
            
        }
    ]

    return <>
        <Tabs defaultActiveKey="lejos" items={tabs_items} size="large"/>
        
        
    </>
}
export default RecetaStockItems;