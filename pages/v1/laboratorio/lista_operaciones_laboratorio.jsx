import SucursalSelect from "@/components/SucursalSelect";
import ListaVentas from "@/components/informes/ventas/ListaVentas";
import LayoutLaboratorio from "@/components/layout/layout_laboratorio";
import EditarSobre from "@/components/taller/EditarSobre";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Modal, Row } from "antd";
import { useEffect, useState } from "react";

export default function  ListaOperacionesLab(){
    const [idventa, setIdVenta] = useState(-1)
    const [busqueda, setBusqueda] = useState("")
    const [idBusqueda, setIdBusqueda] = useState(-1)
    const [idSucursal, setIdSucursal] = useState(-1)
    const [open, setOpen] = useState(false)
    const [reload, setReload] = useState(false)
    useEffect(()=>{},[])
    return <>
    <Row>
        <Col span={6}>
            <SucursalSelect callback={(v)=>{setIdSucursal(v)}} />
        </Col>
        <Col span={10}>
            <Input 
            allowClear 
            style={{width:"100%", padding:"1em"}} 
            prefix="Buscar por Nro. de Venta" 
            
            onChange={(e)=>{
                setBusqueda(e.target.value)
            }} 
            value={busqueda} />
        </Col>
        <Col span={4} style={{padding:".5em"}}>
            <Button 
                
                onClick={()=>
                    {
                        setIdBusqueda((busqueda||"").length<1 ? "-1" : busqueda);
                        setReload(!reload)
                    }}><SearchOutlined />
            </Button>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
        <ListaVentas 
            idsucursal={idSucursal}
            marcarTerminado
            titulo="Pendientes"
            estado_taller="PENDIENTE" 
            id={idBusqueda} 
            mostrarEstado="0" 
            ignoreSucursal 
            laboratorio_modificar 
            enviar_a_sucursal 
            en_laboratorio={1} 
            ignoreSucursalEntrega  
            estado={"PENDIENTE"} 
            onEditLaboratorioClick={(id)=>{setIdVenta(id), setOpen(true)}} 
            key={reload} 
        />
       
        
        </Col>
    </Row>
    <Row>
        <Col span={24}>

        </Col>
    </Row>
    <Row>
        <Col span={24}>

        </Col>
    </Row>
        <Modal open={open} footer={null} onCancel={()=>{setOpen(false)}} key={idventa} width={"100%"}>
            <EditarSobre readonly={false} idventa={idventa} callback={()=>{setReload(!reload), setOpen(false)}} />
        </Modal>
    </>
}

ListaOperacionesLab.PageLayout = LayoutLaboratorio;