import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, Divider, Input, Row } from "antd";
import { useEffect, useState } from "react";

const ModifIngresoCaja = props =>{
    const {callback, selectedRow, idCajaOrigen} = props;
    const [modifIngreso, setModifIngreso] = useState({
        comentarios: "Transferencia de caja",
        montoSist: selectedRow.monto_efectivo,
        montoFisico: selectedRow.monto_efectivo,
        idCajaOrigen: selectedRow.idcaja,
        idCajaDestino: null,
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

    const row_style = {
        padding: "6px"
    };

    useEffect(()=>{
      //  alert(JSON.stringify(selectedRow))
    },[])

    return <>
    <Row style={row_style}>
        <Col span={24}>
            <Input readOnly value={modifIngreso.montoSist} prefix="Monto en Sistema: " placeholder="Monto registrado en el sistema" onChange={e => onChange("montoSist", e.target.value)} />    
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Input value={modifIngreso.montoFisico} prefix="Monto Físico: " placeholder="Monto registrado físicamente" type="number" onChange={e => onChange("montoFisico", e.target.value)} />    
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Input value={modifIngreso.comentarios} prefix="Comentarios: " placeholder="Comentarios sobre la modificación" type="text" onChange={e => onChange("comentarios", e.target.value)} />    
        </Col>
    </Row>
    <Divider />
    <Row style={row_style}>
        <Col span={24}>
            <Button type="primary" onClick={onSave}>Guardar</Button>
        </Col>
    </Row>
    </>
}

export default ModifIngresoCaja;