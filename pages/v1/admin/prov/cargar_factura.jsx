import AgregarFacturaV2 from "@/components/admin/factura/agregarFacturaV2";
import layout_admin_proveedores from "@/components/layout/layout_admin_proveedores";

export default function cargar_factura(){
    return <>
        <AgregarFacturaV2 />
    </>
}

cargar_factura.PageLayout = layout_admin_proveedores; 