import { Col, Divider, Row, Table, Tag } from "antd";
import SaldoCtaCte from "./SaldoCtaCte";
import { useEffect, useState } from "react";
import { get } from "@/src/urls";
import VentaDetallePopup from "./VentaDetalle";

const DetalleCliente = (props) =>
{
    const [data, setData] = useState(null)
    const [ventas, setVentas] = useState([])
    const columns = [
        {dataIndex: "idventa", title: "Nro."},
        {dataIndex: "sucursal", title: "Sucursal"},
        {dataIndex: "tipo", title: "Tipo"},
        {dataIndex: "fecha", title: "Fecha"},
        {dataIndex: "idventa", title:"", render:(_,{idventa})=>{
            return <><VentaDetallePopup idventa={idventa} /></>
        }}
    ]
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
                idcliente: response.data[0].idcliente,
                bloqueado: response.data[0].bloqueado,
            })
        })
       // alert(get.cliente_ventas_gral + props.idcliente)
        fetch(get.cliente_ventas_gral + props.idcliente)
        .then(response=>response.json())
        .then((response)=>{
            setVentas(
                response.data.map(
                    r=>({
                        idventa: r.idventa,
                        sucursal: r.sucursal,
                        tipo: r.tipo,
                        fecha: r.fecha_f,

                    })
                )
            )
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
    {
        data.bloqueado==1 ? <><Row><Col span={24}> <Tag color="red">BLOQUEADO</Tag> </Col></Row></>:<></>
    }
    <Row>
        <Col span={"24"}>
            <span style={{color:"blueviolet"}}><SaldoCtaCte idcliente={data.idcliente} /></span>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Table dataSource={ventas} columns={columns} />
        </Col>
    </Row>
    </>
}

export default DetalleCliente;