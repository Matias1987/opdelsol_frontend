import RecetaStockItems from "@/components/forms/ventas/receta_stock/Items"
import VentaBase from "../../../components/forms/ventas/VentaBase"


export default function VentaRecetaStock(){

    var productos = null;

    return (
    <>
        <h2>Venta de Receta Stock</h2>
        <VentaBase onfinish={(data)=>{
                alert(JSON.stringify(data))
                alert(JSON.stringify(productos))
            }}>
            <RecetaStockItems callback={(data)=>{productos=data;}}/>
        </VentaBase>
    </>
    )
}