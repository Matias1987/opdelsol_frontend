import ListaVentas from "@/components/informes/ventas/ListaVentas";
import EditarSobre from "@/components/taller/EditarSobre";
import { Col, Modal, Row } from "antd";
import { useEffect, useState } from "react";

export default function ListaOperacionesTerminadasTaller(){
    const [idventa, setIdVenta] = useState(-1)
    const [idBusqueda, setIdBusqueda] = useState(-1)
    const [idSucursal, setIdSucursal] = useState(-1)
    const [open, setOpen] = useState(false)
    const [reload, setReload] = useState(false)
    useEffect(()=>{},[])
    return <>
    <Row>
        <Col span={24}>
        <ListaVentas 
            idsucursal={idSucursal}
            titulo="Terminados"
            id={idBusqueda} 
            estado_taller="TERMINADO" 
            estado_trabajo="TERMINADO" 
            laboratorio_modificar
            ignoreSucursal 
            mostrarEstado="0" 
             
            ignoreSucursalEntrega  
            onEditLaboratorioClick={(id)=>{setIdVenta(id), setOpen(true)}} 
            key={reload} 
        />
        
        
        </Col>
    </Row>
        <Modal destroyOnClose open={open} footer={null} onCancel={()=>{setOpen(false)}} key={idventa} width={"100%"}>
            <EditarSobre readonly={true} idventa={idventa} callback={()=>{setReload(!reload), setOpen(false)}} />
        </Modal>
    </>
}

