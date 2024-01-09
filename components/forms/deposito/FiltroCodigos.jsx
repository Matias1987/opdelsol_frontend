import CategoriaSelect from "@/components/CategoriaSelect"
import SubGroupSelect from "@/components/SubGroupSelect"
import { Col, Input, Row } from "antd"
import { useState } from "react"

const FiltroCodigos = (props) => {
    const [filtros, setFiltros] = useState({
        categoria: "",
        idcategoria: -1,
        codigo:""
    })
    const callback = (cat,id)=>{}
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
            <Input prefix="Codigo" />
        </Col>
    </Row>

    
    
    </div>
}

export default FiltroCodigos