import CustomModal from "@/components/CustomModal";
import PrinterWrapper from "@/components/PrinterWrapper";
import InicioCaja from "@/components/forms/caja/InicioCaja";
import ListaCaja from "@/components/forms/caja/ListaCajas";
import InformeCaja from "@/components/informes/caja/InformeCaja";
import LayoutCaja from "@/components/layout/layout_caja";
import globals from "@/src/globals";
import { get } from "@/src/urls";
import { Button, Modal, Spin, Tag } from "antd";
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
        })
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
        })
    }

    const detalle_caja = _ => 
        caja == null ? <></> : <>
            <div>
                <p><Tag color="green-inverse">CAJA ABIERTA</Tag> Nro. Caja: 1 Fecha: <b>{caja.fecha_f}</b> Monto Inicial: <b>{caja.monto_inicial}</b></p>
                <Button block onClick={cerrar_caja} danger>Cerrar Caja</Button>
            </div>
        </>

    const caja_cerrada = _ => <><InicioCaja callback={()=>{
        globals.obtenerCajaAsync(()=>{})
        setReload(!reload)
    }} /></>

        return loading ? <Spin/> :<> 
        {caja == null ? caja_cerrada() : detalle_caja()} 
        <br />
        {caja==null? <></>:
        <CustomModal openButtonText="Imprimir" block>
            <PrinterWrapper>
                <InformeCaja idcaja={caja.idcaja} />
            </PrinterWrapper>
        </CustomModal>
        }
        <br /> <br />
        <CustomModal openButtonText="Lista" block>
            <ListaCaja />
        </CustomModal>
        </>; 
    

}

panelCajaAdmin.PageLayout = LayoutCaja;