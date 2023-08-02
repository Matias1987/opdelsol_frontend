import globals from "@/src/globals"
import { post_method } from "@/src/helpers/post_helper"
import { get, post } from "@/src/urls"

const { Form, Input, Select, Button } = require("antd")
const { useState, useEffect } = require("react")

const GastoForm = (props) => {
    const [options, setOptions] = useState([])
    const [gasto, setGasto] = useState({
        idmotivo: null,
        monto: 0,
        comentarios: null,
    })

    const onChange = (value,index) => {
        setGasto(g=>({
            ...gasto,[index]:value
        }))
    }

    useEffect(()=>{
        fetch(get.conceptos_gasto)
        .then(response=>response.json())
        .then((response)=>{
            //alert(JSON.stringify(response))
            setOptions(response.data.map(r=>({
                value: r.idconcepto_gasto,
                label: r.nombre,
            })))
        })
    },[])


    const onFinish = (values) => {
        
        const data = {
            ...gasto,
            caja_idcaja: globals.obtenerCaja(),
            usuario_idusuario: globals.obtenerUID(),
            sucursal_idsucursal: globals.obtenerSucursal()
        }

        alert(data)

        post_method(post.insert.gasto,data,(response)=>{
            alert("OK")
            //set
            props?.callback?.(response.data)
        })
    }

    const onFinishFailed = (error) => {
        alert(error)
    }

    return (<>
        <h3>Cargar Gasto</h3>
        <Form  onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item label="Motivo" >
                <Select options={options} onChange={(value)=>{onChange(value,'idmotivo')}} />
            </Form.Item>

            <Form.Item label="Monto" >

                <Input type="number" onChange={(e)=>{onChange(e.target.value,'monto')}} />

            </Form.Item>
            <Form.Item label="Comentarios" >

                <Input maxLength={49} placeholder="Max. 49 carac."  onChange={(e)=>{onChange(e.target.value,'comentarios')}}  />

            </Form.Item>

            <Form.Item>
                <Button  block type="primary" htmlType="submit">Guardar</Button>
            </Form.Item>

        </Form>
    </>)
}

export default GastoForm;