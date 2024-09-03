import CategoriaSelect from "@/components/CategoriaSelect";
import SelectTag from "@/components/etiquetas/selectTag";
import { Button, Card, Col, Row } from "antd";
import { useState } from "react"

const FiltroBusquedaProductoEnvio = (props) => {
    const [filtros, setFiltros] = useState({
        categoria: -1,
        refId:-1,
        tags:[]
    })
    const row_style = {
        padding:"8px"
    }
    return <>
     <Row style={row_style}>
        <Col span={24}>
            <CategoriaSelect callback={(cat,id)=>{
                setFiltros(_f=>({..._f,categoria:cat, refId:id}))
            }} />
        </Col>
    </Row>

    <Row style={row_style}>
        <Col span={24}>
            <SelectTag callback={(t)=>{setFiltros(_f=>({..._f, tags:t}))}} />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Button block type="primary" onClick={()=>{
                alert(JSON.stringify(filtros))
                props?.callback?.(filtros)
            }}>Aplicar</Button>
        </Col>
    </Row>
    </>
}

export default FiltroBusquedaProductoEnvio;