//MonofLabCristal
import { Button, Col, Form, Input, Row, Select } from "antd";
import SelectCodigoVenta from "../SelectCodigoVenta";
import { useEffect, useRef, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import globals from "@/src/globals";

const MultifLabCristal = (props) => {
    const [visible, setVisible] = useState(false);
    const precioRef = useRef(null)
    const [itemsEsf, setItemsEsf] = useState([])
    const [itemsCil, setItemsCil] = useState([])
    const [itemsEje, setItemsEje] = useState([])

    const [cristal, setCristal] = useState({
        idcodigo: -1,
        tipo: props.tipo,
        codigo: null,
        eje: "",
        precio: 0,
        esf: "",
        cil: "",
        cantidad:1,

    })

    useEffect(()=>{
        var esf  = []
        for(let i=-17;i<=17;i+=.25)
        {
            esf.push({
                value: i.toString(),
                label: i.toString(),
            })
        }
        var cil = []
        for(let i=-4;i<=0;i+=.25)
        {
            cil.push({
                value: i.toString(),
                label: i.toString(),
            })
        }
        var eje = []
        for(let i=0;i<181;i++){
            eje.push({
                value: i.toString(),
                label: i.toString(),
            })
        }
        setItemsCil(cil)
        setItemsEsf(esf)
        setItemsEje(eje)
    },[])

    const onchange_codigo = (value) => {
        /*cristal.codigo = value.codigo;
        cristal.precio = value.precio;
        setPrecio(value.precio)
        alert(precioRef.current.value)
        props.callback(cristal)*/

        //precioRef.current.value = value.precio;

        setCristal((_cristal_)=>{
            const __cristal = {..._cristal_,codigo:value.codigo, precio: value.precio, idcodigo: value.idcodigo}
            props?.callback(__cristal)
            return __cristal
        })
        
    }
    const onchange_eje = (v) => {
        setCristal((_cristal_)=>{
            const __cristal = {..._cristal_,eje:v}
            props?.callback(__cristal)
            return __cristal
        })
        
    }
    const onchange_esf = (v) => {
        setCristal((_cristal_)=>{
            const __cristal = {..._cristal_,esf:v}
            props?.callback(__cristal)
            return __cristal
        })
        
    }
    const onchange_cil = (v) => {
        setCristal((_cristal_)=>{
            const __cristal = {..._cristal_,cil:v}
            props?.callback(__cristal)
            return __cristal
        })
        
    }
    const onchange_precio = (e) => {
        
        /*cristal.precio = e.target.value;
        setPrecio(e.target.value)
        props.callback(cristal)*/
        setCristal((_cristal)=>{
            const __cristal = {..._cristal,precio:e.target.value}
            props?.callback(__cristal)
            return __cristal
        })
    }

    const onRemove = () => {
        onchange_codigo({precio:0, codigo:null, idcodigo: -1})
        setVisible(v=>{ props?.onVisibleChange?.(false); return false;})
    }

    const _estilo_label = {
        padding: ".30em",
        textAlign: "right",
    }
    
    return (
        !visible ? <Button size="small" type="primary" onClick={()=>{setVisible(v=>{ props?.onVisibleChange?.(true); return true;})}}>{
            typeof props.buttonText === 'undefined' ?
            "Establecer Cristal"
            :
            props.buttonText
            }</Button> :
        <>
            <Row>
                <Col span={1} style={_estilo_label}>
                &nbsp;Esf:
                    {/*<Input type="number" step={0.25} min={-17} max={17} addonBefore={"Esf:"} onChange={onchange_esf} />&nbsp;*/}
                </Col>
                <Col span={3}>
                    <Select size="small" options={itemsEsf} onChange={(v)=>{onchange_esf(v)}} />
                </Col>
                <Col span={1} style={_estilo_label}>
                &nbsp;Cil:
                    {/*<Input addonBefore={"Cil:"} onChange={onchange_cil} />&nbsp;*/}
                </Col>
                <Col span={3}>
                    <Select size="small" options={itemsCil} onChange={(v)=>{onchange_cil(v)}}/>
                </Col>
                {/*<Col span={3}>
                    <Input addonBefore={"Eje:"} onChange={onchange_eje} />&nbsp;
                </Col>*/}
                <Col span={1} style={_estilo_label}>
                    Eje:
                </Col>
                <Col span={2}>
                    <Select size="small" options={itemsEje} onChange={(v)=>{onchange_eje(v)}} />
                </Col>
                <Col span={8}>
                    <SelectCodigoVenta idfamilias={[globals.familiaIDs.CRISTALES]} buttonText={"Seleccionar Base"} callback={onchange_codigo} />
                </Col>
                
                <Col span={4}>
                    {/*<span>&nbsp;&nbsp;Precio: </span><input readOnly onChange={onchange_precio} ref={precioRef} style={{textAlign:"right", width:"100px", border: "1px solid #ccc", borderRadius:"6px", borderColor:"lightgray", padding:".4em", fontSize:"1.1em"}} />*/}
                    <Input type="number" style={{backgroundColor:"rgba(131,137,150, 0.4)"}} prefix="Precio:" value={cristal.precio} readOnly={false} onChange={onchange_precio} size="small" />
                </Col>
                <Col span={1}>
                    <Button size="small" danger  onClick={()=>{onRemove()}}><DeleteOutlined/></Button>
                </Col>
            </Row>

        </>
        )
}

export default MultifLabCristal;