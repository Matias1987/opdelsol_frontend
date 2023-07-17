import ListaVentas from "@/components/informes/ventas/ListaVentas";
import LayoutVentas from "@/components/layout/layout_ventas";

export default function VentasIngresadas(){
    return (<>
    <ListaVentas imprimir titulo="Ventas Ingresadas"/>
    </>)
}

VentasIngresadas.PageLayout = LayoutVentas;  