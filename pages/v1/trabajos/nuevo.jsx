import LayoutDistribuidora from "@/components/layout/layout_distribuidora";
import dynamic from "next/dynamic";

const TrabajoMultiple = dynamic(
  () => import("@/components/forms/trabajo_multiple/venta_multiple"),
  {
    ssr: false,
    loading: () => <div style={{ width: "300px" }}>Espere...</div>,
  },
);
export default function nuevo_trabajo() {
    return <TrabajoMultiple />
}

nuevo_trabajo.PageLayout = LayoutDistribuidora;