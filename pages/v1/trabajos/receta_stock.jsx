import LayoutDistribuidora from "@/components/layout/layout_distribuidora";
import dynamic from "next/dynamic";

const TrabajoRecetaStock = dynamic(
  () => import("@/components/forms/ventas/trabajo/trab_receta_stock"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
  },
);
export default function RecetaStock(){
    return <TrabajoRecetaStock />;
}

RecetaStock.PageLayout = LayoutDistribuidora;