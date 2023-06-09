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

    return (
    <>
        <h3>Venta Directa</h3>
        <VentaBase 
        
        total={total}

        callback={(v)=>{
                setVenta((venta)=>{
                    return v;
                })
                }
            }
        onfinish={
            (v)=>{

                alert(JSON.stringify(v))
                alert(JSON.stringify(productos))

                const __venta = {
                    ...v, 
                    productos:productos, 
                    tipo:1, 
                    total: total
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
                        setTotal(total=>t);
                    }
                }
            />
        </VentaBase>
    </>
    )
}

VentaDirecta.PageLayout = LayoutVentas;  