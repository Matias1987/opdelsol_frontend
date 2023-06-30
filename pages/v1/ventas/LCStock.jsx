import LCStockItems from "@/components/forms/ventas/lc_stock/items";
import VentaBase from "../../../components/forms/ventas/VentaBase";
import LayoutVentas from "@/components/layout/layout_ventas";
import { useState } from "react";

export default function VentaLCStock(){
    const [total, setTotal] = useState(0);
    const [productos, setProductos] = useState(null);

    const onProductosChange = (_p) => {
        var _total = 0;
        _total+= _p?.od?.total||0;
        _total+= _p?.oi?.total||0;
        _total+= _p?.insumo?.total||0;
        setProductos(productos=>_p);
        setTotal(total=>_total)
    }

    const onFinish = (v) => {
        const venta = {
            ...v,productos: productos
        }
        console.log(JSON.stringify(v))
    }

    return (
        <>
        <h3>Venta de Lentes de Contacto Stock</h3>
        <VentaBase total={total} onfinish={onFinish}>
            <LCStockItems callback={onProductosChange} />
        </VentaBase>
        </>
        )
}

VentaLCStock.PageLayout = LayoutVentas;  