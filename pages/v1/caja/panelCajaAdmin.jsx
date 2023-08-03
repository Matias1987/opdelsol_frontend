import InicioCaja from "@/components/forms/caja/InicioCaja";
import LayoutCaja from "@/components/layout/layout_caja";
import globals from "@/src/globals";
import { get } from "@/src/urls";
import { Button, Spin, Tag } from "antd";
import { useEffect, useState } from "react";

export default function panelCajaAdmin(){
    const [caja, setCaja] = useState(null)
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(false)
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
        fetch(get.cerrar_caja + caja.idcaja)
        .then(response=>response.json())
        .then((response)=>{
            setReload(!reload)
        })
    }

    const detalle_caja = _ => 
        caja == null ? <></> : <>
            <div>
                <p><Tag color="green-inverse">CAJA ABIERTA</Tag> Nro. Caja: 1 Fecha: <b>{caja.fecha}</b> Monto Inicial: <b>{caja.monto_inicial}</b></p>
                <Button block onClick={cerrar_caja} style={{backgroundColor:"ButtonFace"}}>Cerrar Caja</Button>
            </div>
        </>

    const caja_cerrada = _ => <><InicioCaja callback={()=>{setReload(!reload)}} /></>

        return loading ? <Spin/> : (caja == null ? caja_cerrada() : detalle_caja()); 
    

}

panelCajaAdmin.PageLayout = LayoutCaja;