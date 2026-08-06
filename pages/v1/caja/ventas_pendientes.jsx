import LayoutVentasV2 from "@/components/layout/layout_ventas_v2";
import dynamic from "next/dynamic";

const ListaVentas = dynamic(() => import("@/components/informes/ventas/ListaVentas"), {
  ssr: false,
  loading: () => <div style={{ height: "300px" }}>Cargando...</div>,
});

export default function VentasPendientes(){
    return (<><ListaVentas hideEstadoDeposito enviarALaboratorio  cobrar marcarTerminado en_laboratorio={0} accion="resfuerzo"  titulo="Ventas Pendientes" estado="PENDIENTE" buttonText="Resfuerzo Seña"  /></>)
}

VentasPendientes.PageLayout = LayoutVentasV2;  