import globals from "@/src/globals"
import { post_method } from "@/src/helpers/post_helper"
import { post } from "@/src/urls"
import { useState } from "react"

const { Row, Col, Input, Button, Modal } = require("antd")

const LlamadaClienteForm = (props) => {
    const [open, setOpen] = useState(false)
    const [btnEnabled, setBtnEnabled] = useState(true)
    const [llamada, setLlamada] = useState({
        comentarios:"",
        fkcliente:props.idcliente,
        fksucursal: globals.obtenerSucursal(),
        fkusuario: globals.obtenerUID()
    })
    const onChangeComentario = (e) => {
        setLlamada(l=>({...l,comentarios:e.target.value}))
    }
    const guardar = () => {
        if((llamada.comentarios.trim()).length<1){
            alert("Campo comentarios vacio")
            return
        }

        setBtnEnabled(false)

        const url = post.insert.llamada_cliente
        
        post_method(url,llamada,()=>{
            alert("Registro agregado.")
            setOpen(false)
            props?.callback?.()
        })
    }
    return <>
        <Button block type="primary" onClick={()=>{setOpen(true); setBtnEnabled(true)}}>Agregar</Button>
        <Modal open={open} onCancel={()=>{setOpen(false)}} footer={null} title={"Agregar Registro Llamada"}>
            <Row style={{padding:".5em"}}>
                <Col span={24}>
                    <Input prefix="Comentarios:" style={{backgroundColor:"lightblue"}} onChange={onChangeComentario} />
                </Col>
            </Row>
            <Row style={{padding:".5em"}}>
                <Col span={24}>
                    <Button type="primary" disabled={!btnEnabled} block onClick={()=>{guardar()}}>Guardar</Button>
                </Col>
            </Row>
        </Modal>
    </>
}

export default LlamadaClienteForm