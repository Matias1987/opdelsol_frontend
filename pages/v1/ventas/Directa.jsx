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
import { validar_ventas_base } from "@/src/helpers/ventas_helper";
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
            (v)=>{

                if(productos==null)
                {
                    alert("Sin Productos")
                    return
                }

                validar_ventas_base(v,total)

             
                globals.obtenerCajaAsync((result)=>{

                    if(result===null)
                    {
                        alert("Caja cerrada")
                        return;
                    }

                const __venta = {
                    ...v, 
                    productos:productos, 
                    tipo:"1", 
                    total: total,
                    subtotal: subTotal,
                    fkcaja: result.idcaja,
                }
               
                const _res1 = validar_modo_pago(venta.mp)

                if(_res1!=null){
                    alert("Error. "+_res1.msg)
                    return 
                }
                
                post_method(post.insert.venta,__venta,(response)=>{
                    alert("OK")
                    setIdVenta(response.data)
                    setPrintOpen(true)
                     })
                
                });
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
        <Modal width={"80%"} open={idVenta!=-1 && printOpen} onOk={()=>{onClosePrintPopup()}} onCancel={()=>{onClosePrintPopup()}} >
            <PrinterWrapper>
                <InformeVenta idventa={idVenta} />
            </PrinterWrapper>
        </Modal>
    </>
    )
}

VentaDirecta.PageLayout = LayoutVentas;  