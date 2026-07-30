import LayoutDistribuidora from "@/components/layout/layout_distribuidora";
import dynamic from "next/dynamic";

const ListadoVentasTM = dynamic(
  () => import("@/components/forms/trabajo_multiple/listado/listadoTM"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>&#9203;Cargando...</div>,
  },
);

export default function listado_trabajos() {
  return (
    <>
      <ListadoVentasTM />
    </>
  );
}

listado_trabajos.PageLayout = LayoutDistribuidora;
