import LayoutVentasV2 from "@/components/layout/layout_ventas_v2";

import dynamic from "next/dynamic";

const VentaMultipleMinorista = dynamic(
  () =>
    import("@/components/forms/trabajo_multiple/minorista/venta_multiple_minorista"),
  {
    ssr: false,
    loading: () => <div style={{ width: "300px" }}>Espere...</div>,
  },
);

export default function venta_m() {
  return <VentaMultipleMinorista />;
}

venta_m.PageLayout = LayoutVentasV2;
