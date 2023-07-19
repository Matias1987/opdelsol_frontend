import ListaVentas from "@/components/informes/ventas/ListaVentas";
import LayoutVentas from "@/components/layout/layout_ventas";

export default function VentasTerminadas(){
    return (<>
    <ListaVentas imprimir cobrar accion="entrega" titulo="Ventas Terminadas"  />
    </>)
}

VentasTerminadas.PageLayout = LayoutVentas;  