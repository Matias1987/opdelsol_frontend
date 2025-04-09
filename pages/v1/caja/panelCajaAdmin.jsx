import CustomModal from "@/components/CustomModal";
import PrinterWrapper from "@/components/PrinterWrapper";
import InicioCaja from "@/components/forms/caja/InicioCaja";
import ListaCaja from "@/components/forms/caja/ListaCajas";
import InformeCaja from "@/components/informes/caja/InformeCaja";
import InformeCajaV2 from "@/components/informes/caja/InformeCajaV2";

import InformeCajaV3 from "@/components/informes/caja/InformeCajaV3";
import LayoutCaja from "@/components/layout/layout_caja";
import globals from "@/src/globals";
import { get } from "@/src/urls";
import { Button, Col, Modal, Row, Spin, Tag } from "antd";
import { useEffect, useState } from "react";

export default function panelCajaAdmin(){
    const [caja, setCaja] = useState(null)
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(false)
    const [listOpen, setListOpen] = useState(false)
    useEffect(()=>{
        
        globals.obtenerCajaAsync((result)=>{
            setLoading(false)
            if(result!=null){
                setCaja(result)
            }
            else
            {
                setCaja(null)
            }
        },false)
    },[reload])

    const cerrar_caja = () => {
        if(!confirm("Confirmar Cerrar Caja"))
        {
            return
        }
        fetch(get.cerrar_caja + caja.idcaja)
        .then(response=>response.json())
        .then((response)=>{
            setReload(!reload)
            globals.obtenerCajaAsync(()=>{})
            globals.setCajaOpen(false)
        })
    }

    const detalle_caja = _ => 
        caja == null ? <></> : <>
            <Row>
                <Col span={24}>
                    <Tag color="green-inverse">CAJA ABIERTA</Tag> Nro. Caja: 1 Fecha: <b>{caja.fecha_f}</b> &nbsp;&nbsp;<Button type="link" onClick={cerrar_caja} danger>Cerrar Caja</Button>
                </Col>
                
                
            </Row>
        </>

    const caja_cerrada = _ => <><InicioCaja callback={()=>{
        globals.obtenerCajaAsync(()=>{})
        setReload(!reload)
    }} /></>

        return loading ? <Spin/> :<> 
        {caja == null ? caja_cerrada() : detalle_caja()} 
        <br/>
        { caja==null ? <></> :
        <Row style={{backgroundColor:"lightyellow"}}>
            <Col span={24} style={{border:"1px solid black"}}>
                <InformeCajaV3 idcaja={caja.idcaja} idsucursal={globals.obtenerSucursal()} />
            </Col>
        </Row>
        }
        <br />
        
        <Row>
            <Col span={24}>
                <Button type="primary" onClick={_=>{setListOpen(true)}}>Ver listado</Button>
            </Col>
        </Row>
     
        <Modal open={listOpen} onCancel={_=>{setListOpen(false)}} title="Listado" destroyOnClose width={"900px"} footer={null}>
            <ListaCaja idsucursal={globals.obtenerSucursal()}/>
        </Modal>
        </>; 
    

}

panelCajaAdmin.PageLayout = LayoutCaja;