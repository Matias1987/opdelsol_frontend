import ListadoCajasAdmin from "@/components/admin/caja/ListadoCajasAdmin";
import LayoutAdmin from "@/components/layout/layout_admin";

export default function lista_cajas() {
    return <>
        <ListadoCajasAdmin />
    </>
}

lista_cajas.PageLayout = LayoutAdmin;