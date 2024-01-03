//MonofLabCristal
import { Button, Col, Form, Input, Row, Select } from "antd";
import SelectCodigoVenta from "../SelectCodigoVenta";
import { useEffect, useRef, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import globals from "@/src/globals";
import { parse_float_string } from "@/src/helpers/string_helper";

const MonofLabCristal = (props) => {
    
    const [visible, setVisible] = useState(false);
    
    //const precioRef = useRef(null)

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
        //precioRef.current.value = value.precio;

        setCristal((_cristal)=>{
            const __cristal = {..._cristal,codigo:value.codigo, precio: value.precio, idcodigo: value.idcodigo}
            props?.callback(__cristal)
            return __cristal
        })
        
    }
    const onchange_eje = (v) => {
        setCristal((_cristal)=>{
            const __cristal = {..._cristal,eje:(v||"")==""?"0":v}
            props?.callback(__cristal)
            return __cristal
        })
        
    }
    const onchange_esf = (v) => {
        setCristal((_cristal)=>{
            const __cristal = {..._cristal,esf:(v||"")==""?"0":v}
            props?.callback(__cristal)
            return __cristal
        })
        
    }
    const onchange_cil = (v) => {
        setCristal((_cristal)=>{
            const __cristal = {..._cristal,cil:(v||"")==""?"0":v}
            props?.callback(__cristal)
            return __cristal
        })
        
    }
    const onchange_precio = (e) => {
        
        setCristal((_cristal)=>{
            const __cristal = {..._cristal,precio:parse_float_string(e.target.value)}
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
                {/*<Col span={3}>
                    <Input addonBefore={"Esf:"} onChange={onchange_esf} />&nbsp;
                </Col>
                <Col span={3}>
                    <Input addonBefore={"Cil:"} onChange={onchange_cil} />&nbsp;
                </Col>
                <Col span={3}>
                    <Input addonBefore={"Eje:"} onChange={onchange_eje} />&nbsp;
                </Col>
                */}
                <Col span={1} style={_estilo_label}>
                    Esf:
                </Col>
                <Col span={3}>
                    {/*<Select size="small" style={{fontSize:".5em"}} options={itemsEsf} onChange={(v)=>{onchange_esf(v)}} />*/}
                    <Input  step={"0.25"} value={cristal.esf} onChange={(e)=>{onchange_esf(e.target.value)}} />
                </Col>
                <Col span={1} style={_estilo_label}>
                    Cil:
                </Col>
                <Col span={3}>
                    {/*<Select size="small" options={itemsCil} onChange={(v)=>{onchange_cil(v)}}/>*/}
                    <Input  step={"0.25"}  value={cristal.cil} onChange={(e)=>{onchange_cil(e.target.value)}}/>
                </Col>
                <Col span={1} style={_estilo_label}>
                    Eje:
                </Col>
                <Col span={2}>
                    {/*<Select size="small" options={itemsEje} onChange={(v)=>{onchange_eje(v)}}/>*/}
                    <Input  step={"0.25"} value={cristal.eje} onChange={(e)=>{onchange_eje(e.target.value)}}/>
                </Col>
                
                <Col span={8}>
                    <SelectCodigoVenta idfamilias={[globals.familiaIDs.CRISTALES]} buttonText={"Seleccionar Codigo Base"} callback={onchange_codigo} />
                </Col>
                <Col span={4}>
                    <Input type="number" readOnly={false} size="small"  prefix="Precio" value={cristal.precio} onChange={onchange_precio} style={{backgroundColor:"rgba(131,137,150, 0.4)"}} />
                </Col>
                <Col span={1}>
                    <Button danger size="small" onClick={()=>{onRemove()}}><DeleteOutlined/></Button>
                </Col>
            </Row>

        </>
        )
}

export default MonofLabCristal;