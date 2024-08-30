import ListaProveedores from "@/components/admin/proveedor/ListaProveedores";
import layout_admin_proveedores from "@/components/layout/layout_admin_proveedores";

export default function lista_proveedores_admin(){
    return <>
        <ListaProveedores />
    </>
}

lista_proveedores_admin.PageLayout = layout_admin_proveedores; 