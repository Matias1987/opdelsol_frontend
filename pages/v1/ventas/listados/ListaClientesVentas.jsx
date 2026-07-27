import ListaClientes from "@/components/cliente/ListaClientes";
import LayoutVentas from "@/components/layout/layout_ventas";

export default function ListaClientesVentas(){
    return <ListaClientes />
}

ListaClientesVentas.PageLayout = LayoutVentas;  