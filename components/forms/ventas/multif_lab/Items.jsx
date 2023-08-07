import { useState } from "react"
import VentasArmazon from "../Armazon"
import VentasTratamiento from "../Tratamiento"
import MultifLabCristal from "./MultifLabCristal"
import { Form } from "antd"

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
        setItems((mlabitems=>{
            const _items = {...mlabitems,[field]:value}
            props?.callback(_items)
            return _items
        }))
        
    }

    const onVisibleChange = (field,value) => {
        alert(`${field} : ${value}`)
        setItems(_=>{
            const _values = {...mlabitems,[field]:value}
            props?.callback(_values)
            return _values
        })
    }


    return <>
        <Form.Item>
            <MultifLabCristal onVisibleChange={(_value)=>onVisibleChange("od_visible",_value)}  tipo='OD' buttonText={"Elejir Ojo Izquierdo"} callback={(v)=>{on_change("oi",v)}}/>
        </Form.Item>
        <Form.Item>    
            <MultifLabCristal onVisibleChange={(_value)=>onVisibleChange("oi_visible",_value)}  tipo='OI' buttonText={"Elejir Ojo Derecho"} callback={(v)=>{on_change("od",v)}}/>
        </Form.Item>
        <Form.Item>    
            <VentasArmazon onVisibleChange={(_value)=>onVisibleChange("armazon_visible",_value)}  tipo='ARMAZON' buttonText={"Elejir Armazon"}  callback={(v)=>{on_change("armazon",v)}}/>
        </Form.Item>
        <Form.Item>    
            <VentasTratamiento onVisibleChange={(_value)=>onVisibleChange("tratamiento_visible",_value)}  tipo='TRATAMIENTO' buttonText={"Elejir Tratamiento"} callback={(v)=>{on_change("tratamiento",v)}}/>
        </Form.Item>
    </>
}

export default MultifLabItems;

