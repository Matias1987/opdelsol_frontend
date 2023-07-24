import ListaVentas from "@/components/informes/ventas/ListaVentas";
import LayoutVentas from "@/components/layout/layout_ventas";

export default function VentasEntregadas(){
    return (<>
    <ListaVentas imprimir titulo="Ventas Entregadas" estado={"ENTREGADO"} />
    </>)
}

VentasEntregadas.PageLayout = LayoutVentas;  
