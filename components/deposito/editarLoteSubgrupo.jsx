import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import GrupoSelect from "../GrupoSelect";
/**
 * 
 * @param subgrupos 
 * 
 */
const EditarLoteSubgrupo = (props) => {
    const [subgrupos, setSubgrupos] = useState([])
    const [selectedGrupo, setSelectedGrupo] = useState(-1)

    useEffect(()=>{
        setSubgrupos(props.subgrupos)
        if((props.subgrupos||[]).length<1)
        {
            alert("Lista de subgrupos vacía")
            props?.callback?.()
        }
    },[])

    const onAplicar = _ => {
        post_method(post.update.mover_subgrupos,
            {ids:subgrupos.map(sg=>(sg.idsubgrupo)), targetId:selectedGrupo},
            (resp)=>{
                alert("Hecho")
                props?.callback?.(resp)
            }
        )
    }

    const row_style = {
        padding:"6px"
    }

    return <>
    <Row>
        <Col span={24}>
        
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Input.TextArea value={subgrupos.map(sg=>sg.nombre_corto)} />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            Grupo Destino: 
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <GrupoSelect callback={(id)=>{setSelectedGrupo(id)}} />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Button disabled={subgrupos.length<1} onClick={onAplicar} type="primary">Aplicar Cambios</Button>
        </Col>
    </Row>
    
    <Row>
        <Col span={24}>
        
        </Col>
    </Row>
    </>
}

export default EditarLoteSubgrupo;