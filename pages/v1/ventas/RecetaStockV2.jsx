import RecetaStockItems from "@/components/forms/ventas/receta_stock/Items"
import VentaBase from "../../../components/forms/ventas/VentaBase"
import { useState } from "react";
import LayoutVentas from "@/components/layout/layout_ventas";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import globals from "@/src/globals";
import { Modal } from "antd";
import InformeVenta from "@/components/informes/ventas/Base";
import ImprimirSobreVenta from "./informes/sobre_venta";


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


    return (
    <>
        <h2>Venta de Receta Stock</h2>
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
                if(data === null){
                    alert("venta is null!")
                    return;
                }

                if(typeof data.fechaRetiro === 'undefined' || data.fechaRetiro == null ){
                  alert("Fecha de retiro no establecida")
                }

                if(data.fkcliente <0){
                  alert("Cliente no establecido");
                }

                if(productos===null){
                    alert("sin productos")
                }
             
                const _venta = {
                    ...data,
                    productos: productos,
                    total: total,
                    subtotal: subTotal,
                    tipo: "2"
                }

                alert(JSON.stringify(_venta))

                console.log(JSON.stringify(_venta))

                

                  //alert(post.insert.venta,_venta)
                  post_method(post.insert.venta,_venta,(response)=>{
                    alert(JSON.stringify(response.data))
                    
                    setIdVenta(response.data)
                    setPrintOpen(true)

                  })

            }}>
            <RecetaStockItems callback={callback} />
        </VentaBase>
        <Modal open={idVenta!=-1 && printOpen} onOk={()=>{setPrintOpen(false)}} onCancel={()=>{setPrintOpen(false)}} >
            <ImprimirSobreVenta idventa={idVenta} />
        </Modal>
    </>
    )
}
VentaRecetaStock.PageLayout = LayoutVentas;  