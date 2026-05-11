import ListaDescuentosClientes from "@/components/cliente/descuentos/listaDescuentosClientes";
import LayoutAdmin from "@/components/layout/layout_admin";

export default function Descuentos(){
    return <>
    <ListaDescuentosClientes />
    </>;
}

Descuentos.PageLayout = LayoutAdmin;  
