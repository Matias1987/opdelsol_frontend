import LayoutAdmin from "@/components/layout/layout_admin";
import dynamic from "next/dynamic";

const ListadoCajasAdmin = dynamic(
  () => import("@/components/admin/caja/ListadoCajasAdmin"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>&#9203;</div>,
  },
);

export default function lista_cajas() {
    return <>
        <ListadoCajasAdmin />
    </>
}

lista_cajas.PageLayout = LayoutAdmin;