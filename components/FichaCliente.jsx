import { get } from "@/src/urls"
import { Col, Input, Row, Spin, Table } from "antd"
import { useEffect, useState } from "react"
import CustomModal from "./CustomModal"
import CobroOperacion from "./forms/caja/CobroForm"
import CargaManual from "./forms/caja/CargaManual"

export default function FichaCliente(props){
    const [operaciones, setOperaciones] = useState([])
    const [dataCliente, setDataCliente] = useState(null)
    

    const columns = [
        {dataIndex: 'id',  title: 'Nro.'},
        {dataIndex: 'fecha',  title: 'Fecha'},
        {dataIndex: 'tipo',  title: 'Tipo'},
        {dataIndex: 'detalle',  title: 'Detalle'},
        {dataIndex: 'debe',  title: 'Debe'},
        {dataIndex: 'haber',  title: 'Haber'},
    ]

    const detalles_cliente =_ => dataCliente === null ? <Spin /> : <>
        <p>Nombre: <b>{dataCliente.nombre}</b> &nbsp;&nbsp;&nbsp;&nbsp; DNI: <b>{dataCliente.dni}</b></p>
        <p>Tel.: <b>{dataCliente.telefono1}</b> &nbsp;&nbsp;&nbsp;&nbsp; Dir.: <b>{dataCliente.direccion}</b></p>
    </>

    useEffect(()=>{

        //detalles
        fetch(get.cliente_por_id + props.idcliente)
        .then(response=>response.json())
        .then((response)=>{
            setDataCliente(response.data[0])
        })
        //operaciones
        fetch(get.operaciones_cliente + props.idcliente)
        .then(response=>response.json())
        .then((response)=>{
            setOperaciones(response.data)
        })
    },[])

    return (<>
    <h3>Ficha Cliente</h3>
    <Row>
        <Col span={24}>
            {detalles_cliente()}
        </Col>
    </Row>
    <Row>
        <Col span={24} style={{height:'400px', overflowY:'scroll'}}>
            <Table columns={columns} dataSource={operaciones} pagination={false} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input prefix={"Saldo"} readOnly={true} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <CustomModal openButtonText={"Cargar Pago Cuota"}><CobroOperacion idcliente={props.idcliente} /></CustomModal>
            <CargaManual idcliente={props.idcliente} />
        </Col>
    </Row>
    
    </>)
}