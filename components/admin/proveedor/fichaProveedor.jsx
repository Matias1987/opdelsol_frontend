import { Button, Card, Col, Modal, Row, Spin, Table, Tabs, Tag } from "antd"
import { useEffect, useState } from "react"
import AgregarPagoProveedor from "./AgregarPagoProveedor"
import AgregarCMProveedor from "./AregarCMProveedor"
import { get, post } from "@/src/urls"
import { post_method } from "@/src/helpers/post_helper"
import AgregarFacturaV2 from "../factura/agregarFacturaV2"

import { CloseOutlined } from "@ant-design/icons"
import PrinterWrapper from "@/components/PrinterWrapper"
import DetalleFactura from "@/components/forms/deposito/DetalleFactura"
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
    const [selectedFactura, setSelectedFactura] = useState(-1)
    const [popupDetalleFacturaOpen, setPopupDetalleFacturaOpen] = useState(false)
    const [totalesFactura, setTotalesFactura] = useState({
        debe:0,
        haber:0,
    })
    const [totales, setTotales] = useState({
        debe:0,
        haber:0,
    })
    const [totalesRemito, setTotalesRemito] = useState({
        debe:0,
        haber:0,
    })

    const columns = [
        {title:"ID.", dataIndex:"id",},
        {title:"Fecha", dataIndex: "fecha_f"},
        {title:"Detalle",  render:(_,{tipo, detalle, id})=>{
            switch(tipo)
            {
                case 'FACTURA': return <><Tag onClick={()=>{setSelectedFactura(id); setPopupDetalleFacturaOpen(true)}}>{detalle}</Tag></>
                case 'PAGO': return <>Pago</>
                case 'CM': return <>{detalle}</>
            }
        }},
        {title:<div style={{textAlign:"right"}}>Debe</div>, render:(_,{debe})=><div style={{color:"darkblue", textAlign:"right"}}>$&nbsp;{(parseFloat(debe).toFixed(2)).toLocaleString()}</div>},
        {title:<div style={{textAlign:"right"}}>Haber</div>, render:(_,{haber})=><div style={{color:"darkblue", textAlign:"right"}}>$&nbsp;{(parseFloat(haber).toFixed(2)).toLocaleString()}</div>},
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
            let total_d=0
            let total_h=0
            response.data.forEach(r=>{
                total_d+=parseFloat(r.debe)
                total_h+=parseFloat(r.haber)
            })
            setTotalesFactura(_=>(
                {
                    debe:total_d,
                    haber:total_h,
                }
            ))
            setOperacionesF(response.data)
        })
        post_method(post.ficha_proveedor,{idproveedor:props.idproveedor, modo:0},(response)=>{
            let total_d=0
            let total_h=0
            response.data.forEach(r=>{
                total_d+=parseFloat(r.debe)
                total_h+=parseFloat(r.haber)
            })
            setTotalesRemito(_=>(
                {
                    debe:total_d,
                    haber:total_h,
                }
            ))
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
        <PrinterWrapper>
            <Row style={{backgroundColor:"#E7E7E7"}}>
                <Col span={24} style={{padding:"1em"}}>
                    <Table 
                    size="small"
                    dataSource={operacionesR} 
                    columns={columns} 
                    scroll={{y:"600px"}} 
                    pagination={false} 
                    summary={() => (
                        <Table.Summary fixed>
                        <Table.Summary.Row  style={{backgroundColor:"lightgreen"}}>
                            <Table.Summary.Cell colSpan={3}>Totales</Table.Summary.Cell>
                            
                            <Table.Summary.Cell><div style={{textAlign:"right", fontWeight:"bold", color:"black", fontSize:"1.1em"}}>$&nbsp;{parseFloat(totalesRemito.debe).toLocaleString()}</div></Table.Summary.Cell>
                            <Table.Summary.Cell><div style={{textAlign:"right", fontWeight:"bold", color:"black", fontSize:"1.1em"}}>$&nbsp;{parseFloat(totalesRemito.haber).toLocaleString()}</div></Table.Summary.Cell>
                        </Table.Summary.Row>
                        <Table.Summary.Row>
                            <Table.Summary.Cell colSpan={5}>
                            <div style={{textAlign:"left", fontWeight:"bolder", fontSize:"1.3em"}}>Saldo: $ {(parseFloat(totalesRemito.debe) - parseFloat(totalesRemito.haber)).toLocaleString()}</div>
                            </Table.Summary.Cell>

                        </Table.Summary.Row>
                        </Table.Summary>
                    )}
                    />
                </Col>
            </Row>
            </PrinterWrapper>
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
        <PrinterWrapper>
            <Row style={{backgroundColor:"#E7E7E7"}}>
                <Col span={24} style={{padding:"1em"}}>
                    <Table 
                    size="small" 
                    dataSource={operacionesF} 
                    columns={columns} 
                    scroll={{y:"400px"}} 
                    pagination={false} 
                    summary={() => (
                        <Table.Summary fixed>
                        <Table.Summary.Row style={{backgroundColor:"lightblue"}}>
                            <Table.Summary.Cell colSpan={3}>Totales</Table.Summary.Cell>
                            <Table.Summary.Cell><div style={{textAlign:"right", fontWeight:"bold", color:"black", fontSize:"1.1em"}}>$&nbsp;{parseFloat(totalesFactura.debe).toLocaleString()}</div></Table.Summary.Cell>
                            <Table.Summary.Cell><div style={{textAlign:"right", fontWeight:"bold", color:"black", fontSize:"1.1em"}}>$&nbsp;{parseFloat(totalesFactura.haber).toLocaleString()}</div></Table.Summary.Cell>
                        </Table.Summary.Row>
                        <Table.Summary.Row>
                            <Table.Summary.Cell colSpan={5}>
                            <div style={{textAlign:"left", fontWeight:"bolder", fontSize:"1.3em"}}>Saldo: $ {(parseFloat(totalesFactura.debe) - parseFloat(totalesFactura.haber)).toLocaleString()}</div>
                            </Table.Summary.Cell>

                        </Table.Summary.Row>
                        </Table.Summary>
                    )}
                    />
                </Col>
            </Row>
            </PrinterWrapper>
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
    <Card 
    size="small"
    bodyStyle={{backgroundColor:"#E7E7E7"}}
    headStyle={{backgroundColor:"#F07427", color:"white"}}
    title={
        <>
        Ficha Proveedor
        </>
    }
    extra={<Button size="small" type="link" style={{color:"white"}} onClick={()=>{props?.callback?.()}}><CloseOutlined /></Button>}
    >
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
    </Card>

    
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
    <Modal 
    open={popupDetalleFacturaOpen} 
    onCancel={()=>{setPopupDetalleFacturaOpen(false)}} 
    footer={null} 
    title=" " 
    destroyOnClose 
    width={"700px"}>
        <DetalleFactura idFactura={selectedFactura} />
    </Modal>

    </>
}

export default FichaProveedor