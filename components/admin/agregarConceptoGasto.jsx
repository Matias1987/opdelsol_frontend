import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, Input, Row } from "antd";
import { useState } from "react";

const AgregarConceptoGastoForm = (props) => {
    const {callback} = props
    const [concepto, setConcepto]  = useState({
        nombre: ""
    })
    return <>
    <Row>
        <Col span={24}>
            <Input 
            value={concepto.nombre}
            prefix="Nombre" 
            onChange={
                (e)=>{
                    setConcepto(_b=>({..._b,nombre:(e.target.value||"").toLocaleUpperCase()}))
                }
            } />
        </Col>
    </Row>
    <Row>
        <Col span={24} style={{display:"flex",justifyContent:"flex-end"}}>
            <Button type="primary" onClick={()=>{
                if(concepto.nombre.trim().length<1){
                    return
                }
                
                post_method(post.insert.concepto_gasto,concepto,(response)=>{
                    alert("Agregado")
                    callback?.();

                })
            }}>Guardar</Button>
        </Col>
    </Row>
    </>
}

export default AgregarConceptoGastoForm;