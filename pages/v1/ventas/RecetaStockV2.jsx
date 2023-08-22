import RecetaStockItems from "@/components/forms/ventas/receta_stock/Items"
import VentaBase from "../../../components/forms/ventas/VentaBase"
import { useState } from "react";
import LayoutVentas from "@/components/layout/layout_ventas";
import { post_method } from "@/src/helpers/post_helper";
import { post, public_urls } from "@/src/urls";
import globals from "@/src/globals";
import { Modal } from "antd";
import InformeVenta from "@/components/informes/ventas/Base";
import ImprimirSobreVenta from "./informes/sobre_venta";
import { validar_items_venta } from "@/src/helpers/ventas_helper";
import { validar_modo_pago } from "@/src/helpers/pago_helper";
import PrinterWrapper from "@/components/PrinterWrapper";


export default function VentaRecetaStock(){
    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [venta, setVenta] = useState(null);
    const [productos, setProductos] = useState(null);
    const [idVenta, setIdVenta] = useState(-1)
    const [printOpen, setPrintOpen] = useState(false) 
    
    const callback = (productos)=>{
        setProductos(_productos=>{
            calcular_total(productos)
            return productos
        })
    }

    const calcular_total = (_productos) => {
        var _t = 0;
        _t += parseFloat(_productos?.lejos_od?.precio||0);
        _t += parseFloat(_productos?.lejos_oi?.precio||0);
        _t += parseFloat(_productos?.lejos_armazon?.precio||0);
        _t += parseFloat(_productos?.lejos_tratamiento?.precio||0);
        _t += parseFloat(_productos?.cerca_od?.precio||0);
        _t += parseFloat(_productos?.cerca_oi?.precio||0);
        _t += parseFloat(_productos?.cerca_armazon?.precio||0);
        _t += parseFloat(_productos?.cerca_tratamiento?.precio||0);
        setSubTotal(_t);
        var dto = typeof venta === 'undefined' ? 0 : venta?.descuento||0 
        setTotal((_total)=>(_t - dto));
    }

    const onClosePrintPopup = _ => {
        setPrintOpen(false)
        window.location.replace(public_urls.dashboard_venta);
    }


    return (
    <>
        <h3>Venta de Receta Stock</h3>
        <VentaBase 
        total={total}
        subTotal={subTotal}
        callback={(venta)=>{
           
            setVenta((v)=>{
                var dto = venta.descuento 
                setTotal((_total)=>(subTotal - dto));
                return venta;
            })
        }}
        
        onfinish={(data)=>{
                
                if(data.fkcliente==null)
                {
                    alert("Cliente no seleccionado")
                    return;
                }

                if(data.fechaRetiro==null)
                {
                    alert("Fecha retiro no establecida")
                    return
                }

                globals.obtenerCajaAsync((result)=>{
                    if(result==null){
                        alert("Caja Cerrada")
                        return;
                    }
                    const _venta = {
                        ...data,
                        productos: productos,
                        total: total,
                        subtotal: subTotal,
                        tipo: "2",
                        fkcaja: result.idcaja,
                    }

                    const _res = validar_items_venta(_venta)
                    //alert(JSON.stringify(_res))
                    if(_res.length>0){
                        //only show 1 error per try 
                        alert(_res[0].msg)
                        return
                    }

                    const _res1 = validar_modo_pago(_venta.mp)

                    if(_res1!=null){
                        alert(_res1.msg)
                        return 
                    }


                    post_method(post.insert.venta,_venta,(response)=>{
                        alert("OK")
                        
                        setIdVenta(response.data)
                        setPrintOpen(true)

                    })
            })//caja
            }}>
            <RecetaStockItems callback={callback} />
        </VentaBase>
        <Modal width={"80%"} open={idVenta!=-1 && printOpen} onOk={()=>{onClosePrintPopup()}} onCancel={()=>{onClosePrintPopup()}} >
            <PrinterWrapper>
                <InformeVenta idventa={idVenta} />
            </PrinterWrapper>
        </Modal>
    </>
    )
}
VentaRecetaStock.PageLayout = LayoutVentas;  