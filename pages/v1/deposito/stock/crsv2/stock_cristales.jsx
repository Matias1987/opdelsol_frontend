import LayoutLaboratorio from "@/components/layout/layout_laboratorio";
import dynamic from "next/dynamic";

const TestGridCreation = dynamic(
  () => import("@/components/etc/testGridCreation"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
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
