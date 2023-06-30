import RecetaStockItems from "@/components/forms/ventas/receta_stock/Items"
import VentaBase from "../../../components/forms/ventas/VentaBase"
import { useState } from "react";
import LayoutVentas from "@/components/layout/layout_ventas";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";


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
             
                const _venta = {
                    ...data,
                    productos: productos,
                    total: total,
                    subtotal: subTotal,
                }

                const json = {
                    "fkcliente": 1,
                    "fkdestinatario": 2,
                    "fkmedico": -1,
                    "fkos": 3,
                    "mp": {
                      "efectivo_monto": "7888",
                      "tarjeta_monto": 10000,
                      "tarjeta_tarjeta": 1000,
                      "ctacte_monto": 0,
                      "ctacte_cuotas": 0,
                      "ctacte_monto_cuotas": 0,
                      "cheque_monto": 0,
                      "mutual_monto": 0,
                      "mutual_mutual": 0,
                      "total": 7888
                    },
                    "subtotal": 28500,
                    "descuento": 0,
                    "total": 28500,
                    "fechaRetiro": null,
                    "comentarios": "",
                    "productos": {
                      "lejos_od": null,
                      "lejos_oi": {
                        "tipo": "LEJOS_OD",
                        "codigo": "NX1COL3",
                        "eje": -1,
                        "precio": 9500
                      },
                      "lejos_armazon": null,
                      "lejos_tratamiento": null,
                      "cerca_od": null,
                      "cerca_oi": {
                        "tipo": "CERCA_OI",
                        "codigo": "NX1COL3",
                        "eje": -1,
                        "precio": 9500
                      },
                      "cerca_armazon": null,
                      "cerca_tratamiento": {
                        "codigo": "SH01C2",
                        "precio": 9500
                      }
                    }
                  }

                  alert(post.insert.venta,_venta)
                  post_method(post.insert.venta,json,(response)=>{
                    alert(JSON.stringify(response.data))
                  })

            }}>
            <RecetaStockItems callback={callback} />
        </VentaBase>
    </>
    )
}
VentaRecetaStock.PageLayout = LayoutVentas;  