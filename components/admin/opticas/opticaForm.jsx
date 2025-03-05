import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, Input, Row } from "antd";
import { useState } from "react";

const OpticaForm = (props) => {
    const [optica, setOptica] = useState({
        nombre:"",
    })

    const onSave = () => {
        if(optica.nombre.trim().length<1)
        {
            alert("Campo Nombre Vacío")
            return
        }
        post_method(
            post.insert.optica,
            {...optica, fkusuario:globals.obtenerUID()},
            (resp)=>{
                alert(JSON.stringify(resp))
                if((resp?.data?.message||"")=="ERR")
                {
                    alert("Error. Ya existe.")
                }
               
                props?.callback?.(resp)
            }
        
        )
    }

    return <>
    <Row>
        <Col span={24}>
            <Input value={optica.nombre} onChange={(e)=>{
                setOptica(o=>({...o,nombre:(e.target.value||"")}))
            }}/>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Button type="primary" block onClick={onSave}>Guardar</Button>
        </Col>
    </Row>
    </>
}

export default OpticaForm;