import LCLabItems from "@/components/forms/ventas/lc_laboratorio/items";
import VentaBase from "../../../components/forms/ventas/VentaBase";
import LayoutVentas from "@/components/layout/layout_ventas";
import { useState } from "react";
import { post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";

export default function VentaLCLab(){
    const [productos, setProductos] = useState(null);
    const [total, setTotal] = useState(0);

    const products_callback  = (products) => {

        var _total = 0;
        _total+=products?.od?.precio||0;
        _total+=products?.oi?.precio||0;
        _total+=products?.insumo?.precio||0;

        setTotal(total=>_total)

        setProductos((productos)=>products)
        
    }

    const onFinish = (v) => {

        const venta = {
            ...v,
            productos: productos, 
            tipo:"6", 
            total: total
        }
        console.log(JSON.stringify(venta))

        post_method(post.insert.venta,venta,(response)=>{
            alert(JSON.stringify(response.data))
          })

    }

    return (
    <>
    <h3>Venta de Lentes de Contacto Laboratorio</h3>
    <VentaBase total={total} onfinish={onFinish}>
        <LCLabItems callback={products_callback} />
    </VentaBase>
    </>
    )
}

VentaLCLab.PageLayout = LayoutVentas;  