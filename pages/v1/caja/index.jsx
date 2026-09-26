import LayoutVentasV2 from "@/components/layout/layout_ventas_v2";
import dynamic from "next/dynamic";

const DashboardCajaV2 = dynamic(
  () => import("@/components/forms/caja/caja_dashboard"),
  { ssr: false },
);

export default function Index() {
  return (
    <>
      <DashboardCajaV2 />
    </>
  );
}

Index.PageLayout = LayoutVentasV2;
