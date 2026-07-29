import LayoutLaboratorio from "@/components/layout/layout_laboratorio";
import { idf_optica } from "@/src/config";
import dynamic from "next/dynamic";

const TestGridCreation = dynamic(
  () => import("@/components/etc/testGridCreation"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
  },
);
const DashboardTaller = dynamic(() => import("@/components/taller/dashboard"), {
  ssr: false,
  loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
});

export default function Index() {
  return <>{+idf_optica == 3 ? <TestGridCreation /> : <DashboardTaller />}</>;
}

Index.PageLayout = LayoutLaboratorio;
