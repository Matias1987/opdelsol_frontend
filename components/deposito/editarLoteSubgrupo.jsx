import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import GrupoSelect from "../GrupoSelect";
/**
 * 
 * @param grupos 
 * 
 */
const EditarLoteSubgrupo = (props) => {
    const [subgrupos, setSubgrupos] = useState([])
    const [selectedGrupo, setSelectedGrupo] = useState(-1)

    useEffect(()=>{
        setSubgrupos(props.subgrupos)
    },[])

    const onAplicar = _ => {
        post_method(post.update.mover_subgrupos,
            {ids:subgrupos.map(sg=>(sg.idsubgrupo)), idgrupo:selectedGrupo},
            (resp)=>{
                alert("Hecho")
                props?.callback?.(resp)
            }
        )
    }
    return <>
    <Row>
        <Col span={24}>
        
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input.TextArea value={subgrupos.map(sg=>sg.nombre_corto)} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            Grupo a Cambiar: 
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <GrupoSelect callback={(id)=>{setSelectedGrupo(id)}} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Button onClick={onAplicar}>Aplicar Cambios</Button>
        </Col>
    </Row>
    
    <Row>
        <Col span={24}>
        
        </Col>
    </Row>
    </>
}

export default EditarLoteSubgrupo;