import { useState } from "react";
import VentasInsumo from "../Insumo";
import LCItem from "./lc_item";

const LCStockItems = (props) => {

    const [items, setItems] = useState({
        od:null,
        oi:null,
        insumo: null,
    })
    
    const onChange= ( index, value) => {
        setItems((items)=>{
            const _items = {...items,[index]:value};
            props?.callback?.(_items);
            return _items;
        })
    }

    return (
    <>
    
    <LCItem callback={(v)=>{onChange("od",v)}}/>
    <LCItem callback={(v)=>{onChange("oi",v)}}/>  
    <VentasInsumo callback={(v)=>{onChange("insumo",v)}} />
    </>
    )
}

export default LCStockItems;