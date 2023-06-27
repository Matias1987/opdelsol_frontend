import VentaBase from "@/components/forms/ventas/VentaBase";
import VDItem from "@/components/forms/ventas/directa/Item";
import LayoutVentas from "@/components/layout/layout_ventas";
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