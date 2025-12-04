import ListaVentas from "@/components/informes/ventas/ListaVentas";
import LayoutCaja from "@/components/layout/layout_caja";

export default function VentasPendientes(){
    return (<><ListaVentas hideEstadoDeposito enviarALaboratorio cobrar marcarTerminado en_laboratorio={0} accion="resfuerzo"  titulo="Ventas Pendientes" estado="PENDIENTE" buttonText="Resfuerzo Seña"  /></>)
}

VentasPendientes.PageLayout = LayoutCaja;  