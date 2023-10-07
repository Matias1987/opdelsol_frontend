import VentaBase from "@/components/forms/ventas/VentaBase";
import VDItem from "@/components/forms/ventas/directa/Item";
import LayoutVentas from "@/components/layout/layout_ventas";
import { post_method } from "@/src/helpers/post_helper";
import { post, public_urls } from "@/src/urls";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import ImprimirSobreVenta from "./informes/sobre_venta";
import globals from "@/src/globals";
import { validar_modo_pago } from "@/src/helpers/pago_helper";
import { submit_venta, validar_ventas_base } from "@/src/helpers/ventas_helper";
import PrinterWrapper from "@/components/PrinterWrapper";
import InformeVenta from "@/components/informes/ventas/Base";

export default function VentaDirecta(){
    const [venta, setVenta] = useState(null)
    const [productos, setProductos] = useState(null)
    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [idVenta, setIdVenta] = useState(-1)
    const [printOpen, setPrintOpen] = useState(false) 

    

    const callback_venta_modif = (_venta) => {
        setVenta((v)=>{
            var dto = _venta.descuento 
            setTotal((_total)=>(subTotal - dto));
            return _venta;
        })
    }
    const onClosePrintPopup = _ => {
        setPrintOpen(false)
        window.location.replace(public_urls.dashboard_venta);
    }
    return (
    <>
        <h3>Venta Directa</h3>
        <VentaBase 
        ocultarFechaRetiro
        subTotal={subTotal}
        total={total}

        callback={callback_venta_modif}
        onfinish={
            (v,onFailValidation)=>{

                submit_venta(v,productos,total,subTotal,globals.tiposVenta.DIRECTA,false,(idventa)=>{
                    setIdVenta(idventa)
                    setPrintOpen(true)
                },{ignore_fecha_retiro:1,},
                ()=>{onFailValidation()}
                )
                
            }
        }
             >
            <VDItem 
                callback={
                    (prod)=>{
                        setProductos(productos=>(prod))
                        var t =0;
                        prod.forEach(p=>{
                            t+=p.total;
                        })
                        setSubTotal(t);
                        var dto = typeof venta === 'undefined' ? 0 : venta?.descuento||0 
                        setTotal((_total)=>(t - dto));
                        
                    }
                }
            />
        </VentaBase>
        <Modal width={"80%"} open={idVenta!=-1 && printOpen} onOk={()=>{onClosePrintPopup()}} onCancel={()=>{onClosePrintPopup()}} footer={null} >
            <PrinterWrapper>
                <InformeVenta idventa={idVenta} />
            </PrinterWrapper>
        </Modal>
    </>
    )
}

VentaDirecta.PageLayout = LayoutVentas;  