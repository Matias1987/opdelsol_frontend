import LayoutDistribuidora from "@/components/layout/layout_distribuidora";
import dynamic from "next/dynamic";

const TrabajoMultifLab = dynamic(
  () => import("@/components/forms/ventas/trabajo/trab_multif_lab"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>&#9203;</div>,
  },
);

export default function multif_lab() {
  return <TrabajoMultifLab />;
}

multif_lab.PageLayout = LayoutDistribuidora;