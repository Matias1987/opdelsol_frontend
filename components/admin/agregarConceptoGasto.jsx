import { post_method } from "@/src/helpers/post_helper";
import { Button, Col, Input, Row } from "antd";
import { useState } from "react";

const AgregarConceptoGastoForm = (props) => {
    const [concepto, setConcepto]  = useState({
        nombre: ""
    })
    return <>
    <Row>
        <Col span={24}>
            <h2>Agregar Concepto Gasto</h2>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input 
            value={concepto.nombre}
            prefix="Nombre" 
            onChange={
                (e)=>{
                    setConcepto(_b=>({..._b,nombre:e.target.value}))
                }
            } />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Button onClick={()=>{
                if(concepto.nombre.trim().length<1){
                    return
                }
                post_method("",concepto,(response)=>{
                    alert("Agregado")
                })
            }}>Guardar</Button>
        </Col>
    </Row>
    </>
}

export default AgregarConceptoGastoForm;