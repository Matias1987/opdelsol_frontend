import VentaBase from "@/components/forms/ventas/VentaBase";
import VDItem from "@/components/forms/ventas/directa/Item";
import LayoutVentas from "@/components/layout/layout_ventas";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { useState } from "react";

export default function VentaDirecta(){
    const [venta, setVenta] = useState(null)
    const [productos, setProductos] = useState(null)
    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);

    const callback_venta_modif = (_venta) => {
        setVenta((v)=>{
            var dto = _venta.descuento 
            setTotal((_total)=>(subTotal - dto));
            return _venta;
        })
    }

    return (
    <>
        <h3>Venta Directa</h3>
        <VentaBase 
        subTotal={subTotal}
        total={total}

        callback={callback_venta_modif}
        onfinish={
            (v)=>{

                alert(JSON.stringify(v))
                alert(JSON.stringify(productos))

                const __venta = {
                    ...v, 
                    productos:productos, 
                    tipo:"1", 
                    total: total,
                    subTotal: subTotal,
                }
                
                console.log(JSON.stringify(__venta))

                post_method(post.insert.venta,__venta,(response)=>{
                    alert(JSON.stringify(response.data))
                    })
            }
        }
             >
            <VDItem 
                callback={
                    (prod)=>{
                        setProductos(productos=>(prod))
                        var t =0;
                        prod.forEach(p=>{
                            t+=p.total;
                        })
                        setSubTotal(st=>t);
                        var dto = typeof venta === 'undefined' ? 0 : venta?.descuento||0 
                        setTotal((_total)=>(t - dto));
                    }
                }
            />
        </VentaBase>
    </>
    )
}

VentaDirecta.PageLayout = LayoutVentas;  