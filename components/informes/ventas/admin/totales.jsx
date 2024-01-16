import { post_method } from "@/src/helpers/post_helper"
import { currency_format, parse_int_string } from "@/src/helpers/string_helper"
import { get, post } from "@/src/urls"

const { default: PrinterWrapper } = require("@/components/PrinterWrapper")
const { Row, Col, Input, Table, Button, Divider } = require("antd")
const { useState, useEffect } = require("react")



const InformeVentasTotales = () => {
    const [filtros, setFiltros] = useState({
        mes: 1,
        anio: 2023,
        fkcliente: '-1',

    })

    useEffect(()=>{
        const d = new Date()
       
        setFiltros({
            mes: d.getMonth()+1,
            anio: d.getFullYear(),
            fkcliente: '-1',
        })
    },[])




    const [dataSource, setDatasource] = useState([])
    const [dataSourceSucursal, setDatasourceSucursal] = useState([])

    const money_style = {
        textAlign:"right",
    }

    const columns = [ 
        {dataIndex: 'usuario', title: "usuario"},
        {dataIndex: 'efectivo', title: "efectivo" , render:(_,{efectivo})=><div style={money_style}>{  currency_format(efectivo)  }</div>},
        {dataIndex: 'tarjeta', title: "tarjeta" , render:(_,{tarjeta})=><div style={money_style}>{  currency_format(tarjeta)  }</div>},
        {dataIndex: 'cheque', title: "cheque" , render:(_,{cheque})=><div style={money_style}>{  currency_format(cheque)  }</div>},
        {dataIndex: 'ctacte', title: "ctacte" , render:(_,{ctacte})=><div style={money_style}>{  currency_format(ctacte)  }</div>},
        {dataIndex: 'mutual', title: "mutual" , render:(_,{mutual})=><div style={money_style}>{  currency_format(mutual)  }</div>},
        {dataIndex: 'total', title: "total" , render:(_,{total})=><div style={money_style}>{   currency_format(total)  }</div>},
        { title: "", render:(_,{idusuario})=>{
            return <></>
        }},
    ]
    const columns_s = [ 
        {dataIndex: 'sucursal', title: "sucursal"},
        {dataIndex: 'efectivo', title: "efectivo" , render:(_,{efectivo})=><div style={money_style}>{  currency_format(efectivo)  }</div>},
        {dataIndex: 'tarjeta', title: "tarjeta" , render:(_,{tarjeta})=><div style={money_style}>{  currency_format(tarjeta)  }</div>},
        {dataIndex: 'cheque', title: "cheque" , render:(_,{cheque})=><div style={money_style}>{  currency_format(cheque)  }</div>},
        {dataIndex: 'ctacte', title: "ctacte" , render:(_,{ctacte})=><div style={money_style}>{  currency_format(ctacte)  }</div>},
        {dataIndex: 'mutual', title: "mutual" , render:(_,{mutual})=><div style={money_style}>{  currency_format(mutual)  }</div>},
        {dataIndex: 'total', title: "total" , render:(_,{total})=><div style={money_style}>{   currency_format(total)  }</div>},
        { title: "", render:(_,{idusuario})=>{
            return <></>
        }},
    ]
   
    const aplicar_filtros = () => {
        post_method(
            post.totales_venta_vendedor,
            filtros,
            (response)=>{
                setDatasource(
                    response.data.map(
                        r=>(
                            {
                                usuario: r.usuario,
                                idusuario: r.usuario_idusuario,
                                efectivo: r.efectivo,
                                tarjeta: r.tarjeta,
                                cheque: r.cheque,
                                ctacte: r.ctacte,
                                mutual: r.mutual,
                                total: r.total,
                            }
                        )
                    )
                )
            }
        )
        post_method(
            post.totales_venta_sucursal,
            filtros,
            (response)=>{
                setDatasourceSucursal(
                    response.data.map(
                        r=>(
                            {
                                sucursal: r.sucursal,
                                idsucursal: r.sucursal_idsucursal,
                                efectivo: r.efectivo,
                                tarjeta: r.tarjeta,
                                cheque: r.cheque,
                                ctacte: r.ctacte,
                                mutual: r.mutual,
                                total: r.total,
                            }
                        )
                    )
                )
            }
        )
    }

    return <>
    <Row>
        <Col span={24}>
            Lista de Ventas Mes
        </Col>
    </Row>
        <Row>
           
            <Col span={8}>
                <Input type="number" prefix="Año" min={2023} onChange={(e)=>{setFiltros(f=>({...f,anio:parse_int_string( e.target.value)}))}} value={filtros.anio} />
            </Col>
            <Col span={8}>
                <Input type="number" prefix="Mes" min={1} max={12} onChange={(e)=>{setFiltros(f=>({...f,mes:parse_int_string(e.target.value)}))}} value={filtros.mes} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button type="primary" size="small" block onClick={aplicar_filtros}>Aplicar Filtros</Button>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <PrinterWrapper>
                    <b>{`Ventas vendedoes del periodo ${filtros.mes}/${filtros.anio}`} </b>
                    <Table
                    
                    style={{width:"100%"}}
                    pagination={false}
                    columns={columns} 
                    dataSource={dataSource} 
                    summary={data=>{
                        var totalEfvo=0;
                        var total=0;
                        var totalCheques=0;
                        var totalTarjetas=0;
                        var totalMutual=0;
                        var totalCtaCte=0;
                        data.forEach(r=>{
                            totalEfvo += parseFloat(r.efectivo);
                            totalCheques += parseFloat(r.cheque);
                            totalTarjetas += parseFloat(r.tarjeta);
                            totalMutual += parseFloat(r.mutual);
                            totalCtaCte += parseFloat(r.ctacte);
                            total += parseFloat(r.total);
                        })
    
                        return <>
                            <Table.Summary.Row>
                                <Table.Summary.Cell colSpan={1}>
                                    TOTALES:
                                </Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(totalEfvo)}</b></Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(totalTarjetas)}</b></Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(totalCheques)}</b></Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(totalCtaCte)}</b></Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(totalMutual)}</b></Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(total)}</b></Table.Summary.Cell>
                            </Table.Summary.Row>
                        </>
                    }}
                    />
                </PrinterWrapper>
            </Col>
        </Row>
        <Row>
            <Col span={24}><Divider /></Col>
        </Row>
        <Row>
            <Col span={24}>
                <b>Ventas por Sucursal</b>
                <PrinterWrapper>
                    <b>{`Ventas por sucursal del periodo ${filtros.mes}/${filtros.anio}`} </b>
                    <Table
                    
                    style={{width:"100%"}}
                    pagination={false}
                    columns={columns_s} 
                    dataSource={dataSourceSucursal} 
                    summary={data=>{
                        var totalEfvo=0;
                        var total=0;
                        var totalCheques=0;
                        var totalTarjetas=0;
                        var totalMutual=0;
                        var totalCtaCte=0;
                        data.forEach(r=>{
                            totalEfvo += parseFloat(r.efectivo);
                            totalCheques += parseFloat(r.cheque);
                            totalTarjetas += parseFloat(r.tarjeta);
                            totalMutual += parseFloat(r.mutual);
                            totalCtaCte += parseFloat(r.ctacte);
                            total += parseFloat(r.total);
                        })
    
                        return <>
                            <Table.Summary.Row>
                                <Table.Summary.Cell colSpan={1}>
                                    TOTALES:
                                </Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(totalEfvo)}</b></Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(totalTarjetas)}</b></Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(totalCheques)}</b></Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(totalCtaCte)}</b></Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(totalMutual)}</b></Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(total)}</b></Table.Summary.Cell>
                            </Table.Summary.Row>
                        </>
                    }}
                    />
                </PrinterWrapper>
            </Col>
        </Row>
    </>
}

export default InformeVentasTotales;