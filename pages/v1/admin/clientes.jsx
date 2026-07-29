import LayoutAdmin from "@/components/layout/layout_admin";
import { Tabs } from "antd";
import dynamic from "next/dynamic";

const ListaClientesAdmin = dynamic(
  () => import("@/components/admin/clientes/lista_clientes_admin"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
  },
);
const ListaMorososAdmin = dynamic(
  () => import("@/components/admin/clientes/lista_morosos_admin"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
  },
);
const ListaOpinionesClientes = dynamic(
  () => import("@/components/admin/clientes/lista_opiniones_clientes"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
  },
);

const ClientesAdminPanel = () => {
  const items = [
    {
      key: "1",
      label: "Lista Clientes",
      children: <ListaClientesAdmin />,
    },
    {
      key: "2",
      label: "Morosos",
      children: <ListaMorososAdmin />,
    },
    {
      key: "3",
      label: "Opiniones de Clientes",
      children: <ListaOpinionesClientes />,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} type="card" size="large" />
    </div>
  );
};
ClientesAdminPanel.PageLayout = LayoutAdmin;
export default ClientesAdminPanel;
