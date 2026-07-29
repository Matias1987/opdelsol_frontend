import LayoutCaja from "@/components/layout/layout_caja";

import dynamic from "next/dynamic";

const ListaVentas = dynamic(() => import("@/components/informes/ventas/ListaVentas"), {
  ssr: false,
  loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
});



export default function VentasEnLaboratorio(){
    return (<><ListaVentas cobrar accion="resfuerzo" en_laboratorio={1} titulo="Ventas Pendientes en Depósito" estado="PENDIENTE" buttonText="Resfuerzo Seña"  /></>)
}

VentasEnLaboratorio.PageLayout = LayoutCaja;  