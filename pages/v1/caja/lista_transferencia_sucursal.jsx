import CustomModal from "@/components/CustomModal"
import TransferenciaSucursalForm from "@/components/forms/caja/TransferenciaSucursalForm"
import LayoutCaja from "@/components/layout/layout_caja"
import globals from "@/src/globals"
import { get } from "@/src/urls"
import { ArrowDownOutlined, ArrowRightOutlined, ArrowUpOutlined } from "@ant-design/icons"
import { Col, Divider, Row, Table } from "antd"
import { useEffect, useState } from "react"

export default function ListaTransferenciaSucursal(){
    const [dataTransfEnviadas, setDataTransfEnviadas] = useState([])
    const [dataTransfRecibidas, setDataTransfRecibidas] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(()=>{
        //alert(get.transferencias_enviadas + globals.obtenerSucursal())
        //alert(get.transferencias_recibidas + globals.obtenerSucursal())
        fetch(get.transferencias_enviadas + globals.obtenerSucursal() + "/-1")
        .then(response=>response.json())
        .then((response)=>{
            setDataTransfEnviadas(response.data.map(r=>({
                idtransferencia: r.idtransferencia,
                fecha: r.fecha,
                destino: r.sucursal_destino,
                monto: r.monto,
                comentarios: r.comentarios,
            })))
        })

        fetch(get.transferencias_recibidas + globals.obtenerSucursal() + "/-1")
        .then(response=>response.json())
        .then((response)=>{
            setDataTransfRecibidas(response.data.map(r=>({
                idtransferencia: r.idtransferencia,
                fecha: r.fecha,
                origen: r.sucursal_origen,
                monto: r.monto,
                comentarios: r.comentarios,
            })))
        })
    },[reload])



    return (<>
    <h3>Transferencias</h3>
    <Row>
        <Col span={24}>
        <TransferenciaSucursalForm callback={()=>{setReload(!reload)}} />
            <br />  
            <br />  
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Row>
                <Col span={12} style={{backgroundColor:"lightblue", padding:"1em"}}>
                    Generadas <ArrowUpOutlined />
                    <Table dataSource={dataTransfEnviadas} columns={[
                                {title:"ID", dataIndex:"idtransferencia"},
                                {title:"Fecha", dataIndex:"fecha"},
                                {title:"Destino", dataIndex:"destino"},
                                {title:"Monto", dataIndex:"monto"},
                                {title:"Comentarios", dataIndex:"comentarios"},
                            ]} />
                </Col>
                <Col span={12} style={{backgroundColor:"lightgreen", padding:"1em"}}>
                    Recibidas <ArrowDownOutlined />
                    <Table dataSource={dataTransfRecibidas} columns={[
                                {title:"ID", dataIndex:"idtransferencia"},
                                {title:"Fecha", dataIndex:"fecha"},
                                {title:"Origen", dataIndex:"origen"},
                                {title:"Monto", dataIndex:"monto"},
                                {title:"Comentarios", dataIndex:"comentarios"},
                            ]} />
                </Col>
            </Row>
    </Col>
    </Row>
    
    </>)
}

ListaTransferenciaSucursal.PageLayout = LayoutCaja;  