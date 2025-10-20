import ExportToCSV from "@/components/ExportToCSV"
import PrinterWrapper from "@/components/PrinterWrapper"
import ListaVentasSucursalPeriodo from "@/components/admin/ListaVentasSucursalPeriodo"
import ExportToExcel2 from "@/components/etc/ExportToExcel2"
import { post_method } from "@/src/helpers/post_helper"
import { currency_format, parse_int_string } from "@/src/helpers/string_helper"
import { get, post } from "@/src/urls"
import { InfoCircleOutlined } from "@ant-design/icons"


import { Row, Col, Input, Table, Button, Divider, Select, Modal } from "antd"
import { useEffect, useState } from "react"




const InformeVentasTotales = () => {
    const [sucursales, setSucursales] = useState([])
    const [filtros, setFiltros] = useState({
        mes: 1,
        anio: 2023,
        fkcliente: '-1',
        fksucursal: '-1',

    })
    const [filtrosListaVtas, setFiltrosListaVtas] = useState({
        fksucursal:-1,
        fkvendedor:-1,
    })
    const [popupDetalleOpen, setPopupDetalleOpen] = useState(false)

    useEffect(()=>{
        const d = new Date()
       
        setFiltros({
            mes: d.getMonth()+1,
            anio: d.getFullYear(),
            fkcliente: '-1',
            fksucursal: '-1',
        })

        fetch(get.sucursales)
        .then(r=>r.json())
        .then(r=>{
            if(((r||null)?.data||null)!=null)
            {
                setSucursales([...[{label:"Todas las Sucursales", value:-1}],...r.data.map(s=>({label: s.nombre,value: s.idsucursal,}))])
                setFiltros(f=>({...f,fksucursal:-1}))
            }
        })
        .catch(ex=>{console.log(ex)})
    },[])

    const onDetalleLisaVentasClick = (fksucursal, fkvendedor) => {
        setFiltrosListaVtas(f=>({...f,fksucursal: fksucursal, fkvendedor: fkvendedor}))
        setPopupDetalleOpen(true)
    }



    const [dataSource, setDatasource] = useState([])
    const [dataSourceSucursal, setDatasourceSucursal] = useState([])

    const money_style = {
        textAlign:"right",
    }

    const columns = [ 
        { width:"40px",  title: "", render:(_,{idusuario})=>{
            return <><Button type="link" size="small" onClick={()=>{onDetalleLisaVentasClick(filtros.fksucursal,idusuario)}}><InfoCircleOutlined /></Button></>
        }},
        { width:"100px", dataIndex: 'usuario', title: "usuario"},
        { width:"100px", dataIndex: 'efectivo', title: <div style={{textAlign:"right"}}>efectivo</div> , render:(_,{efectivo})=><div style={money_style}>{  currency_format(efectivo)  }</div>},
        { width:"100px", dataIndex: 'tarjeta', title: <div style={{textAlign:"right"}}>tarjeta</div> , render:(_,{tarjeta})=><div style={money_style}>{  currency_format(tarjeta)  }</div>},
        { width:"100px", dataIndex: 'cheque', title: <div style={{textAlign:"right"}}>cheque</div> , render:(_,{cheque})=><div style={money_style}>{  currency_format(cheque)  }</div>},
        { width:"100px", dataIndex: 'ctacte', title: <div style={{textAlign:"right"}}>ctacte</div> , render:(_,{ctacte})=><div style={money_style}>{  currency_format(ctacte)  }</div>},
        { width:"100px", dataIndex: 'mutual', title: <div style={{textAlign:"right"}}>mutual</div> , render:(_,{mutual})=><div style={money_style}>{  currency_format(mutual)  }</div>},
        { width:"100px", dataIndex: 'mp', title: <div style={{textAlign:"right"}}>mp</div> , render:(_,{mp})=><div style={money_style}>{  currency_format(mp)  }</div>},
        { fixed:"right", width:"120px", dataIndex: 'total', title: <div style={{textAlign:"right"}}>total</div> , render:(_,{total})=><div style={{...money_style, fontWeight:"bold"}}>{   currency_format(total)  }</div>},
        
    ]
    const columns_s = [ 
         { width:"40px",  title: "", render:(_,{idsucursal})=>{
            return <><Button type="link" size="small" onClick={()=>{onDetalleLisaVentasClick(idsucursal,-1)}}><InfoCircleOutlined /></Button></>
        }},
        { width:"100px", dataIndex: 'sucursal', title: "sucursal"},
        { width:"100px", dataIndex: 'efectivo', title: <div style={{textAlign:"right"}}>efectivo</div> , render:(_,{efectivo})=><div style={money_style}>{  currency_format(efectivo)  }</div>},
        { width:"100px", dataIndex: 'tarjeta', title: <div style={{textAlign:"right"}}>tarjeta</div> , render:(_,{tarjeta})=><div style={money_style}>{  currency_format(tarjeta)  }</div>},
        { width:"100px", dataIndex: 'cheque', title: <div style={{textAlign:"right"}}>cheque</div> , render:(_,{cheque})=><div style={money_style}>{  currency_format(cheque)  }</div>},
        { width:"100px", dataIndex: 'ctacte', title: <div style={{textAlign:"right"}}>ctacte</div> , render:(_,{ctacte})=><div style={money_style}>{  currency_format(ctacte)  }</div>},
        { width:"100px", dataIndex: 'mutual', title: <div style={{textAlign:"right"}}>mutual</div> , render:(_,{mutual})=><div style={money_style}>{  currency_format(mutual)  }</div>},
        { width:"100px", dataIndex: 'mp', title: <div style={{textAlign:"right"}}>mp</div> , render:(_,{mp})=><div style={money_style}>{  currency_format(mp)  }</div>},
        { fixed:"right",  width:"120px", dataIndex: 'total', title: <div style={{textAlign:"right"}}>total</div> , render:(_,{total})=><div style={{...money_style, fontWeight:"bold"}}>{   currency_format(total)  }</div>},
       
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
                                mp: r.mp,
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
                                mp: r.mp,
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
            <h3>Totales de Ventas Mes</h3>
        </Col>
    </Row>
        <Row>
           
            <Col span={8}>
                <Input type="number" prefix="Año" min={2023} onChange={(e)=>{setFiltros(f=>({...f,anio:parse_int_string( e.target.value)}))}} value={filtros.anio} />
            </Col>
            <Col span={8}>
                <Input type="number" prefix="Mes" min={1} max={12} onChange={(e)=>{setFiltros(f=>({...f,mes:parse_int_string(e.target.value)}))}} value={filtros.mes} />
            </Col>
            <Col span={8}>
                <div style={{overflow:"hidden"}}>
                 <Select prefix={<span style={{fontWeight:"bold", overflow:"hidden"}}>Sucursal:&nbsp;</span>}  value={filtros.fksucursal} style={{width:"200px"}} options={sucursales} onChange={(v)=>{
                    setFiltros(f=>({...f,fksucursal:v}))
                }} />
                </div>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <br />
                <Button type="primary" size="small"  onClick={aplicar_filtros}>Aplicar Filtros</Button>
                <br />
                <br />
            </Col>
        </Row>
        
        <Row>
            <Col span={24}>

                    <b>{`Ventas vendedores del período ${filtros.mes}/${filtros.anio}`} </b>
                    <Table
                    title={_=><>
                    <ExportToExcel2 sheets={dataSource.map(row=>({
                        sheet_name: `Ventas`,
                        header: "",
                        footer: "",
                        columns: [
                            {header:'usuario', key:'usuario', width:"20"},
                            {header:'efectivo', key:'efectivo', width:"20"},
                            {header:'tarjeta', key:'tarjeta', width:"20"},
                            {header:'cheque', key:'cheque', width:"20"},
                            {header:'ctacte', key:'ctacte', width:"20"},
                            {header:'mutual', key:'mutual', width:"20"},
                            {header:'mp', key:'mp', width:"20"},
                            {header:'total', key:'total', width:"20"},
                        ]
                        ,
                        data: dataSource.map(row=>(
                            {
                                usuario: row.usuario,
                                efectivo: row.efectivo,
                                tarjeta: row.tarjeta,
                                cheque: row.cheque,
                                ctacte: row.ctacte,
                                mutual: row.mutual,
                                mp: row.mp,
                                total: row.total,
                            }
                    )   )
                    }))}
                    />
                    </>}
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                    scroll={{y:"400px"}}
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
                        var totalMP=0;
                        data.forEach(r=>{
                            totalEfvo += parseFloat(r.efectivo);
                            totalCheques += parseFloat(r.cheque);
                            totalTarjetas += parseFloat(r.tarjeta);
                            totalMutual += parseFloat(r.mutual);
                            totalCtaCte += parseFloat(r.ctacte);
                            totalMP += parseFloat(r.mp);
                            total += parseFloat(r.total);
                        })
    
                        return <>
                            <Table.Summary.Row>
                                <Table.Summary.Cell colSpan={2}>
                                    TOTALES:
                                </Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(totalEfvo)}</b></Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(totalTarjetas)}</b></Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(totalCheques)}</b></Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(totalCtaCte)}</b></Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(totalMutual)}</b></Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(totalMP)}</b></Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(total)}</b></Table.Summary.Cell>
                            </Table.Summary.Row>
                        </>
                    }}
                    />

            </Col>
        </Row>
        <Row>
            <Col span={24}>
            <ExportToCSV 
                fileName={`ventas_vendedores__${filtros.mes}-${filtros.anio}`}
                parseFnt={()=>{
                    let s = sucursales.find(s=>s.value==filtros.fksucursal)
                    let str = ""
                    str+=`MES:,${filtros.mes}, ANIO:,${filtros.anio}, ,,,\r\n`
                    str+=`SUCURSAL:,${(s?.label)||""},,,,,,\r\n`
                    str+="usuario, efectivo, tarjeta,  cheque, ctacte, mutual, mp , total\r\n"
                    dataSource.forEach(r=>{
                        str+=`${r.usuario},${r.efectivo},${r.tarjeta},${r.cheque},${r.ctacte},${r.mutual},${r.mp},${r.total}\r\n`
                    })
                    return str
                }}
             />
            </Col>
        </Row>
        <Row>
            <Col span={24}><Divider /></Col>
        </Row>
        <Row>
            <Col span={24}>
                <b>Ventas por Sucursal</b>
               
                    <b>{`Ventas por sucursal del período ${filtros.mes}/${filtros.anio}`} </b>
                    <Table
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                    scroll={{y:"400px"}}
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
                        var totalMP=0;
                        data.forEach(r=>{
                            totalEfvo += parseFloat(r.efectivo);
                            totalCheques += parseFloat(r.cheque);
                            totalTarjetas += parseFloat(r.tarjeta);
                            totalMutual += parseFloat(r.mutual);
                            totalCtaCte += parseFloat(r.ctacte);
                            totalMP += parseFloat(r.mp);
                            total += parseFloat(r.total);
                        })
    
                        return <>
                            <Table.Summary.Row>
                                <Table.Summary.Cell colSpan={2}>
                                    TOTALES:
                                </Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(totalEfvo)}</b></Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(totalTarjetas)}</b></Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(totalCheques)}</b></Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(totalCtaCte)}</b></Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(totalMutual)}</b></Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(totalMP)}</b></Table.Summary.Cell>
                                <Table.Summary.Cell align={'right'}><b>{currency_format(total)}</b></Table.Summary.Cell>
                            </Table.Summary.Row>
                        </>
                    }}
                    />
               
            </Col>
        </Row>
        <Modal 
        width={"95%"}
        footer={null}
        open={popupDetalleOpen} 
        destroyOnClose 
        onCancel={()=>{setPopupDetalleOpen(false)}}>
            <ListaVentasSucursalPeriodo 
            callback={()=>{setPopupDetalleOpen(false)}}
            fkusuario={filtrosListaVtas.fkvendedor} 
            mes={filtros.mes} 
            anio={filtros.anio} 
            fksucursal={filtrosListaVtas.fksucursal}  
            />
        </Modal>
    </>
}

export default InformeVentasTotales;