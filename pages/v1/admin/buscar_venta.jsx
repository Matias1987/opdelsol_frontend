import LayoutAdmin from "@/components/layout/layout_admin";
import dynamic from "next/dynamic";

const BuscarVentaV3 = dynamic(
  () => import("@/components/forms/ventas/BuscarVentasV3"),
  {
    ssr: false,
    loading: () => <div style={{ width:"100px" }}>Cargando...</div>,
  },
);
export default function BuscarVentaAdmin() {
  return <BuscarVentaV3 />;
}

BuscarVentaAdmin.PageLayout = LayoutAdmin;  