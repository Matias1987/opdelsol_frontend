import { get } from "@/src/urls"
import { CloseOutlined, DeleteFilled } from "@ant-design/icons"
import { Button, Col, Modal, Row, Select } from "antd"
import { useEffect, useState } from "react"
import FacturaForm from "./forms/FacturaForm"
import ProveedorForm from "./forms/ProveedorForm"



const FacturaSelect2 = (props) =>{ 

    
    const [idProveedor, setIdProveedor] = useState(-1) 
    const [proveedores, setProveedores] = useState([])
    const [idFactura, setIdFactura] = useState(-1)
    const [facturas, setFacturas] = useState([])
    const [popupFacturaOpen, setPopupFacturaOpen] = useState(false)
    const [popupProvOpen, setPopupProvOpen] = useState(false)
    const [reload, setReload] = useState(false)

    useEffect(()=>{
        if(proveedores.length<1)
        {
            load_proveedores()
        }
        
        load_facturas()
    },[idProveedor, reload])

    const load_proveedores = _ => {
        fetch(get.lista_proveedores)
        .then(r=>r.json())
        .then((response)=>{
            setProveedores(
                [...[{value:-1,label:"Seleccione Proveedor"}], 
                ...response.data.map((row)=>(
                {
                    "value": row.idproveedor,
                    "label": row.nombre
                }
            )
            ),
            ...[{value:-2, label:"+ Agregar Proveedor"}]
        ])
        })
    }

    const load_facturas = _ => {
        fetch(get.lista_facturas  + idProveedor)
        .then(r=>r.json())
        .then((response)=>{
            setFacturas(
                [ ...[{value:-1, label:"Seleccione Factura"}],
                    ...response.data.map((row)=>(
                    {
                        value: row.idfactura,
                        label: row.numero
                    }
                )),
                ...[{value:-2, label:" + Agregar Factura"}]
            ]
            
            )
        })
    }

    return (
        <>

        <Row>
            <Col style={{fontSize:".9em", color:"#000435"}} span={24}>
                Proveedor:
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Select options={proveedores} value={idProveedor} onChange={(v)=>{ 
                    if(v==-2)
                    {
                        setPopupProvOpen(true)
                        return
                    }
                    setIdFactura(-1); 
                    setIdProveedor(v);
                    props.callback(null)
                    }} style={{width:"100%"}}/>
            </Col>
        </Row>
        
                { idProveedor<0 ? <>...</> :
                    (
                        <>
                        <Row>
                            <Col style={{fontSize:".9em", color:"#000435"}} span={24}>
                                Factura:
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Select options={facturas} value={idFactura} onChange={(v)=>{

                                    if(v==-2)
                                    {
                                        setPopupFacturaOpen(true)
                                        return    
                                    }

                                    let __f = facturas.filter(_f=>_f.value==v)[0]
                                    setIdFactura(v); 
                                    //alert(JSON.stringify({a:__f.value, b:__f.label}))

                                    props.callback({idfactura: __f.value, nro:__f.label});

                                    }} style={{width:"100%"}} key={idProveedor}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{padding:"1.5em"}}>
                                <Button block size="small" danger onClick={()=>{setIdProveedor(-1); setIdFactura(-1);  props.callback(null)}}><CloseOutlined /></Button>
                            </Col>
                        </Row>
                        </>
                )
                }
           
   
    <Modal open={popupFacturaOpen} onCancel={()=>{setPopupFacturaOpen(false)}} title="Agregar Factura" footer={null}>
        <FacturaForm action="ADD" callback={()=>{setPopupFacturaOpen(false); setReload(!reload)}} />
    </Modal>
    <Modal open={popupProvOpen} onCancel={()=>{setPopupProvOpen(false)}} title="Agregar Proveedor" footer={null}>
        <ProveedorForm action="ADD" callback={()=>{setPopupProvOpen(false); setProveedores([]); setReload(!reload)}} />
    </Modal>
    
    </>
    
    )}
    
export default FacturaSelect2;



    

