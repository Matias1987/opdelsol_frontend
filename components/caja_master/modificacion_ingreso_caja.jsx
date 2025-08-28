import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, Input, Row } from "antd";
import { useState } from "react";

const ModifIngresoCaja = props =>{
    const {callback} = props;
    const [modifIngreso, setModifIngreso] = useState({
        comentarios: "",
        montoSist: 0,
        montoFisico: 0,
    });

    const onSave = _ =>{    
        alert(JSON.stringify(modifIngreso))

        post_method(post.insert.modificacion_ingreso_caja, modifIngreso, response=>{
            alert("Datos Guardados");
            callback?.();

        })

    }

    const onChange = (field, value) => {
        setModifIngreso({
            ...modifIngreso,
            [field]: value
        });
    }

    return <>
    <Row>
        <Col span={24}>
            <Input value={modifIngreso.montoSist} prefix="Monto en Sistema: " placeholder="Monto registrado en el sistema" type="number" onChange={e => onChange("montoSist", e.target.value)} />    
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input value={modifIngreso.montoFisico} prefix="Monto Físico: " placeholder="Monto registrado físicamente" type="number" onChange={e => onChange("montoFisico", e.target.value)} />    
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input value={modifIngreso.comentarios} prefix="Comentarios: " placeholder="Comentarios sobre la modificación" type="text" onChange={e => onChange("comentarios", e.target.value)} />    
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Button type="primary" onClick={onSave}>Guardar Modificación</Button>
        </Col>
    </Row>
    </>
}

export default ModifIngresoCaja;