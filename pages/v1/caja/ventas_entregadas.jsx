import ListaVentas from "@/components/informes/ventas/ListaVentas";
import LayoutCaja from "@/components/layout/layout_caja";

export default function VentasEntregadas(){
    return (<>
    <ListaVentas imprimir titulo="Ventas Entregadas" estado={"ENTREGADO"} />
    </>)
}

VentasEntregadas.PageLayout = LayoutCaja;  
