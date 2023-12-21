import { post_method } from "@/src/helpers/post_helper"
import { get, post } from "@/src/urls"

const { default: PrinterWrapper } = require("@/components/PrinterWrapper")
const { Row, Col, Select, Input, Table, Button } = require("antd")
const { useState, useEffect } = require("react")

const InformeVentasTotales = () => {
    const [filtros, setFiltros] = useState({
        mes: 0,
        anio: 0,
        idsucursal: -1,
    })

    const [sucursales, setSucursales] = useState([])

    const [dataSource, setDatasource] = useState([])

    const columns = [ 
        {dataIndex: 'idVenta', title: "Nro."},
        {dataIndex: 'fecha', title: "Fecha"},
        {dataIndex: 'detalle', title: "Detalle"},
        {dataIndex: 'vendedor', title: "Vendedor"},
        {dataIndex: 'monto', title: "Monto"},
        { title: "Acciones", render:(_,{idventa})=>{
            return <></>
        }},

    ]
    useEffect(()=>{
        /** get sucursales list */
        fetch(get.sucursales)
        .then(r=>r.json())
        .then((response)=>{
            setSucursales(response.data.map(r=>({
                value: r.idsucursal,
                label: r.nombre
            })))
        })
    })

    const aplicar_filtros = () => {
        post_method(
            post.totales_venta_vendedor,
            filtros,
            (response)=>{
                setDatasource(
                    response.data.map(
                        r=>(
                            {
                                idventa: r.idventa,
                                fecha: r.fecha,
                                detalle: r.detalle,
                                vendedor: r.vendedor,
                                monto: r.monto,
                            }
                        )
                    )
                )
            }
        )
    }

    return <>
        <Row>
            <Col span={8}>
                Sucursal: <Select options={sucursales} onChange={(v)=>{setFiltros(f=>({...f,idsucursal: v}))}} />
            </Col>
            <Col span={8}>
                <Input prefix="Año" onChange={(e)=>{setFiltros(f=>({...f,anio:e.target.value}))}} value={filtros.anio} />
            </Col>
            <Col span={8}>
                <Input prefix="Mes" onChange={(e)=>{setFiltros(f=>({...f,mes:e.target.value}))}} value={filtros.mes} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button block onClick={aplicar_filtros}>Aplicar Filtros</Button>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <PrinterWrapper>
                    <Table columns={columns} dataSource={dataSource} />
                </PrinterWrapper>
            </Col>
        </Row>
    </>
}

export default InformeVentasTotales;