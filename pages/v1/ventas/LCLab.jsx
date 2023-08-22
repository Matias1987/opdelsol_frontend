import LCLabItems from "@/components/forms/ventas/lc_laboratorio/items";
import VentaBase from "../../../components/forms/ventas/VentaBase";
import LayoutVentas from "@/components/layout/layout_ventas";
import { useState } from "react";
import { post, public_urls } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";
import { Modal } from "antd";
import ImprimirSobreVenta from "./informes/sobre_venta";
import globals from "@/src/globals";
import { validar_items_venta } from "@/src/helpers/ventas_helper";
import { validar_modo_pago } from "@/src/helpers/pago_helper";
import PrinterWrapper from "@/components/PrinterWrapper";
import InformeVenta from "@/components/informes/ventas/Base";

export default function VentaLCLab(){
    const [productos, setProductos] = useState(null);
    const [subTotal, setSubTotal] = useState(0);
    const [venta, setVenta] = useState(null);
    const [total, setTotal] = useState(0);
    const [idVenta, setIdVenta] = useState(-1)
    const [printOpen, setPrintOpen] = useState(false) 

    const products_callback  = (products) => {

        var _total = 0;
        _total+=products?.od?.precio||0;
        _total+=products?.oi?.precio||0;
        _total+=products?.insumo?.precio||0;

        setSubTotal(st=>_total)

        var dto = typeof venta === 'undefined' ? 0 : venta?.descuento||0 

        setTotal(total=>(_total - dto))

        setProductos((productos)=>products)
        
    }

    const callback_venta_modif = (_venta) => {
        setVenta((v)=>{
            var dto = _venta.descuento 
            setTotal((_total)=>(subTotal - dto));
            return _venta;
        })
    }

    const onFinish = (v) => {

        if(v.fkcliente==null)
        {
            alert("Cliente no seleccionado")
            return;
        }

        if(v.fechaRetiro==null)
        {
            alert("Fecha retiro no establecida")
            return
        }

        globals.obtenerCajaAsync((result)=>{

            if(result===null)
            {
                alert("Caja cerrada")
                return;
            }

            const venta = {
                ...v,
                productos: productos, 
                tipo:"6", 
                total: total,
                subtotal: subTotal,
                fkcaja: result.idcaja,
            }

            const _res = validar_items_venta(venta)

            if(_res.length>0){
                alert(_res[0].msg)
                return
            }

            const _res1 = validar_modo_pago(venta.mp)

            if(_res1!=null){
                alert(_res1.msg)
                return 
            }


            //console.log(JSON.stringify(venta))

            post_method(post.insert.venta,venta,(response)=>{
                alert("OK")
                setIdVenta(response.data)
                setPrintOpen(true)
            })
    });
    }

    const onClosePrintPopup = _ => {
        setPrintOpen(false)
        window.location.replace(public_urls.dashboard_venta);
    }

    return (
    <>
    <h3>Venta de Lentes de Contacto Laboratorio</h3>
    <VentaBase subTotal={subTotal} total={total} onfinish={onFinish} callback={callback_venta_modif}>
        <LCLabItems callback={products_callback} />
    </VentaBase>
    <Modal width={"80%"} open={idVenta!=-1 && printOpen} onOk={()=>{onClosePrintPopup()}} onCancel={()=>{onClosePrintPopup()}} >
        <PrinterWrapper>
            <InformeVenta idventa={idVenta} />
        </PrinterWrapper>
    </Modal>
    </>
    )
}

VentaLCLab.PageLayout = LayoutVentas;  