import FacturaSelect from "@/components/FacturaSelect"
import { post_method } from "@/src/helpers/post_helper"
import { get, post } from "@/src/urls"
import CostoCheckBox from "./Costo"

import { Form, InputNumber, Button, Checkbox, Input, Row, Col, Radio, Divider } from "antd"
import { useState, useEffect }  from "react"

const ModificarCantidadForm = (props) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [descripcion, setDescripcion] = useState("")
    const [textareaval, setTextAreaVal] = useState("")
    const [modoPrecio, setModoPrecio] = useState(1)
    const [modMP, setModMP] = useState(false)
    
    const [reload, setReload] = useState(false);
    useEffect(()=>{
        //alert(JSON.stringify( props.codigos))
        /*setLoading(true)
        fetch(get.detalle_stock+props.idsucursal+"/"+props.idcodigo)
        .then(response=>response.json())
        .then((response)=>{
           
            setData({

                codigo: response.data[0].codigo,
                ruta: response.data[0].ruta,
                cantidad: response.data[0].cantidad,
                idcodigo: response.data[0].idcodigo,
                costo:  response.data[0].costo,
                
            })
          
            setCostoValue(-1)
            setCantidadValue(0)
            setLoading(false)

        })*/
        var l = ""
        if(typeof props.codigos !== 'undefined'){

        props.codigos.map((c)=>{
            l += c.codigo + ", "
        })

        }
        setTextAreaVal(l)

    }
    
    ,[props.codigos])

    const onFinish = (values) => {
        const __data = {
            //idcodigo: props.idcodigo,
            codigos: props.codigos,
            idsucursal: props.idsucursal,
            cantidad: typeof values.cantidad === 'undefined' ? 0 : values.cantidad,
            factura_idfactura: (values.factura == null ? -1 : values.factura),
            descripcion: descripcion.trim(),
            costo: typeof values.costo === 'undefined' ? -1 : values.costo ,
            modo_precio: modMP ? modoPrecio : -1,
        }
     
        if(
            !modMP &&
            __data.cantidad == 0 && 
            __data.costo < 0 && 
            (__data.descripcion.trim()).length<1
        ){
            alert("Sin Cambios")
            return;
        }

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
    const onFinishFailed = (e) => {alert(JSON.stringify(e))}

    const setCantidadValue = (value)=>{
        form.setFieldsValue({cantidad:value})
    }

    const setFacturaValue = (value) => {
        form.setFieldsValue({factura:value});
    }
    const setCostoValue = (value) => {
        form.setFieldsValue({costo:value});
    }

    
    const detalles = _ =>
    <>
        <p>Modificar C&oacute;digo: <span style={{fontSize:".75em", color:"lightgrey"}}><i>{data.ruta}</i></span> <b>{data.codigo}</b></p>
        <p>Cantidad Actual: <b>{data.cantidad}</b></p>
        <p>Costo Actual: <b>{data.costo}</b></p>
    </>

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
        <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
        >
            <Form.Item label={"Factura (Opcional)"} name={"factura"} value="">
                <FacturaSelect callback={(v)=>{
                    setFacturaValue(v)
                }}/>
            </Form.Item>
            <Form.Item
            name={"cantidad"}
            label={"Cantidad a Incrementar"}
            >
                <Input type="number"  defaultValue={0} />
            </Form.Item>
            <Form.Item
                label={"Costo"}
                name={"costo"}
                
            >
                <CostoCheckBox callback={(v)=>{setCostoValue(v)}} />
            </Form.Item>
            {/*<Form.Item label={"Descripcion"}  >
                <Input value={descripcion} onChange={(e)=>{setDescripcion(e.target.value)}}/>
            </Form.Item>*/}
            <Row>
                <Col span={8}>
                    <Checkbox
                    onChange={(v)=>{
                        setModMP(!modMP)
                    }}
                    value={modMP}
                    >Modificar Modo Precio</Checkbox>
                </Col>
                <Col span={16}>
                <Radio.Group 
                    disabled={!modMP}
                    value={modoPrecio}
                    onChange={(e)=>{
                        setModoPrecio(v=>{return e.target.value})
                        }}>
                    <Radio value={1}>Precio Subgrupo</Radio>
                    <Radio value={2}>Precio Individual</Radio>
                </Radio.Group>
                </Col>
            </Row>
            <Form.Item>
                <Row>
                    <Col span={24}>
                        <Divider />
                        <Button type="primary" htmlType="submit">Guardar</Button>
                    </Col>
                </Row>
                
            </Form.Item>
        </Form>
        </>
    

    return( loading ? null: content())
}

export default ModificarCantidadForm;