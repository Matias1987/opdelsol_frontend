import ListaCobros from "@/components/forms/caja/ListaCobros";
import LayoutCaja from "@/components/layout/layout_caja";
import globals from "@/src/globals";

export default function ListaCobrosSucursal(){
    return <>
    <h2>Lista Cobros</h2>
        <ListaCobros idsucursal={globals.obtenerSucursal()} />
    </>  
}

ListaCobrosSucursal.PageLayout = LayoutCaja;  