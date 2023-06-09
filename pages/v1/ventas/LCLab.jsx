import LCLabItems from "@/components/forms/ventas/lc_laboratorio/items";
import VentaBase from "../../../components/forms/ventas/VentaBase";
import LayoutVentas from "@/components/layout/layout_ventas";
import { useState } from "react";
import { post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";

export default function VentaLCLab(){
    const [productos, setProductos] = useState(null);
    const [subTotal, setSubTotal] = useState(0);
    const [venta, setVenta] = useState(null);
    const [total, setTotal] = useState(0);

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

        const venta = {
            ...v,
            productos: productos, 
            tipo:"6", 
            total: total,
            subTotal: subTotal
        }
        console.log(JSON.stringify(venta))

        post_method(post.insert.venta,venta,(response)=>{
            alert(JSON.stringify(response.data))
          })

    }

    return (
    <>
    <h3>Venta de Lentes de Contacto Laboratorio</h3>
    <VentaBase subTotal={subTotal} total={total} onfinish={onFinish} callback={callback_venta_modif}>
        <LCLabItems callback={products_callback} />
    </VentaBase>
    </>
    )
}

VentaLCLab.PageLayout = LayoutVentas;  