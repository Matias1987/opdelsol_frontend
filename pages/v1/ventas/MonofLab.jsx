import MonofLabItems from "@/components/forms/ventas/monof_lab/items";
import VentaBase from "../../../components/forms/ventas/VentaBase";
import LayoutVentas from "@/components/layout/layout_ventas";
import { useState } from "react";
import { post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";

export default function VentaMonofocalesLab(){
    const [productos, setProductos] = useState(null);
    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [venta, setVenta] = useState(null);

    const onProductosCallback = (_p) => {

        setProductos((productos)=>_p)
        var _total = _p?.lejos_od?.precio||0;
        _total += _p?.lejos_oi?.precio || 0;
        _total += _p?.lejos_armazon?.precio || 0;
        _total += _p?.lejos_tratamiento?.precio || 0;
        _total += _p?.cerca_od?.precio||0;
        _total += _p?.cerca_oi?.precio || 0;
        _total += _p?.cerca_armazon?.precio || 0;
        _total += _p?.cerca_tratamiento?.precio || 0;

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

    const onFinish = (v) => {
        alert(JSON.stringify(v))
        alert(JSON.stringify(productos))
        const venta = {
            ...v, 
            productos: productos, 
            tipo:"4", 
            total: total
        }
        console.log(JSON.stringify(venta))

        post_method(post.insert.venta,venta,(response)=>{
            alert(JSON.stringify(response.data))
          })
    }

    return (<>
    <h3>Venta de Monofocales Laboratorio</h3>
    <VentaBase subTotal={subTotal} total={total} onfinish={onFinish} callback={callback_venta_modif}>
        <MonofLabItems callback={onProductosCallback}/>
    </VentaBase>
    </>)
}

VentaMonofocalesLab.PageLayout = LayoutVentas;  