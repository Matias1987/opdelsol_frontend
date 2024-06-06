import { post_method } from "@/src/helpers/post_helper"
import { post } from "@/src/urls"
import { CheckOutlined, PlusOutlined } from "@ant-design/icons"
import { Row, Tag, Col, Select, Spin, Button, Modal } from "antd"
import { useEffect, useState } from "react"
import TagForm from "./tagForm"

const Tags = (props) => {
    const [codigo_tags, setCodigoTags] = useState([])
    const [tags, setTags] = useState([])
    const [modalAddOpen, setModalAddOpen] = useState(false)
    const [modalAddTagOpen, setModalAddTagOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)
    const [tagsToAdd, setTagsToAdd] = useState([])
    //const loadTags

    useEffect(()=>{load()},[reload])

    const load = () => {

        post_method(post.lista_tag,{fkcategoria:"-1"},(resp)=>{
            setTags(_=>resp.data.map(t=>({value:t.etiqueta, label:t.etiqueta})))
        })
        
        post_method(post.lista_tags_codigo,{idcodigo: props.idcodigo},(resp)=>{

            setCodigoTags(resp.data.map(t=>({nombre:t.fk_etiqueta})))
            setLoading(false)
        })
    }

    const on_agregar_tag_codigo=_=>{

        post_method(post.insert.tag_codigo,
            {
                codigos:[props.idcodigo], 
                tags:tagsToAdd
            },
            (resp)=>{
                //alert("OK")
                setModalAddOpen(false)

                setReload(!reload)
            }
            )
        
        
    }

    const on_agregar_tag =_=>{
        setModalAddOpen(false)
        setModalAddTagOpen(true)
    }


    return loading ? <Spin /> : <div style={{backgroundColor:"rgba(218,238,218,1)", padding:".75em", borderRadius:"8px"}}>
        <Row>
            <Col span={24}>
                <span>Etiquetas: </span>
                {codigo_tags.map(t=><Tag color="green-inverse">{t.nombre}</Tag>)}
                {"1" === (props.readOnly||"1") ? <></> : <Button onClick={()=>{setModalAddOpen(true)}}><PlusOutlined /></Button>  }
                
            </Col>
        </Row>
        <Modal open={modalAddOpen} onCancel={()=>{setModalAddOpen(false)}} footer={null} title="Agregar Etiqueta" destroyOnClose>
            <Row >
                <Col span={20}>
                    <Select 
                        style={{width:"100%"}}
                        mode="multiple" 
                        allowClear 
                        options={tags} 
                        onChange={(v)=>{
                           // alert(JSON.stringify(v))
                           setTagsToAdd(v)
                        }} 
                    /> 
                </Col>
                <Col span={2}>
                    <Button onClick={on_agregar_tag_codigo} style={{backgroundColor:"orange", }} block><CheckOutlined /></Button>
                </Col>
                <Col span={2}>
                    <Button onClick={on_agregar_tag} style={{backgroundColor:"green", }} block><PlusOutlined /></Button>
                </Col>
            </Row>
        </Modal>
        <Modal footer={null} open={modalAddTagOpen} title="Agregar Etiqueta" onCancel={()=>{setModalAddTagOpen(false)}}>
            <TagForm callback={()=>{setModalAddTagOpen(false); setReload(!reload); setModalAddOpen(true)}}/>
        </Modal>
    </div >
}

export default Tags