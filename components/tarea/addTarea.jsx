import { post_method } from "@/src/helpers/post_helper"
import { post } from "@/src/urls"
import { Button, Col, Input, Row } from "antd"
import { useState } from "react"

const AddTarea = (props) => {
    const {callback} = props
    const [tarea, setTarea] = useState({nombre:"Control", descripcion:null, fk_parent:null, ref_id:null})
    const guardar = ()=>{
        //alert(post.insert.tarea_)
        //alert(JSON.stringify(tarea))
        
        post_method(post.insert.tarea_,tarea, (resp)=>{
            callback?.(resp)

        })
    }
    return <>
    <Row>
        <Col span={24}>
            <Input prefix="Tipo: " value={tarea.nombre} readOnly/>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input prefix="Detalle: " value={tarea.descripcion} onChange={(e)=>{setTarea(t=>({...t,descripcion:e.target.value||""}))}}/>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Button block type="primary" onClick={guardar}>Guardar</Button>
        </Col>
    </Row>
    </>
}

export default AddTarea