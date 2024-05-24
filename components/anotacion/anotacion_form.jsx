import globals from "@/src/globals"
import { post_method } from "@/src/helpers/post_helper"
import { post } from "@/src/urls"
import { Row, Col, Checkbox, Input, Button } from "antd"
import { useState } from "react"




/**
 * 
 * @param tipo 
 * 
 */
const AnotacionForm = (props) => {
    const [anotacion, setAnotacion] = useState({
        asunto:"",
        mensaje:"",
        enviarCorreo:false,
        enviarCorreoAdmin:false,
        correo:"",
        fksucursal: globals.obtenerSucursal(),
        fkusuario: globals.obtenerUID(),
    })

    const setValue = (idx,val) => { setAnotacion(_a=>({..._a,[idx]:val})) }

    const onAgregar = () => {
        post_method(post.insert.anotacion, anotacion, (resp) => {
            alert("OK")
            props?.callback?.()
        })
    }
    return <>
        <Row>
            <Col span={24}>
                <Input value={anotacion.asunto} prefix="Asunto" onChange={(e)=>{setValue("asunto", e.target.value)}} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Input.TextArea value={anotacion.mensaje} prefix="Mensaje" onChange={(e)=>{setValue("mensaje", e.target.value)}} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Checkbox 
                onChange={(e)=>{
                    setValue("enviarCorreo",!anotacion.enviarCorreo)
                }}
                checked={anotacion.enviarCorreo}>
                    Enviar Correo
                </Checkbox>
                <Input prefix="E-mail" />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Checkbox 
                onChange={(e)=>{
                    setValue("enviarCorreoAdmin",!anotacion.enviarCorreoAdmin)
                }}
                checked={anotacion.enviarCorreoAdmin}>
                    Enviar correo a administrador
                </Checkbox>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button onClick={onAgregar}>Guardar Anotaci&oacute;n</Button>
            </Col>
        </Row>
    </>
}

export default AnotacionForm