 import MonofLabItems from "@/components/forms/ventas/monof_lab/items";
import VentaBase from "../../../components/forms/ventas/VentaBase";
import LayoutVentas from "@/components/layout/layout_ventas";
import { useState } from "react";
import { public_urls } from "@/src/urls";
import globals from "@/src/globals";
import { submit_venta } from "@/src/helpers/ventas_helper";
import InformeVentaV2 from "@/components/informes/ventas/InformeVentaV2";

export default function VentaMonofocalesLab(){
    const [productos, setProductos] = useState(null);
    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [venta, setVenta] = useState(null);
    const [idVenta, setIdVenta] = useState(-1)
    const [printOpen, setPrintOpen] = useState(false) 

    const onProductosCallback = (_p) => {

        setProductos((productos)=>_p)
        var _total = parseFloat((_p?.lejos_od?.precio)||0);
        _total += parseFloat((_p?.lejos_oi?.precio) || 0);
        _total += parseFloat((_p?.lejos_armazon?.precio) || +0);
        _total += parseFloat((_p?.lejos_tratamiento?.precio) || +0);
        _total += parseFloat((_p?.cerca_od?.precio)||+0);
        _total += parseFloat((_p?.cerca_oi?.precio) || +0);
        _total += parseFloat((_p?.cerca_armazon?.precio) || +0);
        _total += parseFloat((_p?.cerca_tratamiento?.precio) || +0);
        //alert(_total)
        setSubTotal(st=>_total)
        var dto = typeof venta === 'undefined' ? 0 : venta?.descuento||0 
        setTotal(total=>(_total-dto))

    }

    const callback_venta_modif = (_venta) => {
        setVenta((v)=>{
            setTotal((_total)=>(subTotal - _venta.descuento));
            return _venta;
        })
    }

    const onFinish = (v,onFailValidation) => {
       
        submit_venta(v,productos,total,subTotal,globals.tiposVenta.MONOFLAB,true,(idventa)=>{
            setIdVenta(idventa)
            setPrintOpen(true)
        },
        {},
        _=>{onFailValidation()})
    }

    const onClosePrintPopup = _ => {
        setPrintOpen(false)
        window.location.replace(public_urls.dashboard_venta);
    }

    return (<>
    <h3>Venta de Monofocales Laboratorio</h3>
    <VentaBase subTotal={subTotal} total={total} onfinish={onFinish} callback={callback_venta_modif}>
        <MonofLabItems callback={onProductosCallback}/>
    </VentaBase>
   { /*<Modal width={"80%"} open={idVenta!=-1 && printOpen} onOk={()=>{onClosePrintPopup()}} onCancel={()=>{onClosePrintPopup()}} footer={null} >
        <PrinterWrapper>
            <InformeVenta idventa={idVenta} />
        </PrinterWrapper>
    </Modal>*/}
    <InformeVentaV2 idventa={idVenta} open={idVenta!=-1 && printOpen} hidebutton={true} key={idVenta} onclose={onClosePrintPopup}/>
    </>)
}

VentaMonofocalesLab.PageLayout = LayoutVentas;  