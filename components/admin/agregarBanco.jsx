import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, Input, Row } from "antd";
import { useState } from "react";

const AgregarBancoForm  = (props) => {
    const [banco, setBanco] = useState({
        nombre: ""
    })

    return <>
    <Row>
        <Col span={24}>
            <h3>Agregar Banco</h3>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input 
            value={banco.nombre}
            prefix="Nombre" 
            onChange={
                (e)=>{
                    setBanco(_b=>({..._b,nombre:e.target.value}))
                }
            } />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Button onClick={()=>{
                if(banco.nombre.trim().length<1){
                    return
                }
                post_method(post.insert.banco,banco,(response)=>{
                    alert("Banco agregado")
                    props?.callback?.()
                })
            }}
            type="primary"
            >Guardar</Button>
           
        </Col>
    </Row>
    
    </>
}

export default AgregarBancoForm;