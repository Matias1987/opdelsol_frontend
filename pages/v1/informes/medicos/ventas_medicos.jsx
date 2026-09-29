import LayoutAdmin from "@/components/layout/layout_admin";
import dynamic from "next/dynamic";
const ListaVentasMedicosTotales = dynamic(
  () => import("@/components/informes/medicos/ventas_medicos_totales"),
  {
    ssr: false,
    loading: () => <div style={{ width:"100px" }}>&#9203;</div>,
  },
);
export default function ventas_medico() {
  return <ListaVentasMedicosTotales />;
}

ventas_medico.PageLayout = LayoutAdmin;
