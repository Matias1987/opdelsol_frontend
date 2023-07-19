import ListaVentas from "@/components/informes/ventas/ListaVentas";
import LayoutVentas from "@/components/layout/layout_ventas";

export default function VentasPendientes(){
    return (<><ListaVentas imprimir cobrar accion="resfuerzo"  titulo="Ventas Pendientes"  /></>)
}

VentasPendientes.PageLayout = LayoutVentas;  