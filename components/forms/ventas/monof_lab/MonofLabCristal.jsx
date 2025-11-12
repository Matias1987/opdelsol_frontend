//MonofLabCristal
import { Button, Col, Form, Input, Row, Select } from "antd";
import SelectCodigoVenta from "../SelectCodigoVenta";
import { useEffect, useRef, useState } from "react";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import globals from "@/src/globals";
import { parse_float_string, validate_esf_cil_eje } from "@/src/helpers/string_helper";

const MonofLabCristal = (props) => {
    
    const [visible, setVisible] = useState(false);
    

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

    /*useEffect(()=>{
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

    },[])*/

    const onchange_codigo = (value) => {
        
        setCristal((_cristal)=>{
            const __cristal = {..._cristal,codigo:value.codigo, precio: value.precio, idcodigo: value.idcodigo}
            props?.callback(__cristal)
            return __cristal
        })
        
    }
    const onchange_eje = (v) => {
        if(!validate_esf_cil_eje(v))
            {
                return
            }
        setCristal((_cristal)=>{
            const __cristal = {..._cristal,eje:(v||"")==""?"0":v}
            props?.callback(__cristal)
            return __cristal
        })
        
    }
    const onchange_esf = (v) => {
        if(!validate_esf_cil_eje(v))
            {
                return
            }
        setCristal((_cristal)=>{
            const __cristal = {..._cristal,esf:(v||"")==""?"0":v}
            props?.callback(__cristal)
            return __cristal
        })
        
    }
    const onchange_cil = (v) => {
        if(!validate_esf_cil_eje(v))
            {
                return
            }
        setCristal((_cristal)=>{
            const __cristal = {..._cristal,cil:(v||"")==""?"0":v}
            props?.callback(__cristal)
            return __cristal
        })
        
    }
    const onchange_precio = (e) => {
        
        setCristal((_cristal)=>{
            const __cristal = {..._cristal,precio:(e.target.value.length<1? "0" : e.target.value)}
            props?.callback(__cristal)
            return __cristal
        })
    }

    const onRemove = () => {
        onchange_codigo({precio:0, codigo:null, idcodigo: -1})
        setVisible(v=>{ props?.onVisibleChange?.(false); return false;})
    }

    const _estilo_label = {
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
                <Col span={10}>
                    <SelectCodigoVenta idfamilias={[globals.familiaIDs.CRISTALES]} buttonText={"Seleccionar Código"} callback={onchange_codigo} />
                </Col>
 
                {/*<Col span={1} style={_estilo_label}>
                    Esf:
                </Col>*/}
                <Col span={3}>
                    <Input style={{minWidth:"100px"}}  prefix="Esf.: " size="small"  disabled={cristal.codigo==null}  value={cristal.esf} onChange={(e)=>{onchange_esf(e.target.value)}} />
                </Col>
                {/*<Col span={1} style={_estilo_label}>
                    Cil:
                </Col>*/}
                <Col span={3}>
                    <Input style={{minWidth:"100px"}}  prefix="Cil.: " size="small"  disabled={cristal.codigo==null}   value={cristal.cil} onChange={(e)=>{onchange_cil(e.target.value)}}/>
                </Col>
                {/*<Col span={1} style={_estilo_label}>
                    Eje:
                </Col>*/}
                <Col span={3}>
                    <Input style={{minWidth:"100px"}}  prefix="Eje.: "  size="small"  disabled={cristal.codigo==null}  value={cristal.eje} onChange={(e)=>{onchange_eje(e.target.value)}}/>
                </Col>
                
                
                <Col span={4}>
                    <Input onWheel={(e)=>{e.target.blur()}} style={{minWidth:"100px"}} disabled={cristal.codigo==null} type="number" readOnly={false} size="small"  prefix="Precio" value={cristal.precio} onChange={onchange_precio} />
                </Col>
                <Col span={1}>
                    <Button danger size="small" onClick={()=>{onRemove()}}><CloseOutlined/></Button>
                </Col>
            </Row>

        </>
        )
}

export default MonofLabCristal;