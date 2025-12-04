import ListaVentas from "@/components/informes/ventas/ListaVentas";
import LayoutCaja from "@/components/layout/layout_caja";

export default function VentasIngresadas(){
    return (<>
    <ListaVentas hideEstadoDeposito pagination={false} imprimir anular cobrar accion="ingreso" titulo="Ventas Ingresadas" estado="INGRESADO" buttonText="Dar Ingreso"/>
    </>)
}

VentasIngresadas.PageLayout = LayoutCaja;  