import TestGridCreation from "@/components/etc/testGridCreation";
import LayoutLaboratorio from "@/components/layout/layout_laboratorio";

export default function stock_cristales() {
  return (
    <>
      <TestGridCreation />
    </>
  );
}

//stock_cristales.PageLayout = MyLayout;
stock_cristales.PageLayout = LayoutLaboratorio;