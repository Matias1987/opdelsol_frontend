import { post_method } from "@/src/helpers/post_helper";
import { Button, Col, Input, Row, Select } from "antd";
import { useState } from "react";

const AgregarSucursal = (props) => {

    const [opticas, setOpticas] = useState([])

    const [sucursal, setSucursal] = useState({
        id: "",
        nombre_empresa: "",
        alias: "",
        telefono: "",
        whatsapp: "-",
        instagram: "-",
        direccion: "-",
        localidad: -1
    })


    const agregar = () => {
        post_method("",sucursal,(resp)=>{

            props?.callback?.()
        })
    }

    const row_style = {padding:"1em"}

    return <>
    <Row style={row_style}>
        <Col span={24}>
            <Input prefix="Nombre" value={sucursal.nombre_empresa} />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Input prefix="Alias" value={sucursal.alias} />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Input prefix="ID" placeholder="identificador unico" value={sucursal.id} />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Input prefix="Teléfono" value={sucursal.telefono} />
        </Col>
    </Row>
    <Row>
        <Col span={3}>
            &Oacute;ptica:
        </Col>
        <Col span={24}>
            <Select options={opticas} />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Button onClick={agregar} block type="primary">
                Agregar
            </Button>
        </Col>
    </Row>
    </>
}

export default AgregarSucursal;