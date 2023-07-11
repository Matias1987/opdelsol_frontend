import LCStockItems from "@/components/forms/ventas/lc_stock/items";
import VentaBase from "../../../components/forms/ventas/VentaBase";
import LayoutVentas from "@/components/layout/layout_ventas";
import { useState } from "react";
import { post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";

export default function VentaLCStock(){
    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [venta, setVenta] = useState(null);
    const [productos, setProductos] = useState(null);

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
        const venta = {
            ...v, 
            productos: productos, 
            tipo:"3", 
            total: total,
            subTotal: subTotal,
        }
        console.log(JSON.stringify(venta))

        post_method(post.insert.venta,venta,(response)=>{
            alert(JSON.stringify(response.data))
          })
    }

    const callback_venta_modif = (_venta) => {
        setVenta((v)=>{
            setTotal((_total)=>(subTotal - _venta.descuento));
            return _venta;
        })
    }

    return (
        <>
        <h3>Venta de Lentes de Contacto Stock</h3>
        <VentaBase subTotal={subTotal} total={total} onfinish={onFinish} callback={callback_venta_modif}>
            <LCStockItems callback={onProductosChange} />
        </VentaBase>
        </>
        )
}

VentaLCStock.PageLayout = LayoutVentas;  