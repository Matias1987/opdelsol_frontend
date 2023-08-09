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
        subTotal={subTotal}
        total={total}

        callback={callback_venta_modif}
        onfinish={
            (v)=>{

                alert(JSON.stringify(v))
                alert(JSON.stringify(productos))

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
                //alert("****************")
                const _res1 = validar_modo_pago(venta.mp)

                if(_res1!=null){
                    alert("Error. "+_res1.msg)
                    return 
                }
                
                //console.log(JSON.stringify(__venta))


                post_method(post.insert.venta,__venta,(response)=>{
                    alert(JSON.stringify(response.data))
                    setIdVenta(response.data)
                    setPrintOpen(true)
                    //redirect
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
        <Modal open={idVenta!=-1 && printOpen} onOk={()=>{onClosePrintPopup()}} onCancel={()=>{onClosePrintPopup()}} >
            <ImprimirSobreVenta idventa={idVenta} />
        </Modal>
    </>
    )
}

VentaDirecta.PageLayout = LayoutVentas;  