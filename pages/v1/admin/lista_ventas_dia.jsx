import LayoutAdmin from "@/components/layout/layout_admin";

import dynamic from "next/dynamic";
const ListaVentasDia = dynamic(
  () => import("@/components/admin/listaVentasDia"),
  { ssr: false },
);

export default function ListaVentasDiaVendedor() {
  return <ListaVentasDia />;
}

ListaVentasDiaVendedor.PageLayout = LayoutAdmin;
