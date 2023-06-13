import LCStockItems from "@/components/forms/ventas/lc_stock/items";
import VentaBase from "../../../components/forms/ventas/VentaBase";
import LayoutVentas from "@/components/layout/layout_ventas";

export default function VentaLCStock(){
    return (
        <>
        <h3>Venta de Lentes de Contacto Stock</h3>
        <VentaBase>
            <LCStockItems />
        </VentaBase>
        </>
        )
}

VentaLCStock.PageLayout = LayoutVentas;  