//MonofLabCristal
import { Button, Col, Form, Input, Row } from "antd";
import SelectCodigoVenta from "../SelectCodigoVenta";
import { useEffect, useRef, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import globals from "@/src/globals";

const MonofLabCristal = (props) => {
    
    const [visible, setVisible] = useState(false);
    
    const precioRef = useRef(null)

    const [cristal, setCristal] = useState({
        idcodigo: -1,
        tipo: props.tipo,
        codigo: null,
        eje: -1,
        precio: 0,
        esf: -1,
        cil: -1,
        cantidad:1,

    })

    const onchange_codigo = (value) => {
        precioRef.current.value = value.precio;

        setCristal((cristal)=>{
            const __cristal = {...cristal,codigo:value.codigo, precio: value.precio, idcodigo: value.idcodigo}
            props?.callback(__cristal)
            return __cristal
        })
        
    }
    const onchange_eje = (e) => {
        setCristal((cristal)=>{
            const __cristal = {...cristal,eje:e.target.value}
            props?.callback(__cristal)
            return __cristal
        })
        
    }
    const onchange_esf = (e) => {
        setCristal((cristal)=>{
            const __cristal = {...cristal,esf:e.target.value}
            props?.callback(__cristal)
            return __cristal
        })
        
    }
    const onchange_cil = (e) => {
        setCristal((cristal)=>{
            const __cristal = {...cristal,cil:e.target.value}
            props?.callback(__cristal)
            return __cristal
        })
        
    }
    const onchange_precio = (e) => {
        
        setCristal((cristal)=>{
            const __cristal = {...cristal,precio:e.target.value}
            props?.callback(__cristal)
            return __cristal
        })
    }
    
    return (
        !visible ? <Button size="small" onClick={()=>{setVisible(true)}}>{
            typeof props.buttonText === 'undefined' ?
            "Establecer Cristal"
            :
            props.buttonText
            }</Button> :
        <>
            <Row>
                <Col span={3}>
                    <Input addonBefore={"Esf:"} onChange={onchange_esf} />&nbsp;
                </Col>
                <Col span={3}>
                    <Input addonBefore={"Cil:"} onChange={onchange_cil} />&nbsp;
                </Col>
                <Col span={3}>
                    <Input addonBefore={"Eje:"} onChange={onchange_eje} />&nbsp;
                </Col>
                <Col span={10}>
                    <SelectCodigoVenta idfamilias={[globals.familiaIDs.CRISTALES]} buttonText={"Seleccionar Codigo Cristal"} callback={onchange_codigo} />
                </Col>
                
                <Col span={4}>
                    <span>&nbsp;&nbsp;Precio: </span><input onChange={onchange_precio} ref={precioRef} style={{textAlign:"right", width:"100px", border: "1px solid #ccc", borderRadius:"6px", borderColor:"lightgray", padding:".4em", fontSize:"1.1em"}} />
                </Col>
                <Col span={1}>
                    <Button danger  onClick={()=>{setVisible(false)}}><DeleteOutlined/></Button>
                </Col>
            </Row>

        </>
        )
}

export default MonofLabCristal;