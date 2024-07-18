import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, Input, Row } from "antd";
import { useState } from "react";

const AgregarPagoProveedor = (props) => {
    const [enabled, setEnabled] = useState(true)
    const [pago, setPago] = useState({
        monto:0
    })
    const guardar_click = () =>
    {
        //alert(JSON.stringify({...pago,  modo:props.modo, fk_proveedor: props.idproveedor }))
        
        setEnabled(false)
        post_method(post.insert.pago_proveedor,{...pago,  modo:props.modo, fk_proveedor: props.idproveedor },(resp)=>{
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
                <Input prefix="Monto" value={pago.monto} onChange={(e)=>{ setPago(  p=>({ ...p, monto: parseFloat(e.target.value.trim()||"0")    })  )  }} />
            </Col>
        </Row>
        <Row style={{padding:"1em"}}>
            <Col span={24}>
                <Button type="primary" block onClick={guardar_click} disabled={!enabled}>Agregar</Button>
            </Col>
        </Row>
    </>
}

export default AgregarPagoProveedor;