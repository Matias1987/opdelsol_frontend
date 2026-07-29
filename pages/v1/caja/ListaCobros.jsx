import LayoutCaja from "@/components/layout/layout_caja";
import globals from "@/src/globals";
import dynamic from "next/dynamic";

const ListaCobros = dynamic(
  () => import("@/components/forms/caja/ListaCobros"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
  },
);

export default function ListaCobrosSucursal() {
  return (
    <>
      <ListaCobros idsucursal={globals.obtenerSucursal()} />
    </>
  );
}

ListaCobrosSucursal.PageLayout = LayoutCaja;
