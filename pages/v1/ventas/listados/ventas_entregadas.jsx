import ListaVentas from "@/components/informes/ventas/ListaVentas";
import LayoutVentas from "@/components/layout/layout_ventas";

export default function VentasEntregadas(){
    return (<>
    <ListaVentas imprimir adelanto  titulo="Ventas Entregadas"/>
    </>)
}

VentasEntregadas.PageLayout = LayoutVentas;  
