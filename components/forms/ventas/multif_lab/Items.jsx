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
    })

    
    const on_change = (field, value) => {
        setItems((mlabitems=>{
            const _items = {...mlabitems,[field]:value}
            props?.callback(_items)
            return _items
        }))
        
    }
    return <>
        <Form.Item>
            <MultifLabCristal tipo='OD' buttonText={"Elejir Ojo Izquierdo"} callback={(v)=>{on_change("oi",v)}}/>
        </Form.Item>
        <Form.Item>    
            <MultifLabCristal tipo='OI' buttonText={"Elejir Ojo Derecho"} callback={(v)=>{on_change("od",v)}}/>
        </Form.Item>
        <Form.Item>    
            <VentasArmazon tipo='ARMAZON' buttonText={"Elejir Armazon"}  callback={(v)=>{on_change("armazon",v)}}/>
        </Form.Item>
        <Form.Item>    
            <VentasTratamiento tipo='TRATAMIENTFO' buttonText={"Elejir Tratamiento"} callback={(v)=>{on_change("tratamiento",v)}}/>
        </Form.Item>
    </>
}

export default MultifLabItems;

