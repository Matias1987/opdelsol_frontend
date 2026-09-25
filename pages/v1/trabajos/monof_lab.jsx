import LayoutDistribuidora from "@/components/layout/layout_distribuidora";
import dynamic from "next/dynamic";

const TrabajoMonofLab = dynamic(
  () => import("@/components/forms/ventas/trabajo/trab_monof_lab"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>&#9203;</div>,
  },
);

export default function MonofLab() {
    return <TrabajoMonofLab />;
}

MonofLab.PageLayout = LayoutDistribuidora;