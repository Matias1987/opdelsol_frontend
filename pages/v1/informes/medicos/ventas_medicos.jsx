import ListaVentasMedicosTotales from "@/components/informes/medicos/ventas_medicos_totales";
import LayoutAdmin from "@/components/layout/layout_admin";

export default function ventas_medico(){
    return <ListaVentasMedicosTotales />
}

ventas_medico.PageLayout = LayoutAdmin;  