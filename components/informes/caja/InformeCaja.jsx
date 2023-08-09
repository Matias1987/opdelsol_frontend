import { get } from "@/src/urls"
import { Col, Row, Table } from "antd"
import { useEffect, useState } from "react"

export default function InformeCaja(props){
    const[data, setData] = useState(null)
    const[dataTransferencias, setDataTransferencias] = useState(null)
    const[dataGastos, setDataGastos] = useState(null)
    const[dataSucursal, setDataSucursal] = useState(null)
    useEffect(()=>{
        fetch(get.informe_caja + props.idcaja)
        .then(response=>response.json())
        .then((response)=>{
            setData(response.data)
        })

        fetch("")
        .then(response=>response.json())
        .then((response)=>{
            setDataGastos(response.data)
        })
    })

    const data_sucursal = _ => <>
    </>
    const header = _ => (
        <>
        <Row>
            <Col span={8}>
                {data_sucursal()}
            </Col>
            <Col span={8}>
                LISTADO DE CAJA DIARIA
            </Col>
            <Col span={8}>
                Fecha de emisi&oacute;n: 00/00/0000
                Hora de emisi&oacute;n: 00:00am
            </Col>
        </Row>
        <Row>
            <Col  span={24}>
                Caja: N1 Fecha: 00-00-0000 Turno: M Estado: CERRADA Inicio de Caja: 000000000
            </Col>
        </Row>
        </>
    )

    const footer = _ => (
        <>
        </>
    )
    return (<>
        {header()}
        <Row>
            <Col span={24}>
                <Table 
                dataSource={data}
                pagination={false}
                columns={[
                    {title:"Oper.", dataIndex:"operacion"},
                    {title:"Detalle", dataIndex:""},
                    {title:"Cliente", dataIndex:"cliente"},
                    {title:"Recibo", dataIndex:"recibo"},
                    {title:"Ventas", dataIndex:"efectivo"},
                    {title:"Cuotas", dataIndex:"cuotas"},
                    {title:"Cheques", dataIndex:"cheque"},
                    {title:"Tarjetas", dataIndex:"tarjeta"},
                    {title:"Mutual", dataIndex:"mutual"},
                    {title:"Cta.Cte.", dataIndex:"ctacte"},
                ]} 
                summary={data=>{
                    var totalVentas=0;
                    var totalCuotas=0;
                    var totalCheques=0;
                    var totalTarjetas=0;
                    var totalMutual=0;
                    var totalCtaCte=0;
                    data.forEach(r=>{
                        totalVentas += r.efectivo;
                        totalCuotas += r.cuotas;
                        totalCheques += r.cheque;
                        totalTarjetas += r.tarjeta;
                        totalMutual += r.mutual;
                        totalCtaCte += r.ctacte;
                    })
                    return <>
                        <Table.Summary.Row>
                            <Table.Summary.Cell colSpan={4}>
                                TOTALES DE CAJA:
                            </Table.Summary.Cell>
                            <Table.Summary.Cell>{totalVentas}</Table.Summary.Cell>
                            <Table.Summary.Cell>{totalCuotas}</Table.Summary.Cell>
                            <Table.Summary.Cell>{totalCheques}</Table.Summary.Cell>
                            <Table.Summary.Cell>{totalTarjetas}</Table.Summary.Cell>
                            <Table.Summary.Cell>{totalMutual}</Table.Summary.Cell>
                            <Table.Summary.Cell>{totalCtaCte}</Table.Summary.Cell>
                        </Table.Summary.Row>
                    </>
                }}
                />
                <h4>Gastos</h4>
                <Table 
                dataSource={dataGastos}
                columns={[
                    {title:"Rec.", dataIndex:"idgasto"},
                    {title:"Detalle", dataIndex:"detalle"},
                    {title:"Importe", dataIndex:"monto"},
                ]}
                />
                <h4>Monto Transferido</h4>
                <Table 
                dataSource={dataTransferencias}
                columns={[
                    {title:"Caja Destino", dataIndex:"cajadest"},
                    {title:"Monto", dataIndex:"monto"},
                    {title:"Detalle", dataIndex:"detalle"},
                ]}
                />
            </Col>
        </Row>
        {footer()}
    </>)
}