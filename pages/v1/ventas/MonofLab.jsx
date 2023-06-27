import MonofLabItems from "@/components/forms/ventas/monof_lab/items";
import VentaBase from "../../../components/forms/ventas/VentaBase";
import LayoutVentas from "@/components/layout/layout_ventas";
import { useState } from "react";

export default function VentaMonofocalesLab(){
    const [productos, setProductos] = useState(null);
    const [total, setTotal] = useState(0);

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

        setTotal(total=>_total)

    }

    const onFinish = (v) => {
        alert(JSON.stringify(v))
        alert(JSON.stringify(productos))
    }

    return (<>
    <h3>Venta de Monofocales Laboratorio</h3>
    <VentaBase total={total} onfinish={onFinish}>
        <MonofLabItems callback={onProductosCallback}/>
    </VentaBase>
    </>)
}

VentaMonofocalesLab.PageLayout = LayoutVentas;  