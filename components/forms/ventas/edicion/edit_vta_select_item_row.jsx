import { useEffect, useState } from "react"
import SelectCodigoVenta from "../SelectCodigoVenta"
import { ArrowRightOutlined } from "@ant-design/icons"

const { Row, Col, Spin, Button, Input } = require("antd")

const EditableVtaItemRow = (props) => {

    const [enabled, setEnabled] = useState(false)

    const onCodigoSelect = (cod) => {
        setEnabled(!(cod.codigo==null))
    }

    const _codigo_ = _ =>
    
    <>
        <Row>
            <Col span={3} style={{padding:".5em"}}><b style={{color:"blue", fontSize:".75em"}}>{props.item.tipo}</b></Col>
            <Col span={6}>
                Cod.:&nbsp;<b>{props.item.codigo}</b>
            </Col>
            <Col span={5}>
                Esf:&nbsp;<b>{props.item.esf}</b>
            </Col>
            <Col span={5}>
                Cil:&nbsp;<b>{props.item.cil}</b>
            </Col>
            <Col span={5}>
                Eje:&nbsp;<b>{props.item.eje}</b>
            </Col>
        </Row>
    </>  
    return <div style={{border:"1px solid gray", padding:".3em"}}>
        <Row>
            <Col span={24}>
                <b>C&oacute;digo Actual</b>   
            </Col>
        </Row>
        <Row>
            <Col span={10}>
                {_codigo_()}
            </Col>
            <Col span={1}><ArrowRightOutlined style={{color:"green", fontSize:"2em"}}  /></Col>
            <Col span={13}>
                <Row>
                 
                    <Col span={6}><SelectCodigoVenta buttonText={"Sin Cambios"} callback={onCodigoSelect} /></Col>
                    <Col span={6}><Input disabled={!enabled} prefix="Esf" /></Col>
                    <Col span={6}><Input disabled={!enabled} prefix="Cil" /></Col>
                    <Col span={6}><Input disabled={!enabled} prefix="Eje" /></Col>
                </Row>
            </Col>
        </Row>
       
    </div>
}
export default EditableVtaItemRow