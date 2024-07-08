import ListaTarjetas from "@/components/admin/ListaTarjetas";
import LayoutAdmin from "@/components/layout/layout_admin";

export default function ListaTarjetasAdmin(){
    return <>
        <h3>Tarjetas</h3>
        <ListaTarjetas />
    </>
}

ListaTarjetasAdmin.PageLayout = LayoutAdmin;  