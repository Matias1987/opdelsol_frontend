import LayoutVentasV2 from "@/components/layout/layout_ventas_v2";
import dynamic from "next/dynamic";

const ListaVentas = dynamic(() => import("@/components/informes/ventas/ListaVentas"), {
  ssr: false,
  loading: () => <div style={{ height: "300px" }}>Cargando...</div>,
});

export default function VentasTerminadas(){
    return (<>
    <ListaVentas resfuerzo hideEstadoDeposito enviarALaboratorio cobrar accion="entrega" titulo="Ventas Terminadas" estado="TERMINADO" buttonText="Entrega" />
    </>)
}

VentasTerminadas.PageLayout = LayoutVentasV2;  