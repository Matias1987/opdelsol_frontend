import { post_method } from "@/src/helpers/post_helper"
import { post } from "@/src/urls"
import {Row, Col, DatePicker, Input, Button} from "antd"
import { useState } from "react"
const SorteoForm = (props) => {
    const {callback} = props
    const [sorteo, setSorteo] = useState({
        fecha: "2024/12/21",
        comentarios:""
    })
    const onSave = _ => {
        post_method(post.insert.generar_sorteo, sorteo, (response)=>{
            alert("Datos guardados.")
            callback?.()
        })
    }

    const row_style = {padding:"8px"}

    return <>
        <Row style={row_style}>
            <Col span={24}>
                Fecha:&nbsp;
                <DatePicker />
            </Col>
        </Row>
        <Row style={row_style}>
            <Col span={24}>
                <Input prefix="Comentarios: " onChange={(e)=>{setSorteo(_s=>({..._s,comentarios:e.target.value}))}} />
            </Col>
        </Row>
        <Row style={row_style}>
            <Col span={24}>
                <Button onClick={onSave} block>Guardar</Button>
            </Col>
        </Row>
    </>
}


export default SorteoForm