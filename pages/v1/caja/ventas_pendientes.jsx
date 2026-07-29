import LayoutCaja from "@/components/layout/layout_caja";
import dynamic from "next/dynamic";

const ListaVentas = dynamic(() => import("@/components/informes/ventas/ListaVentas"), {
  ssr: false,
  loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
});

export default function VentasPendientes(){
    return (<><ListaVentas hideEstadoDeposito enviarALaboratorio  cobrar marcarTerminado en_laboratorio={0} accion="resfuerzo"  titulo="Ventas Pendientes" estado="PENDIENTE" buttonText="Resfuerzo Seña"  /></>)
}

VentasPendientes.PageLayout = LayoutCaja;  