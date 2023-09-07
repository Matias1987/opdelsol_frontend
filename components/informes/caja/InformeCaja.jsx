import { get } from "@/src/urls"
import { Col, Row, Table } from "antd"
import { useEffect, useState } from "react"

export default function InformeCaja(props){
    const[dataOperaciones, setDataOperaciones] = useState(null)
    const[dataTransferencias, setDataTransferencias] = useState(null)
    const[dataGastos, setDataGastos] = useState(null)
    const[dataSucursal, setDataSucursal] = useState(null)
    const[dataCaja, setDataCaja] = useState(null)
    const[fecha, setFecha] = useState("")
    const[hora, setHora] = useState("")
    useEffect(()=>{

        //get caja by id
        var d = new Date();
        setFecha(d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear())
        setHora(d.getHours() + ":" + d.getMinutes());

        fetch(get.caja_id + props.idcaja)
        .then(response=>response.json())
        .then((response)=>{
            //alert(JSON.stringify(response))
            //alert(get.sucursal_details + response.data[0].sucursal_idsucursal)
            //get data sucursal
            setDataCaja(response.data[0])
            /*fetch(get.sucursal_details + response.data[0].sucursal_idsucursal)
            .then(__response=>__response.json())
            .then((__response)=>{
                alert("SUCURSAL::::: " + JSON.stringify(__response.data))
                setDataSucursal(__response.data)
            })*/
        })


        
        fetch(get.informe_caja + props.idcaja)
        .then(response=>response.json())
        .then((response)=>{
            //alert(JSON.stringify(response))
            setDataOperaciones(response.data)

            
        })

        fetch(get.lista_gastos_caja + props.idcaja)
        .then(response=>response.json())
        .then((response)=>{
            setDataGastos(response.data)
        })
    },[])

    const data_sucursal = _ => dataSucursal == null ? <></> : <> 
    </>
    const header = _ => (
        dataCaja == null ? <></> :
        <>
        <Row>
            <Col span={8}>
                {data_sucursal()}
            </Col>
            <Col span={8}>
                LISTADO DE CAJA DIARIA
            </Col>
            <Col span={8}>
                Fecha de emisi&oacute;n: {fecha} &nbsp;&nbsp;&nbsp;
                Hora de emisi&oacute;n: {hora}
            </Col>
        </Row>
        <Row>
            <Col  span={24}>
                Caja: N1 Fecha: <b>{dataCaja.fecha_f}</b> &nbsp;&nbsp;&nbsp;Turno: M Estado: <b>{dataCaja.estado}</b> &nbsp;&nbsp;&nbsp;Inicio de Caja: <b>{dataCaja.monto_inicial}</b>
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
                style={{width:'100%'}}
                dataSource={dataOperaciones}
                pagination={false}
                columns={[
                    {title:"Oper.", dataIndex:"operacion"},
                    {title:"Detalle", dataIndex:"detalle"},
                    {title:"Cliente", dataIndex:"cliente"},
                    {title:"Recibo", dataIndex:"recibo"},
                    {align: 'right', title:"Ventas", dataIndex:"efectivo"},
                    {align: 'right', title:"Cuotas", dataIndex:"cuotas"},
                    {align: 'right', title:"Cheques", dataIndex:"cheque"},
                    {align: 'right', title:"Tarjetas", dataIndex:"tarjeta"},
                    {align: 'right', title:"Mutual", dataIndex:"mutual"},
                    {align: 'right', title:"Cta.Cte.", dataIndex:"ctacte"},
                ]} 
                summary={data=>{
                    var totalVentas=0;
                    var totalCuotas=0;
                    var totalCheques=0;
                    var totalTarjetas=0;
                    var totalMutual=0;
                    var totalCtaCte=0;
                    data.forEach(r=>{
                        totalVentas += parseFloat(r.efectivo);
                        totalCuotas += parseFloat(r.cuotas);
                        totalCheques += parseFloat(r.cheque);
                        totalTarjetas += parseFloat(r.tarjeta);
                        totalMutual += parseFloat(r.mutual);
                        totalCtaCte += parseFloat(r.ctacte);
                    })
                    return <>
                        <Table.Summary.Row>
                            <Table.Summary.Cell colSpan={4}>
                                TOTALES DE CAJA:
                            </Table.Summary.Cell>
                            <Table.Summary.Cell align={'right'}><b>{totalVentas}</b></Table.Summary.Cell>
                            <Table.Summary.Cell align={'right'}><b>{totalCuotas}</b></Table.Summary.Cell>
                            <Table.Summary.Cell align={'right'}><b>{totalCheques}</b></Table.Summary.Cell>
                            <Table.Summary.Cell align={'right'}><b>{totalTarjetas}</b></Table.Summary.Cell>
                            <Table.Summary.Cell align={'right'}><b>{totalMutual}</b></Table.Summary.Cell>
                            <Table.Summary.Cell align={'right'}><b>{totalCtaCte}</b></Table.Summary.Cell>
                        </Table.Summary.Row>
                    </>
                }}
                />
                <h4>Gastos</h4>
                <Table 
                pagination={false}
                dataSource={dataGastos}
                columns={[
                    {title:"Rec.", dataIndex:"idgasto"},
                    {title:"Detalle", dataIndex:"concepto_gasto"},
                    {title:"Importe", dataIndex:"monto"},
                ]}
                />
                <h4>Monto Transferido</h4>
                <Table 
                pagination={false}
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