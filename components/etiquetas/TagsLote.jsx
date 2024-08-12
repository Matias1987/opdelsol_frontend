import {Button, Col, Input, Row} from "antd";
import SelectTag from "./selectTag";
import { useEffect, useState } from "react";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";

const TagsLote = (props) => {
    const [codigos, setCodigos] = useState([])
    const [etiquetas, setEtiquetas] = useState([])

    useEffect(()=>{
        setCodigos((props.codigos||[]).map(c=>({codigo: c.codigo, idcodigo:c.idcodigo})))
    },[])

    const guardar = () => {
       
        post_method(post.insert.tag_codigo,{
            codigos:codigos.map(c=>c.idcodigo),
            tags:etiquetas
        },
    (resp)=>{
        alert("OK")
        props?.callback?.()
    }
    )
    }

    const on_delete = () => {
        if(!confirm("Eliminar etiquetas? Esta acción no se puede deshacer."))
        {
            return
        }
        post_method(post.rem_t_c,{codigos:codigos.map(c=>c.idcodigo)},(resp)=>{
            alert("OK")
            props?.callback?.()
        })
    }


    return <>
        <Row style={{padding:"1em"}}>
            <Col span={24}>
                <i><span style={{fontSize:".95em", color:"darkblue"}}>C&oacute;digos:</span></i>
                <Input.TextArea 
                    style={{color:"#5555FF", backgroundColor:"lightgray"}}
                    rows={2} 
                    value={codigos.map(c=>c.codigo)}
                    readOnly
                />
            </Col>
        </Row>
        <Row style={{padding:"1em"}}>
            <Col span={24}>
                <Button block danger size="small" onClick={on_delete}>Borrar Etiquetas</Button>
            </Col>
        </Row>

        <Row style={{padding:"1em"}}>
            <Col span={24}>
                <SelectTag callback={(v)=>{setEtiquetas(v)}} />
            </Col>
        </Row>
        
        <Row style={{padding:"1em"}}>
            <Col span={24}>
                <Button block onClick={guardar}  type="primary" size="small">Guardar</Button>
            </Col>
        </Row>
    </>
}

export default TagsLote