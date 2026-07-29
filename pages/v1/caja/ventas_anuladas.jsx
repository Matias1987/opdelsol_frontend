import LayoutCaja from "@/components/layout/layout_caja";
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

VentasAnuladas.PageLayout = LayoutCaja;
