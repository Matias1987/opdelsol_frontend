import LayoutVentasV2 from "@/components/layout/layout_ventas_v2";
import globals from "@/src/globals";
import dynamic from "next/dynamic";

const ListaCobros = dynamic(
  () => import("@/components/forms/caja/ListaCobros"),
  {
    ssr: false,
    loading: () => <div style={{ width:"100px" }}>Cargando...</div>,
  },
);

export default function ListaCobrosSucursal() {
  return (
    <>
      <ListaCobros idsucursal={globals.obtenerSucursal()} />
    </>
  );
}

ListaCobrosSucursal.PageLayout = LayoutVentasV2;
