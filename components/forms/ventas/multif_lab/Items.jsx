import { useState } from "react"
import VentasArmazon from "../Armazon"
import VentasTratamiento from "../Tratamiento"
import MultifLabCristal from "./MultifLabCristal"
import { Form } from "antd"
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
        setItems((mlabitems=>{
            const _items = {...mlabitems,[field]:value}
            props?.callback(_items)
            return _items
        }))
        
    }

    const onVisibleChange = (field,value) => {
        //alert(`${field} : ${value}`)
        setItems(_=>{
            const _values = {...mlabitems,[field]:value}
            props?.callback(_values)
            return _values
        })
    }


    return <>
        <Form.Item  label={"OD: "}>
            <MultifLabCristal onVisibleChange={(_value)=>onVisibleChange("od_visible",_value)}  tipo='OD' buttonText={<SelectCodeButton />} callback={(v)=>{on_change("od",v)}}/>
        </Form.Item>
        <Form.Item  label={"OI: "}>    
            <MultifLabCristal onVisibleChange={(_value)=>onVisibleChange("oi_visible",_value)}  tipo='OI' buttonText={<SelectCodeButton />} callback={(v)=>{on_change("oi",v)}}/>
        </Form.Item>
        <Form.Item  label={"ARMAZON: "}>    
            <VentasArmazon onVisibleChange={(_value)=>onVisibleChange("armazon_visible",_value)}  tipo='ARMAZON' buttonText={<SelectCodeButton />}  callback={(v)=>{on_change("armazon",v)}}/>
        </Form.Item>
        <Form.Item  label={"TRATAMIENTO: "}>    
            <VentasTratamiento onVisibleChange={(_value)=>onVisibleChange("tratamiento_visible",_value)}  tipo='TRATAMIENTO' buttonText={<SelectCodeButton />} callback={(v)=>{on_change("tratamiento",v)}}/>
        </Form.Item>
    </>
}

export default MultifLabItems;

