import { post_method } from "@/src/helpers/post_helper"
import { post } from "@/src/urls"
import {Row, Col, DatePicker, Input, Button} from "antd"
import { useState } from "react"
const SorteoForm = (props) => {
    const {callback} = props
    const [sorteo, setSorteo] = useState({
        fecha: "",
        comentarios:""
    })
    const onSave = _ => {
        post_method(post.insert.generar_sorteo, sorteo, (response)=>{
            alert("Datos guardados.")
            callback?.()
        })
    }

    return <>
        <Row>
            <Col span={24}>
                Fecha
                <DatePicker />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Input prefix="Comentarios: " />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button onClick={onSave}>Guardar</Button>
            </Col>
        </Row>
    </>
}


export default SorteoForm