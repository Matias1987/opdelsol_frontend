import { Form } from "antd";
import { useState } from "react";
import VentasInsumo from "../Insumo";
import LCLabItem from "./lc_lab_item";


const LCLabItems = (props) => {

    
    const [items, setItems] = useState({
        od:null,
        oi:null,
        insumo:null,
    })

    const onChange= ( index, value) => {
        setItems((items)=>{
            const _items = {...items,[index]:value};
            props?.callback?.(_items);
            return _items;
        })
    }

    return <>
    <LCLabItem tipo="OD" callback={(v)=>{onChange("od",v)}} />
    <LCLabItem tipo="OI" callback={(v)=>{onChange("oi",v)}} />
    <VentasInsumo tipo="INSUMO" callback={(v)=>{onChange("insumo",v)}} />
    </>
}

export default LCLabItems;