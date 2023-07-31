import ListaCobros from "@/components/forms/caja/ListaCobros";
import LayoutCaja from "@/components/layout/layout_caja";

export default function ListaCobrosSucursal(){
    return <>
    <h3>Lista Cobros</h3>
        <ListaCobros />
    </>  
}

ListaCobrosSucursal.PageLayout = LayoutCaja;  