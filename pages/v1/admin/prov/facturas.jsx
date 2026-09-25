import layout_admin_proveedores from "@/components/layout/layout_admin_proveedores";
import dynamic from "next/dynamic";

const ListaFacturas = dynamic(
  () => import("@/components/admin/factura/listaFacturas"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>&#9203;</div>,
  },
);

export default function lista_facturas() {
  return (
    <>
      <ListaFacturas />
    </>
  );
}

lista_facturas.PageLayout = layout_admin_proveedores;
