import LayoutAdmin from "@/components/layout/layout_admin";
import dynamic from "next/dynamic";

const ListaUsuarios = dynamic(
  () => import("@/components/admin/listaUsuarios"),
  {
    ssr: false,
    loading: () => <div style={{ width:"100px" }}>Cargando...</div>,
  },
);
export default function usuariostest(){
    return <ListaUsuarios />
}

usuariostest.PageLayout = LayoutAdmin;  