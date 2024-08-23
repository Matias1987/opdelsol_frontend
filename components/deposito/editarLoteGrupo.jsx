import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, Input, Row } from "antd";
import SubFamiliaSelect from "../SubFamiliaSelect";
import { useEffect, useState } from "react";
/**
 * 
 * @param grupos
 * 
 */
const EditarLoteGrupo = (props) => {
    const [selectedSubfamiliaId, setSelectedSubfamiliaId] = useState(-1)
    const [grupos, setGrupos] = useState([])

    useEffect(()=>{
        setGrupos(props.grupos)
        if((props.grupos||[]).length<1)
            {
                alert("Lista de grupos vacía")
                props?.callback?.()
            }
    },[])

    const aplicarCambios = _=>{
        post_method(post.update.mover_grupos,{ids:grupos.map(i=>i.idgrupo), idsubfamilia: selectedSubfamiliaId},(resp)=>{
            alert("Hecho.")
            props?.callback?.(resp)
        })
    }

    const row_style= {
        padding:"6px"
    }

    return <>

    <Row style={row_style}>
        <Col span={24}>
            <Input.TextArea rows={4} value={grupos.map(g=>g.nombre_corto)} readOnly />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            Sub Familia a Cambiar:
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
        <SubFamiliaSelect callback={(id)=>{setSelectedSubfamiliaId(id)}} />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Button onClick={()=>{aplicarCambios()}}>Aplicar Cambios</Button>
        </Col>
    </Row>
    </>
}

export default EditarLoteGrupo;