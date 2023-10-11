import globals from "@/src/globals"
import { post_method } from "@/src/helpers/post_helper"
import { post } from "@/src/urls"
import { useEffect, useState } from "react"

const { default: Comentario } = require("@/components/comentario")
const { Row, Col, Modal, Divider, Button } = require("antd")

const CargaBloqueo = (props) => {
    const [open, setOpen] = useState(false)
    const [bloqueo, setBloqueo] = useState(null)

    useEffect(()=>{
        setBloqueo({
            idusuario: globals.obtenerUID(),
            comentario: "",
            idsucursal: globals.obtenerSucursal(),
            idcliente: props.idcliente,
        })
    },[])

    const onUpdate = (data) => {
        
        setBloqueo(b=>{
            const _b = { ...b, comentario: data.comentario}
            return _b
        })
    }

    const onSubmit = _ => {
        post_method(post.update.bloquear_cliente,bloqueo,(response)=>{
            setOpen(false)
            props?.callback?.()
        })

    }

    return <>
    <Button type="primary" size="small" danger onClick={()=>{setOpen(true)}}>Bloquear Usuario</Button>
    <Modal destroyOnClose open={open} onCancel={()=>{setOpen(false)}} footer={false} title={"Carga Bloqueo"}>
        <Row>
            <Col span={24}>
                <Comentario  callback={onUpdate} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Divider />
                <Button block type="primary" onClick={onSubmit}>Guardar</Button>
            </Col>
        </Row>
    </Modal>
    
    </>
}

export default CargaBloqueo;