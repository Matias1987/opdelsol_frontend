import { post_method } from "@/src/helpers/post_helper"
import { post } from "@/src/urls"
import { Button, Col, Input, Modal, Row, Select } from "antd"
import { useEffect, useState } from "react"
import CategoriaForm from "./categoriaForm"

const TagForm = (props) => {
    const [reload, setReload] = useState(false)
    const [popupCategoriasOpen, setPopupCategoriasOpen] = useState(false)
    const [categorias, setCategorias] = useState([])
    const [tag, setTag] = useState({
        fkcategoria:"-1",
        etiqueta:""
    })

    const guardar = () => {
        post_method(post.insert.tag,tag,(resp)=>{
            alert("OK")
            props?.callback?.()
        })
    }


    const load = () => {
        //alert(post.lista_categoria_tag)
        fetch(post.lista_categoria_tag)
        .then(r=>r.json())
        .then(response=>{
            
            setCategorias(c=>[
                ...[{value:"-2", label:"Agregar Categoria"},{value:"-1", label:"-"}],
                ...response.data.map(c=>({value:c.id, label:c.nombre}))
            ])
        })
    }

    useEffect(()=>{
        load()
    },[reload])

    return <>
        <Row>
            <Col span={24}>
                <Select 
                options={categorias} 
                style={{width:"100%"}} 
                onChange={(v)=>{
                    if(+v<-1)
                    {
                        setPopupCategoriasOpen(true)
                        return   
                    }
                    setTag(t=>({...t,fkcategoria:v}))
                }}
                />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Input prefix="Etiqueta: " maxLength={8} onChange={(e)=>{
                    setTag(_t=>({..._t,etiqueta:e.target.value}))
                }} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button block onClick={guardar}>Guardar</Button>
            </Col>
        </Row>
        <Modal 
        footer={null}
        open={popupCategoriasOpen} 
        title="Agregar Categoria"
        onCancel={()=>{setPopupCategoriasOpen(false)}}
        >
                <CategoriaForm callback={()=>{
                    setPopupCategoriasOpen(false)
                    setReload(!reload)
                }
                    } />
        </Modal>


    </>
}

export default TagForm;