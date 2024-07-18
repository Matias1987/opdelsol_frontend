import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, Input, Row } from "antd";
import { useState } from "react";

const AgregarCMProveedor = (props) => {
    const [enabled, setEnabled] = useState(true)
    const [cargaManual, setCargaManual] = useState({
        monto:0,
        comentarios:""
    })

    const guardar = _ => {
        //alert(JSON.stringify({...cargaManual, modo:props.modo, fk_proveedor: props.idproveedor }))
        
        setEnabled(false)
        post_method(post.insert.cm_proveedor,{...cargaManual, modo:props.modo, fk_proveedor: props.idproveedor },()=>{
            alert("OK")
            props?.callback?.()
        })
    }


    return <>
    <Row>
        <Col span={24}>
        </Col>
    </Row>
    <Row style={{padding:"1em"}}>
        <Col span={24}>
            <Input prefix="Monto" value={cargaManual.monto} onChange={(e)=>{setCargaManual(cm=>({...cm,monto:parseFloat(e.target.value)}))}} />
        </Col>
    </Row>
    <Row style={{padding:"1em"}}>
        <Col span={24}>
            <Input prefix="Comentarios" value={cargaManual.comentarios} onChange={(e)=>{setCargaManual(cm=>({...cm,comentarios:e.target.value||""}))}} />
        </Col>
    </Row>
    <Row style={{padding:"1em"}}>
        <Col span={24}>
            <Button block type="primary" onClick={guardar} disabled={!enabled}>Agregar</Button>
        </Col>
    </Row>
    </>
}

export default AgregarCMProveedor;