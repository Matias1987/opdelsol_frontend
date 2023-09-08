import ListaCobros from "@/components/forms/caja/ListaCobros";
import LayoutCaja from "@/components/layout/layout_caja";
import globals from "@/src/globals";

export default function ListaCobrosSucursal(){
    return <>
    <h3>Lista Cobros</h3>
        <ListaCobros idsucursal={globals.obtenerSucursal()} />
    </>  
}

ListaCobrosSucursal.PageLayout = LayoutCaja;  