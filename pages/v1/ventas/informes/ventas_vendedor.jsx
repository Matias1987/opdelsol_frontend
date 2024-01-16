import VentasVendedor from "@/components/informes/ventas/VentasVendedor";
import LayoutVentas from "@/components/layout/layout_ventas";

export default function ventas_vendedor(){
    return <VentasVendedor />
}

VentasVendedor.PageLayout = LayoutVentas;  