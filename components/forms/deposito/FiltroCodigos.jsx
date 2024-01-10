import CategoriaSelect from "@/components/CategoriaSelect"
import SubGroupSelect from "@/components/SubGroupSelect"
import { Button, Col, Input, Row } from "antd"
import { useState } from "react"

const FiltroCodigos = (props) => {
    const [filtros, setFiltros] = useState({
        idfamilia:"-1",
        idsubfamilia:"-1",
        idgrupo:"-1",
        idsubgrupo:"-1",
        codigo:""
    })
    const callback = (cat,id)=>{
        setFiltros(f=>({
            ...f,
            idfamilia:cat=='familia'?id:'-1',
            idsubfamilia:cat=='subfamilia'?id:'-1',
            idgrupo:cat=='grupo'?id:'-1',
            idsubgrupo:cat=='subgrupo'?id:'-1',
        }))
    }

    const onCodigoChange = (v) => {
        setFiltros(f=>({...f,codigo:v}))
    }

    return <div >
    <Row>
        <Col span={24}>
            <h3>Filtros</h3>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <CategoriaSelect callback={callback} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input prefix="Codigo" onChange={(e)=>{onCodigoChange(e.target.value)}}/>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Button block type="primary" size="small" onClick={()=>{
                props?.callback?.(filtros)
            }}>Aplicar</Button>
        </Col>
    </Row>

    
    
    </div>
}

export default FiltroCodigos