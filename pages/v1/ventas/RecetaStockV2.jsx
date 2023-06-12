import RecetaStockItems from "@/components/forms/ventas/receta_stock/Items"
import VentaBase from "../../../components/forms/ventas/VentaBase"
import { useState } from "react";


export default function VentaRecetaStock(){
    const [total, setTotal] = useState(0);
    var productos = null;
    const onChangePrecio = (productos)=>{
        alert(JSON.stringify(productos))
        var _t = 0;
        _t += productos.lejos_od === null ? 0 : parseFloat(productos.lejos_od.precio);
        _t += productos.lejos_oi === null ? 0 : parseFloat(productos.lejos_oi.precio);
        _t += productos.lejos_armazon === null ? 0 : parseFloat(productos.lejos_armazon.precio);
        _t += productos.lejos_tratamiento === null ? 0 : parseFloat(productos.lejos_tratamiento.precio);
        _t += productos.cerca_od === null ? 0 : parseFloat(productos.cerca_od.precio);
        _t += productos.cerca_oi === null ? 0 : parseFloat(productos.cerca_oi.precio);
        _t += productos.cerca_armazon === null ? 0 : parseFloat(productos.cerca_armazon.precio);
        _t += productos.cerca_tratamiento === null ? 0 : parseFloat(productos.cerca_tratamiento.precio);
        //alert(prod.precio)
        setTotal(_t );
    }

    return (
    <>
        <h2>Venta de Receta Stock</h2>
        <VentaBase total={total} onfinish={(data)=>{
                alert(JSON.stringify(data))
                alert(JSON.stringify(productos))
            }}>
            <RecetaStockItems callback={onChangePrecio} />
        </VentaBase>
    </>
    )
}