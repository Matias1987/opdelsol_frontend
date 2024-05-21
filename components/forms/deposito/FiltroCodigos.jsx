import CategoriaSelect from "@/components/CategoriaSelect"
import { Button, Col, Input, Row } from "antd"
import { useState } from "react"

const   FiltroCodigos = (props) => {
    const [applyPending, setApplyPending] = useState(false)
    const [filtros, setFiltros] = useState({
        idfamilia:"-1",
        idsubfamilia:"-1",
        idgrupo:"-1",
        idsubgrupo:"-1",
        codigo:""
    })
    const callback = (cat,id)=>{
        setApplyPending(true)
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
        <Col span={1} style={{writingMode:"vertical-lr"}}>
            <b>Filtros</b>
        </Col>
        <Col span={23}>
            <Row>
                <Col span={24}>
                    <CategoriaSelect callback={callback} />
                </Col>
            </Row>
            <Row>
                <Col span={18}>
                    <Input allowClear prefix="Codigo: " style={{backgroundColor:"lightblue"}} value={filtros.codigo}  onChange={(e)=>{setApplyPending(true); onCodigoChange((e.target.value||""))}}/>
                </Col>
                <Col span={6}>
                    <Button block disabled={!applyPending} type={"primary"}  onClick={()=>{
                        setApplyPending(false)
                        props?.callback?.(filtros)
                    }}>Aplicar</Button>
                </Col>
            </Row>
        </Col>
    </Row>
    


    
    
    </div>
}

export default FiltroCodigos