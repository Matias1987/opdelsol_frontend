

import ListaFacturas from "@/components/admin/factura/listaFacturas";
import LayoutLaboratorio from "@/components/layout/layout_laboratorio";

const lista_facturas_deposito = (props) => {
    

    return <>
    <ListaFacturas />
    </>
}
lista_facturas_deposito.PageLayout = LayoutLaboratorio;
export default  lista_facturas_deposito;