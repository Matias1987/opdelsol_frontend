import { get } from "@/src/urls"
import { Col, Input, Row, Spin, Table } from "antd"
import { useEffect, useRef, useState } from "react"
import CustomModal from "./CustomModal"
import CobroOperacion from "./forms/caja/CobroForm"
import CargaManual from "./forms/caja/CargaManual"

export default function FichaCliente(props){
    const [operaciones, setOperaciones] = useState([])
    const [dataCliente, setDataCliente] = useState(null)
    const [dataChange, setDataChange] = useState(true)
    const [scrollChange, setScrollChange] = useState(false)
    const dummyref = useRef(null)
    

    const columns = [
        {dataIndex: 'id',  title: 'Nro.'},
        {dataIndex: 'fecha_f',  title: 'Fecha'},
        {dataIndex: 'tipo',  title: 'Tipo'},
        {dataIndex: 'detalle',  title: 'Detalle'},
        {dataIndex: 'debe',  title: 'Debe'},
        {dataIndex: 'haber',  title: 'Haber'},
    ]

    const detalles_cliente =_ => dataCliente === null ? <Spin /> : <>
        <p>Nro.: <b>{dataCliente.idcliente}</b>&nbsp;&nbsp;Nombre: <b>{dataCliente.nombre}</b> &nbsp;&nbsp;&nbsp;&nbsp; DNI: <b>{dataCliente.dni}</b></p>
        <p>Tel.: <b>{dataCliente.telefono1}</b> &nbsp;&nbsp;&nbsp;&nbsp; Dir.: <b>{dataCliente.direccion}</b></p>
    </>

    useEffect(()=>{
        if(dataChange){
            setDataChange(false)
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
                setScrollChange(true)
            })
        }
        if(scrollChange){
            dummyref.current?.scrollIntoView({ behavior: "smooth" })
            setScrollChange(false)
            //alert("scroll?")
        }

    },[dataChange, scrollChange])

    return (<>
    <h3>Ficha Cliente</h3>
    <Row>
        <Col span={24}>
            {detalles_cliente()}
        </Col>
    </Row>
    <Row>
        <Col span={24} style={{height:'350px', overflowY:'scroll', width:'100%'}}>
            
                {<Table columns={columns} dataSource={operaciones} pagination={false} />}
                
                
                <div ref={dummyref}>dummy</div>
           
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input prefix={"Saldo"} readOnly={true} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <CobroOperacion totalsHidden={true} tipo="cuota" idcliente={props.idcliente}  callback={()=>{setDataChange(true)}} />
            <CargaManual idcliente={props.idcliente} callback={()=>{setDataChange(true)}} />
        </Col>
    </Row>
    
    </>)
}