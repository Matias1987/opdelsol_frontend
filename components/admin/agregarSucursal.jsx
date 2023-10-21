import { Col, Input, Row } from "antd";
import { useState } from "react";

const AgregarSucursal = (props) => {

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

    return <>
    <Row>
        <Col>
            <Input prefix="Nombre Empresa" value={sucursal.nombre_empresa} />
        </Col>
        <Col>
            <Input prefix="Alias" value={sucursal.alias} />
        </Col>
        <Col>
            <Input prefix="ID" placeholder="identificador unico" value={sucursal.id} />
        </Col>
        <Col>
            <Input prefix="Teléfono" value={sucursal.telefono} />
        </Col>
        <Col>
        
        </Col>
        
        

    </Row>
    </>
}

export default AgregarSucursal;