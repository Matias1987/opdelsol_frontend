import { post_method } from "@/src/helpers/post_helper"
import { Button, Col, Input, Row } from "antd"
import { useState } from "react"

export default FormularioDestinatario = (props) => {
    
    const [destinatario, setDestinatario] = useState({
        apellido: "",
        nombre: "",
        telefono: "",
    })

    const input_style = {
        backgroundColor: "ligth-blue"
    }

    const onSubmit = () => {

        if(destinatario.apellido.trim().length<1){
            alert("Apellido vacío")
            return;
        }
        if(destinatario.nombre.trim().length<1){
            alert("Nombre vacío")
            return;
        }
        
        post_method("", destinatario,(response)=>{
            props?.callback?.(response.insertId)
        })
    }

    return (<>
        <Row>
            <Col span={24}>
                <Input 
                    style={input_style}
                    value={destinatario.nombre} 
                    prefix={"Nombre "} 
                    onChange={(e)=>{setDestinatario(v=>({...v,nombre:e.target.value.toUpperCase()}))}} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Input 
                    style={input_style}
                    value={destinatario.apellido}
                    prefix={"Apellido "}
                    onChange={(e)=>{setDestinatario(v=>({...v,apellido:e.target.value.toUpperCase()}))}}
                />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Input 
                    style={input_style}
                    value={destinatario.telefono}
                    prefix={"Teléfono "}
                    onChange={(e)=>{setDestinatario(v=>({...v,telefono:e.target.value.toUpperCase()}))}}
                />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button onClick={onSubmit}></Button>
            </Col>
        </Row>
    </>)
}