import ListaVentas from "@/components/informes/ventas/ListaVentas";
import LayoutCaja from "@/components/layout/layout_caja";

export default function VentasPendientes(){
    return (<><ListaVentas imprimir cobrar marcarTerminado accion="resfuerzo"  titulo="Ventas Pendientes" estado="PENDIENTE" buttonText="Resfuerzo"  /></>)
}

VentasPendientes.PageLayout = LayoutCaja;  