import ClientesMorosos from "@/components/admin/clientes/clientes_morosos";
import LayoutVentasV2 from "@/components/layout/layout_ventas_v2";

export default function clientes_morosos(){
    return <ClientesMorosos />
}

clientes_morosos.PageLayout = LayoutVentasV2;  