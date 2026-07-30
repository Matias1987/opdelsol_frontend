import LayoutVentasV2 from "@/components/layout/layout_ventas_v2";
import dynamic from "next/dynamic";

const ListaVentas = dynamic(() => import("@/components/informes/ventas/ListaVentas"), {
  ssr: false,
  loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
});

export default function VentasAnuladas() {
  return (
    <>
      <ListaVentas titulo="Ventas Anuladas" estado="ANULADO" />
    </>
  );
}

VentasAnuladas.PageLayout = LayoutVentasV2;
