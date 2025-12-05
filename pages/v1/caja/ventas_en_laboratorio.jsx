import ListaVentas from "@/components/informes/ventas/ListaVentas";
import LayoutCaja from "@/components/layout/layout_caja";

export default function VentasEnLaboratorio(){
    return (<><ListaVentas cobrar accion="resfuerzo" en_laboratorio={1} titulo="Ventas Pendientes en Depósito" estado="PENDIENTE" buttonText="Resfuerzo Seña"  /></>)
}

VentasEnLaboratorio.PageLayout = LayoutCaja;  