import { post_method } from "@/src/helpers/post_helper"
import { post } from "@/src/urls"
import { Button, Col, Input, Row } from "antd"
import { useEffect, useState } from "react"

const TagForm = (props) => {
    const [categorias, setCategorias] = useState([])
    const [tag, setTag] = useState({
        etiqueta:""
    })

    const guardar = () => {
        post_method(post.insert.tag,tag,(resp)=>{
            alert("OK")
        })
    }


    const load = () => {
        fetch(post.lista_categoria_tag)
        .then(r=>r.json())
        .then(response=>{
            setCategorias(c=>[
                ...[{value:"-2", label:"Agregar Categoria"},{value:"-1", label:"-"}],
                response.date.map(c=>({value:c.id, label:c.nombre}))
            ])
        })
    }

    useEffect(()=>{
        load()
    },[])

    return <>
        <Row>
            <Col span={24}>
                
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Input prefix="Etiqueta: " onChange={(e)=>{
                    setTag(_t=>({..._t,etiqueta:e.target.value}))
                }} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button onClick={guardar}>Guardar</Button>
            </Col>
        </Row>
    </>
}

export default TagForm;