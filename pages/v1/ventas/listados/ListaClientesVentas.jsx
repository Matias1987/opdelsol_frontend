import LayoutVentas from "@/components/layout/layout_ventas";
import dynamic from "next/dynamic";

const ListaClientes = dynamic(
  () => import("@/components/cliente/ListaClientes"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>&#9203; Espere...</div>,
  },
);

export default function ListaClientesVentas(){
    return <ListaClientes />
}

ListaClientesVentas.PageLayout = LayoutVentas;  