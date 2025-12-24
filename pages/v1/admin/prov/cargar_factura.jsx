import AgregarFacturaV3 from "@/components/admin/factura/agregarFacturaV3";
import layout_admin_proveedores from "@/components/layout/layout_admin_proveedores";

export default function cargar_factura(){
    return <>
        <AgregarFacturaV3 />
    </>
}

cargar_factura.PageLayout = layout_admin_proveedores; 