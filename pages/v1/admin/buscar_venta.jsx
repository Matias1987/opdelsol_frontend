import LayoutAdmin from "@/components/layout/layout_admin";
import dynamic from "next/dynamic";

const BuscarVentaV3 = dynamic(
  () => import("@/components/forms/ventas/BuscarVentasV3"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
  },
);
export default function BuscarVentaAdmin() {
  return <BuscarVentaV3 />;
}

BuscarVentaAdmin.PageLayout = LayoutAdmin;  