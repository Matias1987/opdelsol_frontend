import RecetaStockItems from "@/components/forms/ventas/receta_stock/Items"
import VentaBase from "../../../components/forms/ventas/VentaBase"
import { useState } from "react";
import LayoutVentas from "@/components/layout/layout_ventas";


export default function VentaRecetaStock(){
    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [venta, setVenta] = useState(null);
    const [productos, setProductos] = useState(null);
    
    const callback = (productos)=>{
        setProductos(productos)
        var _t = 0;
        _t += parseFloat(productos?.lejos_od?.precio||0);
        _t += parseFloat(productos?.lejos_oi?.precio||0);
        _t += parseFloat(productos?.lejos_armazon?.precio||0);
        _t += parseFloat(productos?.lejos_tratamiento?.precio||0);
        _t += parseFloat(productos?.cerca_od?.precio||0);
        _t += parseFloat(productos?.cerca_oi?.precio||0);
        _t += parseFloat(productos?.cerca_armazon?.precio||0);
        _t += parseFloat(productos?.cerca_tratamiento?.precio||0);
        setSubTotal(_t);
        setTotal(_t - (venta?.descuento||0));

    }

    return (
    <>
        <h2>Venta de Receta Stock</h2>
        <VentaBase total={total} 
        callback={(venta)=>{
            if(venta?.mp?.total>total)
            {
                alert("Monto a pagar mayor al total")
            }
        }}
        onfinish={(data)=>{
                if(data === null){
                    alert("venta is null!")
                    return;
                }
                if(productos===null){
                    alert("sin productos")
                }
             
                setVenta((venta)=>{
                    const _venta = {
                        ...data,
                        productos: productos,
                        total: total,
                        subtotal: subTotal,
                    }
                    alert(JSON.stringify(_venta));
                    console.log(JSON.stringify(_venta))
                    return _venta;
                })

            }}>
            <RecetaStockItems callback={callback} />
        </VentaBase>
    </>
    )
}
VentaRecetaStock.PageLayout = LayoutVentas;  