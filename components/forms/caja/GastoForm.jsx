import globals from "@/src/globals"
import { registrar_evento } from "@/src/helpers/evento_helper"
import { post_method } from "@/src/helpers/post_helper"
import { current_date_ymd, parse_float_string, validate_only_numbers_and_letters } from "@/src/helpers/string_helper"
import { get, post } from "@/src/urls"

const { Form, Input, Select, Button, Row, Col } = require("antd")
const { useState, useEffect } = require("react")

const GastoForm = (props) => {
    const [options, setOptions] = useState([])
    const [enabled, setEnabled] = useState(true)
    const [gasto, setGasto] = useState({
        idmotivo: null,
        monto: 0,
        comentarios: "",
        tk: globals.getToken(),
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


    const onFinish = () => {
        
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


            if(gasto?.comentarios.length>0)
            {
                if(!validate_only_numbers_and_letters(gasto.comentarios)){
                    alert("El campo comentarios solo acepta números y letras")
                    setEnabled(true)
                    return
                }
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

    const row_style = {
        padding:"6px",
    }

    return (<>
        
        <Row style={row_style}>
            <Col span={24}>
            <h3>Cargar Gasto</h3>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            <b>Motivo</b>
            </Col>
        </Row>
        <Row style={row_style}>
            <Col span={24}>
                <Select value={gasto.idmotivo} style={{width:"100%"}} options={options} onChange={(value)=>{onChange(value,'idmotivo')}} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            <b>Monto</b>
            </Col>
        </Row>
        <Row style={row_style}>
            <Col span={24}>
                <Input onWheel={(e)=>{e.target.blur()}} value={gasto.monto}  onClick={(e)=>{e.target.select()}} type="number" onChange={(e)=>{onChange(parse_float_string(e.target.value),'monto')}} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            <b>Comentarios</b>
            </Col>
        </Row>
        <Row style={row_style}>
            <Col span={24}>
                <Input value={gasto.comentarios} onClick={(e)=>{e.target.select()}}  maxLength={49} placeholder="Max. 49 carac."  onChange={(e)=>{onChange(e.target.value,'comentarios')}}  />
            </Col>
        </Row>
        <Row style={row_style}>
            <Col span={24}>
                <Button disabled={!enabled} onClick={onFinish} block type="primary" htmlType="submit">Guardar</Button>
            </Col>
        </Row>
        {/*<Form  onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item required label="Motivo" name={"motivo"} >
                
            </Form.Item>

            <Form.Item label="Monto"  name={"monto"} value={gasto.monto} >

                
            </Form.Item>
            <Form.Item label="Comentarios"  name={"comentarios"}>

                
            </Form.Item>

            <Form.Item>
                
            </Form.Item>

        </Form>*/}
    </>)
}

export default GastoForm;