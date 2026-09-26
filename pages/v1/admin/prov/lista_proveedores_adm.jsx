import layout_admin_proveedores from "@/components/layout/layout_admin_proveedores";
import dynamic from "next/dynamic";

const ListaProveedores = dynamic(
  () => import("@/components/admin/proveedor/ListaProveedores"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>&#9203;Espere...</div>,
  },
);

export default function lista_proveedores_admin() {
  return (
    <>
      <ListaProveedores />
    </>
  );
}

lista_proveedores_admin.PageLayout = layout_admin_proveedores;
