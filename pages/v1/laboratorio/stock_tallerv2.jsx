import LayoutLaboratorio from "@/components/layout/layout_laboratorio";
import dynamic from "next/dynamic";

const ModificarStock = dynamic(
  () => import("@/components/deposito/modificarStock"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
  },
);

export default function stock_taller() {
  return <ModificarStock />;
}

stock_taller.PageLayout = LayoutLaboratorio;
