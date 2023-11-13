import { useEffect, useState } from "react"
import SelectCodigoVenta from "../SelectCodigoVenta"
import { ArrowRightOutlined } from "@ant-design/icons"

const { Row, Col, Spin, Button, Input } = require("antd")

const EditableVtaItemRow = (props) => {

    const [enabled, setEnabled] = useState(false)
    const [codigo, setCodigo] = useState({
        index:-1,
        codigo: null,
        cantidad: 1,
        esf: "0",
        cil: "0",
        eje: "0",
    })

    useEffect(()=>{
        setCodigo(c=>({...c,index:props.index}))
    },[])

    const onchange = ((idx,value)=>{
        setCodigo(c=>{
            const _t = {...c,[idx]:value}
            //props?.callback?.(_t)
            return _t
        })
    })

    const onCodigoSelect = (cod) => {
        setEnabled(!(cod.codigo==null))
        onchange("codigo",cod)
    }

    const _codigo_ = _ =>
    
    <>
        <Row>
            <Col span={4} style={{padding:".5em"}}>
                <b style={{color:"blue", fontSize:".75em"}}>{props.item.tipo}</b>
            </Col>
            <Col span={4}>
                Cod.:&nbsp;<b>{props.item.codigo}</b>
            </Col>
            <Col span={4}>
                Cant.:&nbsp;<b>{props.item.cantidad}</b>
            </Col>
            <Col span={4}>
                Esf:&nbsp;<b>{props.item.esf}</b>
            </Col>
            <Col span={4}>
                Cil:&nbsp;<b>{props.item.cil}</b>
            </Col>
            <Col span={4}>
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
                    <Col span={5}><SelectCodigoVenta
                    buttonText={"Sin Cambios"} callback={onCodigoSelect} /></Col>
                    <Col span={4}><Input onChange={(e)=>{onchange("cantidad",e.target.value)}} defaultValue={props.item.cantidad} disabled={!enabled} prefix="Cant" /></Col>
                    <Col span={4}><Input onChange={(e)=>{onchange("esf",e.target.value)}} disabled={!enabled} prefix="Esf" /></Col>
                    <Col span={4}><Input onChange={(e)=>{onchange("cil",e.target.value)}} disabled={!enabled} prefix="Cil" /></Col>
                    <Col span={4}><Input onChange={(e)=>{onchange("eje",e.target.value)}} disabled={!enabled} prefix="Eje" /></Col>
                </Row>
            </Col>
        </Row>
       
    </div>
}
export default EditableVtaItemRow