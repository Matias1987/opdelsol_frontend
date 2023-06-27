import MultifLabItems from "@/components/forms/ventas/multif_lab/Items";
import VentaBase from "../../../components/forms/ventas/VentaBase";
import LayoutVentas from "@/components/layout/layout_ventas";
import { useState } from "react";

export default function VentaMultifocalesLab(){
    const [total, setTotal] = useState(0)
    const [productos, setProductos] = useState(null)

    const onProductosCallback = (_productos) => {
        setProductos((productos)=>_productos)
        //calculate total

        const _total=0;
        _total += _productos?.od||0;
        _total += _productos?.oi||0;
        _total += _productos?.armazon||0;
        _total += _productos?.tratamiento||0;

        setTotal(total=>_total )

    }

    const onFinish = (v) => {}

    return (<>
    <h3>Venta de Multifocales Laboratorio</h3>
    <VentaBase total={total} onfinish={onFinish}>
        <MultifLabItems callback={onProductosCallback} />
    </VentaBase>
    </>)
}
VentaMultifocalesLab.PageLayout = LayoutVentas;  