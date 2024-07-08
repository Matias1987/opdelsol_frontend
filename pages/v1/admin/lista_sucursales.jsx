import ListaSucursales from "@/components/admin/listaSucursales";
import LayoutAdmin from "@/components/layout/layout_admin";

export default function lista_sucursales( ){
    return <>
        <ListaSucursales />
    </>
}

lista_sucursales.PageLayout = LayoutAdmin;  