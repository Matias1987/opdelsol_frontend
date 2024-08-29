import { Button, Col, Modal, Row, Spin, Table, Tabs } from "antd"
import { useEffect, useState } from "react"
import AgregarPagoProveedor from "./AgregarPagoProveedor"
import AgregarCMProveedor from "./AregarCMProveedor"
import { get, post } from "@/src/urls"
import { post_method } from "@/src/helpers/post_helper"
import AgregarFacturaV2 from "../factura/agregarFacturaV2"
const { TabPane } = Tabs;
const FichaProveedor = (props) => {
    
    const [reload, setReload] = useState(false)
    const [operacionesF, setOperacionesF] = useState([])
    const [operacionesR, setOperacionesR] = useState([])
    const [datosProveedor, setDatosProveedor] = useState(null)
    const [popupPagoOpen, setPopupPagoOpen] = useState(false)
    const [popupCMOpen, setPopupCMOpen] = useState(false)
    const [popupAddFacturaOpen, setPopupAddFacturaOpen] = useState(false)
    const [popupAddRemitoOpen, setPopupAddRemitoOpen] = useState(false)
    const [modo, setModo] = useState(1)

    const columns = [
        {title:"Nro.", dataIndex:"id"},
        {title:"Fecha", dataIndex: "fecha_f"},
        {title:"Detalle", dataIndex:"detalle"},
        {title:<div style={{textAlign:"right"}}>Debe</div>, render:(_,{debe})=><div style={{color:"red", textAlign:"right"}}>$&nbsp;<b>{debe}</b></div>},
        {title:<div style={{textAlign:"right"}}>Haber</div>, render:(_,{haber})=><div style={{color:"blue", textAlign:"right"}}>$&nbsp;<b>{haber}</b></div>},
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

        post_method(post.ficha_proveedor,{idproveedor:props.idproveedor, modo:1},(response)=>{
            setOperacionesF(response.data)
        })
        post_method(post.ficha_proveedor,{idproveedor:props.idproveedor, modo:0},(response)=>{
            setOperacionesR(response.data)
        })
    }

    useEffect(()=>{

        load()

    },[reload])
    

    const onAgregarPago = (mp) => {
        setModo(mp)
        setPopupPagoOpen(true)
    }

    const onAgregarCargaManual = (mp) => {
        setModo(mp)
        setPopupCMOpen(true)
    }

    const callback = () =>{}

    const _remitos =_=><>
        <Row style={{backgroundColor:"#E7E7E7"}}>
            <Col span={24} style={{padding:"1em"}}>
                <Table dataSource={operacionesR} columns={columns} scroll={{y:"600px"}} pagination={false} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button type="primary" onClick={()=>{onAgregarPago(0)}}>Agregar Pago</Button>
                &nbsp;
                <Button type="primary" onClick={()=>{onAgregarCargaManual(0)}}>Agregar Carga Manual</Button>
                &nbsp;
                <Button type="primary" onClick={()=>{setPopupAddRemitoOpen(true)}}>Agregar Remito</Button>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            </Col>
        </Row>
    </>
    const _facturas =_=> <>
        <Row style={{backgroundColor:"#E7E7E7"}}>
            <Col span={24} style={{padding:"1em"}}>
                <Table size="small" dataSource={operacionesF} columns={columns} scroll={{y:"600px"}} pagination={false} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button type="primary" onClick={()=>{onAgregarPago(1)}}>Agregar Pago</Button>
                &nbsp;
                <Button type="primary" onClick={()=>{onAgregarCargaManual(1)}}>Agregar Carga Manual</Button>
                &nbsp;
                <Button type="primary" onClick={()=>{setPopupAddFacturaOpen(true)}}>Agregar Factura</Button>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            </Col>
        </Row>
    </>

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
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Facturas" key="1">
                    {_facturas()}
                </TabPane>
                <TabPane tab="Remitos" key="2">
                    {_remitos()}
                </TabPane>
            </Tabs>
        </Col>
    </Row>

    
    {/* agregar pago popup */}
    <Modal destroyOnClose width={"70%"} title="Cargar Pago" footer={null} open={popupPagoOpen} onCancel={()=>{
        setPopupPagoOpen(false)
        setReload(!reload)
    }}>
        <AgregarPagoProveedor idproveedor={props.idproveedor} modo={modo} callback={()=>{ setPopupPagoOpen(false); setReload(!reload)}} />
    </Modal>

    {/* agregar carga manual */}
    <Modal destroyOnClose width={"90%"} title="Carga Manual" footer={null} open={popupCMOpen} onCancel={()=>{
        setPopupCMOpen(false)
        setReload(!reload)
    }}>
        <AgregarCMProveedor idproveedor={props.idproveedor} modo={modo} callback={()=>{ setPopupCMOpen(false); setReload(!reload)}} />
    </Modal>
    <Modal 
    destroyOnClose
    width={"70%"}
    open={popupAddFacturaOpen} 
    title="Agregar Factura" 
    footer={null} 
    onCancel={()=>{setPopupAddFacturaOpen(false)}}>
        <AgregarFacturaV2  idproveedor={props.idproveedor} callback={()=>{setReload(!reload); setPopupAddFacturaOpen(false)}}/>
    </Modal>
    <Modal 
    destroyOnClose
    width={"70%"}
    open={popupAddRemitoOpen} 
    title="Agregar Remito" 
    footer={null} 
    onCancel={()=>{setPopupAddRemitoOpen(false)}}>
        <AgregarFacturaV2  idproveedor={props.idproveedor} esremito={true} callback={()=>{setReload(!reload); setPopupAddRemitoOpen(false)}}/>
    </Modal>

    </>
}

export default FichaProveedor