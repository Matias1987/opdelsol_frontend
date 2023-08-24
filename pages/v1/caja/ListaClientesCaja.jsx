import LayoutCaja from "@/components/layout/layout_caja";

const { default: ListaClientes } = require("@/components/ListaClientes")

export default function ListaClientesCaja(){
    return <ListaClientes ficha />
}


ListaClientesCaja.PageLayout = LayoutCaja;  