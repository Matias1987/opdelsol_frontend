import LayoutDistribuidora from "@/components/layout/layout_distribuidora";
import dynamic from "next/dynamic";

const ListaClientesMayorista = dynamic(
  () => import("@/components/cliente/ListaClientesMayorista"),
  {
    ssr: false,
    loading: () => <div style={{ width:"100px" }}>&#9203; Cargando...</div>,
  },
);

export default function clientes(){
  return <ListaClientesMayorista />
}

clientes.PageLayout = LayoutDistribuidora;