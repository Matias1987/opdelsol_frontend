import FacturaSelect from "@/components/FacturaSelect"
import { post_method } from "@/src/helpers/post_helper"
import { get, post } from "@/src/urls"
import CostoCheckBox from "./Costo"

import { Button, Checkbox, Input, Row, Col, Divider } from "antd"
import { useState, useEffect }  from "react"

const ModificarCantidadForm = (props) => {
    const [loading, setLoading] = useState(false)
    const [descripcion, setDescripcion] = useState("")
    const [textareaval, setTextAreaVal] = useState("")
    const [modoPrecio, setModoPrecio] = useState(1)
    const [modMP, setModMP] = useState(false)
    const [cambiarCantidad, setCambiarCantidad] = useState(false)
    const [incrementarCantidad, setIncrementarCantidad] = useState(false)
    const [reload, setReload] = useState(false);

    const [stock, setStock] = useState({
        cantidad: 0,
        idfactura: -1,
        costo: -1,
    })
    useEffect(()=>{
        
        var l = ""
        if(typeof props.codigos !== 'undefined'){

        props.codigos.map((c)=>{
            l += c.codigo + ", "
        })

        }
        setTextAreaVal(l)

    }
    
    ,[props.codigos])

    const onFinish = () => {
        const __data = {
            //idcodigo: props.idcodigo,
     
            incrementarCantidad: incrementarCantidad,
            codigos: props.codigos.map(c=>c.idcodigo),
            idsucursal: props.idsucursal,
            cantidad: cambiarCantidad ? stock.cantidad : -1,
            factura_idfactura: (stock.idfactura == null ? -1 : stock.idfactura),
            descripcion: descripcion.trim(),
            costo: stock.costo,
            modo_precio: modMP ? modoPrecio : -1,
        }

     
       //if(
       //    !modMP &&
       //    __data.cantidad == 0 && 
       //    __data.costo < 0 && 
       //    (__data.descripcion.trim()).length<1
       //){
       //    alert("Sin Cambios")
       //    return;
       //}

        post_method(post.update.incrementar_cantidad,__data,(r)=>{
            if(r.status == "OK"){
                alert("OK")
                setReload(!reload)
                if(typeof props.onOk !==  'undefined'){
                    props.onOk();
                }
            }
            
        })
    }

    const setCantidadValue = (value)=>{
        setStock(s=>({...s,cantidad:value}))
    }

    const setFacturaValue = (value) => {
        setStock(s=>({...s,idfactura:value}))
    }
    const setCostoValue = (value) => {
        setStock(s=>({...s,costo:value}))
    }

    


    const detalles_multiple = _ =>
    <> Codigos:
    <Input.TextArea style={{backgroundColor:"#F4E8B3"}} value={textareaval}/>
    </> 

    const content = _ => 
        <>
        <h3>Modificar C&oacute;digos</h3>    
        <>
        {
            detalles_multiple()
        }
        </>  
        <Divider />   
        <Row>
            <Col span={24}>
                <FacturaSelect callback={(v)=>{
                                setFacturaValue(v)
                            }}/>
            </Col>
        </Row>
        <Row style={{padding:"1em"}}>
            <Col span={4}>
                <Checkbox checked={cambiarCantidad} onChange={()=>{
                    setCambiarCantidad(!cambiarCantidad)
                    }}>Cambiar Cantidad</Checkbox>
            </Col>
            <Col span={4}>
                <Checkbox disabled={!cambiarCantidad} checked={incrementarCantidad} onChange={()=>{setIncrementarCantidad(!incrementarCantidad)}}>Incrementar Cantidad</Checkbox>
            </Col>
            <Col span={16}>
                <Input disabled={!cambiarCantidad} type="number" value={stock.cantidad}  defaultValue={0}  onChange={(e)=>{setCantidadValue(parseFloat(e.target.value||"0"))}}  />
            </Col>
        </Row>
        <Row style={{padding:"1em"}}>
            <Col span={24}>
                <CostoCheckBox callback={(v)=>{setCostoValue(parseFloat(v))}} />
            </Col>
        </Row>
        
        <Row style={{padding:"1em"}}>
            <Col span={24}>
                <Divider />
                <Button type="primary" htmlType="submit" onClick={onFinish}>Guardar</Button>
            </Col>
        </Row>
        </>
    

    return( loading ? null: content())
}

export default ModificarCantidadForm;