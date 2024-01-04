import { Input } from "antd";
import { useState } from "react";

const MP_Efectivo = (props)=>{
    
    const [modoPago, setModoPago] = useState({monto:0})

    const onChange = (idx,val)=>{setModoPago(_mp=>({..._mp,[idx]:val}))}
    
    return <Input 
    type="number" 
    min={0} 
    step={0.01} 
    onClick={(e)=>{e.target.select()}} 
    value={modoPago.monto}  
    prefix="Efectivo: " 
    onChange={(e)=>{onChange("efectivo_monto", e.target.value.length<1 ? 0 : e.target.value)}}
    />
}

export default MP_Efectivo;