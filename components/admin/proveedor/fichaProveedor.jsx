import { Button, Col, Modal, Row, Spin, Table } from "antd"
import { useEffect, useState } from "react"
import AgregarPagoProveedor from "./AgregarPagoProveedor"
import AgregarCMProveedor from "./AregarCMProveedor"
import { get, post } from "@/src/urls"
import { post_method } from "@/src/helpers/post_helper"

const FichaProveedor = (props) => {
    
    const [reload, setReload] = useState(false)
    const [operaciones, setOperaciones] = useState([])
    const [datosProveedor, setDatosProveedor] = useState(null)

    const [popupPagoOpen, setPopupPagoOpen] = useState(false)
    const [popupCMOpen, setPopupCMOpen] = useState(false)

    const columns = [
        {title:"Nro.", dataIndex:"id"},
        {title:"Fecha", dataIndex: "fecha_f"},
        {title:"Detalle", dateIndex:"detalle"},
        {title:"Debe", render:(_,{debe})=><div style={{color:"red", textAlign:"right"}}>$&nbsp;<b>{debe}</b></div>},
        {title:"Haber", render:(_,{haber})=><div style={{color:"blue", textAlign:"right"}}>$&nbsp;<b>{haber}</b></div>},
    ]

    const detalle_cliente = _ => datosProveedor==null ? <Spin /> : <>
    <Row>
        <Col span={24}>
            Nombre: <span style={{fontWeight:"bold", color:"darkslateblue"}}>{datosProveedor.nombre}</span>
        </Col>
    </Row>
    </>

    const load = () => {

        fetch(get.detalle_proveedor + props.idproveedor)
        .then(r=>r.json())
        .then((response)=>{
            //alert(JSON.stringify(response))
            setDatosProveedor(response.data[0])
        })
        .catch(e=>{console.log("error")})

        post_method(post.ficha_proveedor,{idproveedor:props.idproveedor},(response)=>{
            setOperaciones(response.data)
        })
    }

    useEffect(()=>{

        load()

    },[reload])
    

    const onAgregarPago = () => {
        setPopupPagoOpen(true)
    }

    const onAgregarCargaManual = () => {
        setPopupCMOpen(true)
    }

    return <>
    <Row>
        <Col span={24}>
            <h3>Ficha Proveedor</h3>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            {detalle_cliente()}
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Table dataSource={operaciones} columns={columns} scroll={{y:"600px"}} pagination={false} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Button type="primary" onClick={onAgregarPago}>Agregar Pago</Button>
            &nbsp;
            <Button type="primary" onClick={onAgregarCargaManual}>Agregar Carga Manual</Button>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
        </Col>
    </Row>

    {/* agregar pago popup */}
    <Modal width={"70%"} title="Cargar Pago" footer={null} open={popupPagoOpen} onCancel={()=>{
        setPopupPagoOpen(false)
        setReload(!reload)
    }}>
        <AgregarPagoProveedor idproveedor={props.idproveedor} callback={()=>{setReload(!reload)}} />
    </Modal>

    {/* agregar carga manual */}
    <Modal width={"90%"} title="Carga Manual" footer={null} open={popupCMOpen} onCancel={()=>{
        setPopupCMOpen(false)
        setReload(!reload)
    }}>
        <AgregarCMProveedor idproveedor={props.idproveedor} callback={()=>{setReload(!reload)}} />
    </Modal>
    </>
}

export default FichaProveedor