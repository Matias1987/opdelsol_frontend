import LayoutVentas from "@/components/layout/layout_ventas";

const { default: ListaClientes } = require("@/components/cliente/ListaClientes")

export default function ListaClientesVentas(){
    return <ListaClientes />
}

ListaClientesVentas.PageLayout = LayoutVentas;  