import MultifLabItems from "@/components/forms/ventas/multif_lab/Items";
import VentaBase from "../../../components/forms/ventas/VentaBase";
import LayoutVentas from "@/components/layout/layout_ventas";
import { useState } from "react";
import { post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";

export default function VentaMultifocalesLab(){
    const [total, setTotal] = useState(0)
    const [productos, setProductos] = useState(null)
    const [subTotal, setSubTotal] = useState(0);
    const [venta, setVenta] = useState(null);

    const onProductosCallback = (_productos) => {
        setProductos((productos)=>_productos)
        //calculate total

        var _total=0;
        _total += _productos?.od?.precio||0;
        _total += _productos?.oi?.precio||0;
        _total += _productos?.armazon?.precio||0;
        _total += _productos?.tratamiento?.precio||0;

        setSubTotal(st=>_total)

        var dto = typeof venta === 'undefined' ? 0 : venta?.descuento||0 

        setTotal(total=>(_total - dto))

        setProductos((productos)=>_productos)

    }

    const callback_venta_modif = (_venta) => {
        setVenta((v)=>{
            setTotal((_total)=>(subTotal - _venta.descuento));
            return _venta;
        })
    }

    const onFinish = (v) => {
        const venta = {
            ...v,
            productos: productos,
            tipo:"5",
            total: total
        }
        console.log(JSON.stringify(venta))

        post_method(post.insert.venta,venta,(response)=>{
            alert(JSON.stringify(response.data))
          })
    }

    return (<>
    <h3>Venta de Multifocales Laboratorio</h3>
    <VentaBase subTotal={subTotal} total={total} onfinish={onFinish} callback={callback_venta_modif}>
        <MultifLabItems callback={onProductosCallback} />
    </VentaBase>
    </>)
}
VentaMultifocalesLab.PageLayout = LayoutVentas;  