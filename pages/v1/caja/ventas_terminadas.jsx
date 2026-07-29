import LayoutCaja from "@/components/layout/layout_caja";
import dynamic from "next/dynamic";

const ListaVentas = dynamic(() => import("@/components/informes/ventas/ListaVentas"), {
  ssr: false,
  loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
});

export default function VentasTerminadas(){
    return (<>
    <ListaVentas resfuerzo hideEstadoDeposito enviarALaboratorio cobrar accion="entrega" titulo="Ventas Terminadas" estado="TERMINADO" buttonText="Entrega" />
    </>)
}

VentasTerminadas.PageLayout = LayoutCaja;  