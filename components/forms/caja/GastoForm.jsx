import globals from "@/src/globals"
import { registrar_evento } from "@/src/helpers/evento_helper"
import { post_method } from "@/src/helpers/post_helper"
import { current_date_ymd } from "@/src/helpers/string_helper"
import { get, post } from "@/src/urls"

const { Form, Input, Select, Button } = require("antd")
const { useState, useEffect } = require("react")

const GastoForm = (props) => {
    const [options, setOptions] = useState([])
    const [enabled, setEnabled] = useState(true)
    const [gasto, setGasto] = useState({
        idmotivo: null,
        monto: 0,
        comentarios: "",
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
        
        setEnabled(false)

        //alert(JSON.stringify(values))
        globals.obtenerCajaAsync((result)=>{
            if(result==null){
                alert("Caja Cerrada o Desactualizada")
                setEnabled(true)
                return;
            }

            if(gasto.idmotivo==null)
            {
                alert("Seleccionar motivo gasto")
                setEnabled(true)
                return
            }

            

            if(!confirm("Confirmar gasto"))
            {
                setEnabled(true)
                return;
            }
            const data = {
                ...gasto,
                fecha: current_date_ymd(),
                caja_idcaja: result.idcaja,
                usuario_idusuario: globals.obtenerUID(),
                sucursal_idsucursal: globals.obtenerSucursal()
            }
            post_method(post.insert.gasto,data,(response)=>{
                alert("OK")
                //set
                setEnabled(true)
                registrar_evento("GASTO", "Carga Gasto $"+gasto.monto, response?.data)
                props?.callback?.(response.data)
            })
        })
    }

    const onFinishFailed = (error) => {
        alert(error)
    }

    return (<>
        <h3>Cargar Gasto</h3>
        <Form  onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item required label="Motivo" name={"motivo"} >
                <Select options={options} onChange={(value)=>{onChange(value,'idmotivo')}} />
            </Form.Item>

            <Form.Item label="Monto"  name={"monto"}>

                <Input  onClick={(e)=>{e.target.select()}} type="number" onChange={(e)=>{onChange(e.target.value,'monto')}} />

            </Form.Item>
            <Form.Item label="Comentarios"  name={"comentarios"}>

                <Input  onClick={(e)=>{e.target.select()}}  maxLength={49} placeholder="Max. 49 carac."  onChange={(e)=>{onChange(e.target.value,'comentarios')}}  />

            </Form.Item>

            <Form.Item>
                <Button disabled={!enabled} block type="primary" htmlType="submit">Guardar</Button>
            </Form.Item>

        </Form>
    </>)
}

export default GastoForm;