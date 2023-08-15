import ListaVentas from "@/components/informes/ventas/ListaVentas";
import LayoutCaja from "@/components/layout/layout_caja";

export default function VentasAnuladas(){
    return (<>
    <ListaVentas titulo="Ventas Anuladas" estado="ANULADO" />
    </>)
}

VentasAnuladas.PageLayout = LayoutCaja;  