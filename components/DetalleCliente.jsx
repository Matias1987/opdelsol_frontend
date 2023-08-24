import { Col, Row } from "antd";
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
    <Row>
        <Col span={"12"}>Apellido y nombre:</Col>
        <Col span={"12"}>{data.apellido + " " + data.nombre}</Col>
    </Row>
    <Row>
        <Col span={"12"}>DNI:</Col>
        <Col span={"12"}>{data.dni}</Col>
    </Row>
    <Row>
        <Col span={"12"}>Tel&eacute;fono:</Col>
        <Col span={"12"}>{data.telefono}</Col>
    </Row>
    <Row>
        <Col span={"12"}>Direcci&oacute;n:</Col>
        <Col span={"12"}>{data.direccion}</Col>
    </Row>
    <Row>
        <Col span={"24"}>
            <SaldoCtaCte idcliente={data.idcliente} />
        </Col>
    </Row>
    </>
}

export default DetalleCliente;