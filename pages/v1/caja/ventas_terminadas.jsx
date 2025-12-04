import ListaVentas from "@/components/informes/ventas/ListaVentas";
import LayoutCaja from "@/components/layout/layout_caja";

export default function VentasTerminadas(){
    return (<>
    <ListaVentas resfuerzo hideEstadoDeposito cobrar accion="entrega" titulo="Ventas Terminadas" estado="TERMINADO" buttonText="Entrega" />
    </>)
}

VentasTerminadas.PageLayout = LayoutCaja;  