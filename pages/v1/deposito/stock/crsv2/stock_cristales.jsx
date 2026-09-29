import LayoutLaboratorio from "@/components/layout/layout_laboratorio";
import dynamic from "next/dynamic";

const TestGridCreation = dynamic(
  () => import("@/components/etc/testGridCreation"),
  {
    ssr: false,
    loading: () => <div style={{ width:"100px" }}>Cargando...</div>,
  },
);

export default function stock_cristales() {
  return (
    <>
      <TestGridCreation />
    </>
  );
}

stock_cristales.PageLayout = LayoutLaboratorio;
