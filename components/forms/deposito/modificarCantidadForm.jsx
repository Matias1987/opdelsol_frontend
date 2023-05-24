import FacturaSelect from "@/components/FacturaSelect"
import { post_method } from "@/src/helpers/post_helper"
import { get, post } from "@/src/urls"

const { Form, InputNumber, Button } = require("antd")
const { useState, useEffect } = require("react")

const ModificarCantidadForm = (props) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [cantidad, setCantidad] = useState(null)
    const [costo, setCosto] = useState(null)
    useEffect(()=>{
        setLoading(true)
        //alert(get.detalle_stock+props.idsucursal+"/"+props.idcodigo)
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
            //alert( response.data[0].costo)

            setCantidad(response.data[0].cantidad)
            setCosto(response.data[0].costo)

            setCostoValue(response.data[0].costo)
            setCantidadValue(response.data[0].cantidad)
            setLoading(false)
        })
    },[cantidad,costo])

    const onFinish = (values) => {

        post_method(post.update.incrementar_cantidad,{
            idcodigo: props.idcodigo,
            idsucursal: props.idsucursal,
            cantidad: values.cantidad,
            factura_idfactura: (values.factura == null ? -1 : values.factura),
            costo: values.costo,
        },(r)=>{
            if(r.status == "OK"){
                alert("OK")
                setCantidad(values.cantidad)
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
        form.setFieldValue({factura:value});
    }
    const setCostoValue = (value) => {
        form.setFieldValue({costo:value});
    }

    const Content = _ => 
        <>
        <h1>Modificar</h1>
            <p>Modificar C&oacute;digo: <span style={{fontSize:".75em", color:"lightgrey"}}><i>{data.ruta}</i></span> <b>{data.codigo}</b></p>
            <p>Cantidad Actual: {data.cantidad}</p>
            <p>Costo Actual: {data.costo}</p>
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
                required={true} 
                >
                    <InputNumber step={1} value="0" onChange={(v)=>{setCantidadValue(v)}} />
                </Form.Item>
                <Form.Item
                    label={"Costo"}
                    name={"costo"}
                >
                    <InputNumber onChange={(v)=>{setCostoValue(v)}}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Guardar</Button>
                </Form.Item>
            </Form>
        </>
    

    return( loading ? null: <Content />)
}

export default ModificarCantidadForm;