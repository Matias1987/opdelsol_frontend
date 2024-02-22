import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { Button, Col, Divider, Input, Row, Select, Space, Table } from "antd";
import { useEffect, useState } from "react";
import VentaDetallePopup from "../VentaDetalle";
import InformeUsuarioGraphVentas from "./InformeUsuarioGraphVentas";

const ListaVentasDia = (props) => {

    const [ventas, setVentas] = useState([])
    const [idusuarioGraph, setIdUsuarioGraph] = useState(-1)
    const [total, setTotal] = useState(0)
    const [vendedores, setVendedores] = useState([])
    const [filtros, setFiltros] = useState({
        dia:0,
        mes:0,
        anio:0,
        idusuario:-1
    })
    const columns = [
        {dataIndex:"idventa", title:"Nro."},
        {dataIndex:"cliente", title:"Cliente"},
        {dataIndex:"estado", title:"Estado"},
        {dataIndex:"monto", title:"Monto"},
        {dataIndex:"sucursal", title:"Sucursal"},
        {dataIndex:"idventa", title:"", render:(_,{idventa})=>{
            return <><VentaDetallePopup idventa={idventa} /></>
        }},
    ]

    useEffect(()=>{
        const today = new Date()
        setFiltros(_f=>({..._f,dia:today.getDate(), mes:today.getMonth()+1, anio: today.getFullYear()}))
        //get lista vendedores
        fetch(get.lista_usuarios)
        .then(r=>r.json())
        .then((response)=>{
            const resp = (response?.data)||[]
            setVendedores(resp.map(r=>({label: r.nombre, value: r.idusuario})))
        })
    },[])

    const load = () => {
        post_method(post.venta_estado_sucursal,
            {
                idusuario: filtros.idusuario,
                fecha: `${filtros.anio}-${filtros.mes}-${filtros.dia}`,
            }
            ,(response)=>{
            const resp = (response?.data)||[]
            setVentas(resp.map(r=>({
                idventa: r.idventa,
                cliente: r.cliente,
                monto: r.monto,
                estado: r.estado,
                sucursal: r.sucursal,
            })))
            let t=0
            resp.forEach(r=>{
                t+=parseFloat(r.monto)
            })
            setTotal(t)
        })
    }

    const onChange = (idx,value) => {setFiltros(_f=>({..._f,[idx]:value}))}

    const aplicarFiltros = _ => {
        setIdUsuarioGraph(filtros.idusuario)
        load()
    }

    return <>
    <Row>
        <Col span={24}>
            <h3>Lista ventas d&iacute;a</h3>
        </Col>
    </Row>
    <Row>
        <Col span={2} style={{padding:".3em", textAlign:"right"}}>
            Vendedor: 
        </Col>
        <Col span={20}>
            <Select onChange={(v)=>{onChange("idusuario", v)}} options={vendedores} placeholder="Seleccione vendedor" style={{width:"300px"}} />
        </Col>
    </Row>
    
    <Row>
        <Col span={2} style={{padding:".3em", textAlign:"right"}}>Fecha:</Col>
        <Col span={20}>
            <Space direction="vertical" size="middle">
                <Space.Compact size="middle">
                    <Input value={filtros.dia} addonBefore={"Día"} onChange={(e)=>{onChange("dia", e.target.value)}} type="number"/>
                    <Input value={filtros.mes} addonBefore={"Mes"} onChange={(e)=>{onChange("mes", e.target.value)}} type="number"/>
                    <Input value={filtros.anio} addonBefore={"Año"} onChange={(e)=>{onChange("anio", e.target.value)}} type="number"/>
                </Space.Compact>
            </Space>
        </Col>
    </Row>
    <Row style={{padding:"0.5em"}}>
        <Col span={24}>
            <Button size="small" type="primary"  block onClick={aplicarFiltros}>Aplicar Filtros</Button>
        </Col>
    </Row>
    <Row>
        <Col span={18}>
            <Table dataSource={ventas} columns={columns} />
        </Col>
        <Col span={6}>

            <Input value={ventas.length} readOnly prefix="Cantidad:   " />
            <Input value={total} readOnly prefix="Total: $  " />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Divider />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <InformeUsuarioGraphVentas idusuario={idusuarioGraph} key={idusuarioGraph} />
        </Col>
    </Row>
    
        
    </>
}

export default ListaVentasDia;