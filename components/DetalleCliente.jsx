import { Col, Divider, Row } from "antd";
import SaldoCtaCte from "./SaldoCtaCte";
import { useEffect, useState } from "react";
import { get } from "@/src/urls";

const DetalleCliente = (props) =>
{
    const [data, setData] = useState(null)
    useEffect(()=>{
        fetch(get.cliente_por_id + props.idcliente)
        .then(response=>response.json())
        .then((response)=>{
            setData({
                nombre: response.data[0].nombre,
                apellido: response.data[0].apellido,
                dni: response.data[0].dni,
                telefono: response.data[0].telefono1,
                direccion: response.data[0].direccion,
                idcliente: response.data[0].idcliente
            })
        })
    },[])
    return data == null ? <></>:
     <>
     <Divider />
    <Row>
        <Col span={"6"}>Apellido y nombre:</Col>
        <Col span={"12"}><b>{data.apellido + " " + data.nombre}</b></Col>
    </Row>
    <Row>
        <Col span={"6"}>DNI:</Col>
        <Col span={"12"}><b>{data.dni}</b></Col>
    </Row>
    <Row>
        <Col span={"6"}>Tel&eacute;fono:</Col>
        <Col span={"12"}><b>{data.telefono}</b></Col>
    </Row>
    <Row>
        <Col span={"6"}>Direcci&oacute;n:</Col>
        <Col span={"12"}><b>{data.direccion}</b></Col>
    </Row>
    <Row>
        <Col span={"24"}>
            <span style={{color:"blueviolet"}}><SaldoCtaCte idcliente={data.idcliente} /></span>
        </Col>
    </Row>
    </>
}

export default DetalleCliente;