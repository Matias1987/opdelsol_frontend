import VentaBase from "@/components/forms/ventas/VentaBase";
import VDItem from "@/components/forms/ventas/directa/Item";
import LayoutVentas from "@/components/layout/layout_ventas";

export default function VentaDirecta(){
    return (
    <>
        <h3>Venta Directa</h3>
        <VentaBase>
            <VDItem />
        </VentaBase>
    </>
    )
}

VentaDirecta.PageLayout = LayoutVentas;  