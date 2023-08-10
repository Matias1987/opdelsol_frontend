import ListaVentas from "@/components/informes/ventas/ListaVentas";
import LayoutCaja from "@/components/layout/layout_caja";

export default function VentasIngresadas(){
    return (<>
    <ListaVentas imprimir cobrar accion="ingreso" titulo="Ventas Ingresadas" estado="INGRESADO" buttonText="Cobrar"/>
    </>)
}

VentasIngresadas.PageLayout = LayoutCaja;  