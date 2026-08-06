import LayoutVentasV2 from "@/components/layout/layout_ventas_v2";
import dynamic from "next/dynamic";

const ListaClientes = dynamic(
  () => import("@/components/cliente/ListaClientes"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>Cargando...</div>,
  },
);

export default function ListaClientesCaja() {
  return (
    <>
      <ListaClientes ficha />
    </>
  );
}

ListaClientesCaja.PageLayout = LayoutVentasV2;
