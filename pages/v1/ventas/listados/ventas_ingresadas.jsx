import ListaVentas from "@/components/informes/ventas/ListaVentas";
import LayoutVentas from "@/components/layout/layout_ventas";

export default function VentasIngresadas(){
    return (<>
    <ListaVentas imprimir cobrar accion="ingreso" titulo="Ventas Ingresadas" estado="INGRESADO"/>
    </>)
}

VentasIngresadas.PageLayout = LayoutVentas;  