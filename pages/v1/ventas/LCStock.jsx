import LCStockItems from "@/components/forms/ventas/lc_stock/items";
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

export default function VentaLCStock(){
    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [venta, setVenta] = useState(null);
    const [productos, setProductos] = useState(null);
    const [idVenta, setIdVenta] = useState(-1)
    const [printOpen, setPrintOpen] = useState(false) 

    const onProductosChange = (_p) => {
        var _total = 0;
        _total+= _p?.od?.total||0;
        _total+= _p?.oi?.total||0;
        _total+= _p?.insumo?.total||0;
        setProductos(productos=>_p);
        setSubTotal(stotal=>_total)
        var dto = typeof venta === 'undefined' ? 0 : venta?.descuento||0 
        setTotal(total=>(_total-dto))
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
            if(result==null){
                alert("Caja Cerrada")
                return;
            }
            const venta = {
                ...v, 
                productos: productos, 
                tipo:"3", 
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
            
            console.log(JSON.stringify(venta))

            post_method(post.insert.venta,venta,(response)=>{
                alert(JSON.stringify(response.data))
                setIdVenta(response.data)
                setPrintOpen(true)
            })
        })
    }

    const callback_venta_modif = (_venta) => {
        setVenta((v)=>{
            setTotal((_total)=>(subTotal - _venta.descuento));
            return _venta;
        })
    }

    const onClosePrintPopup = _ => {
        setPrintOpen(false)
        window.location.replace(public_urls.dashboard_venta);
    }

    return (
        <>
        <h3>Venta de Lentes de Contacto Stock</h3>
        <VentaBase subTotal={subTotal} total={total} onfinish={onFinish} callback={callback_venta_modif}>
            <LCStockItems callback={onProductosChange} />
        </VentaBase>
        <Modal width={"80%"} open={idVenta!=-1 && printOpen} onOk={()=>{onClosePrintPopup()}} onCancel={()=>{onClosePrintPopup()}} >
            <PrinterWrapper>
                <InformeVenta idventa={idVenta} />
            </PrinterWrapper>
        </Modal>
        </>
        )
}

VentaLCStock.PageLayout = LayoutVentas;  