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
                
            })
            setLoading(false)
        })
    },[cantidad])

    const onFinish = (values) => {

        post_method(post.update.modificar_cantidad,{
            idcodigo: props.idcodigo,
            idsucursal: props.idsucursal,
            cantidad: values.cantidad,
        },(r)=>{
            if(r.status == "OK"){
                alert("OK")
                setCantidad(values.cantidad)
                if(props.onOk !== typeof 'undefined'){
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

    const Content = _ => 
        <>
        <h1>Modificar Cantidad</h1>
            <p>Modificar Cantidad C&oacute;digo: <span style={{fontSize:".75em", color:"lightgrey"}}><i>{data.ruta}</i></span> <b>{data.codigo}</b></p>
            <p>Cantidad Actual: {data.cantidad}</p>
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
                label={"Cantidad"}
                required={true}
                value={0}
                >
                    <InputNumber step={1} value="0" onChange={(v)=>{setCantidadValue(v)}} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Guardar</Button>
                </Form.Item>
            </Form>
        </>
    

    return( loading ? null: <Content />)
}

export default ModificarCantidadForm;