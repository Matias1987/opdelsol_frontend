import LayoutVentasV2 from "@/components/layout/layout_ventas_v2";
import dynamic from "next/dynamic";

const ListaVentas = dynamic(() => import("@/components/informes/ventas/ListaVentas"), {
  ssr: false,
  loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
});
export default function VentasIngresadas(){
    return (<>
    <ListaVentas hideEstadoDeposito pagination={false} imprimir anular cobrar accion="ingreso" titulo="Ventas Ingresadas" estado="INGRESADO" buttonText="Dar Ingreso"/>
    </>)
}

VentasIngresadas.PageLayout = LayoutVentasV2;  