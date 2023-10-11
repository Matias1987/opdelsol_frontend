import globals from "@/src/globals"
import { useEffect, useState } from "react"

const { default: Comentario } = require("@/components/comentario")
const { Row, Col, Modal, Divider, Button } = require("antd")

const CargaBloqueo = _ => {
    const [open, setOpen] = useState(false)
    const [bloqueo, setBloqueo] = useState(null)

    useEffect(()=>{
        setBloqueo({
            idusuario: globals.obtenerUID(),
            comentario: "",
            idsucursal: globals.obtenerSucursal()
        })
    })

    const onUpdate = (data) => {
        setBloqueo(b=>{
            const _b = { ...b, comentario: data.comentario}
            return _b
        })
    }

    const onSubmit = _ => {

    }

    return <>
    <Modal open={open} onCancel={()=>{setOpen(false)}} footer={false} title={"Carga Bloqueo"}>
        <Row>
            <Col span={24}>
                <h3>Carga Bloqueo</h3>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Comentario  callback={onUpdate} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Divider />
                <Button block onClick={onSubmit}>Guardar</Button>
            </Col>
        </Row>
    </Modal>
    
    </>
}

export default CargaBloqueo;