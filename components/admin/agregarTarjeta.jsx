import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, Input, Row } from "antd";
import { useState } from "react";

const AgregarTarjetaForm = (props) => {
    const [tarjeta, setTarjeta] = useState({nombre:""})
    return <>
    <Row>
        <Col span={24}>
            <h3>Formulario Tarjeta</h3>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
        <Input prefix="Nombre: " 
        value={tarjeta.nombre}
        onChange={(e)=>{
            setTarjeta(t=>({...t,nombre:(e.target.value||"").toLocaleUpperCase()}))
        }} />
        </Col>
    </Row>
    
    <Row>
        <Col span={24} style={{padding:"1em"}}>
            <Button type="primary" onClick={()=>{
                post_method(post.insert.tarjeta,tarjeta,()=>{
                    alert("OK")
                    props?.callback?.()
                })
            }}>Agregar</Button>
            
        </Col>
    </Row>
    <Row>
        <Col span={24}>
        </Col>
    </Row>
    </>
}

export default AgregarTarjetaForm;