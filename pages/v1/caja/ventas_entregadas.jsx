import LayoutVentasV2 from "@/components/layout/layout_ventas_v2";
import dynamic from "next/dynamic";

const ListaVentas = dynamic(() => import("@/components/informes/ventas/ListaVentas"), {
  ssr: false,
  loading: () => <div style={{ height: "300px" }}>Cargando...</div>,
});

export default function VentasEntregadas(){
    return (<>
    <ListaVentas titulo="Ventas Entregadas" estado={"ENTREGADO"} hideEstadoDeposito />
    </>)
}

VentasEntregadas.PageLayout = LayoutVentasV2;  
