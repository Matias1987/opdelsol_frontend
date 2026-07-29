import LayoutCaja from "@/components/layout/layout_caja";
import dynamic from "next/dynamic";

const ListaClientes = dynamic(
  () => import("@/components/cliente/ListaClientes"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
  },
);

export default function ListaClientesCaja() {
  return (
    <>
      <ListaClientes ficha />
    </>
  );
}

ListaClientesCaja.PageLayout = LayoutCaja;
