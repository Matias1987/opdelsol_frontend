import ListaClientesAdmin from "@/components/admin/clientes/lista_clientes_admin";
import ListaMorososAdmin from "@/components/admin/clientes/lista_morosos_admin";
import ListaOpinionesClientes from "@/components/admin/clientes/lista_opiniones_clientes";
import LayoutAdmin from "@/components/layout/layout_admin";
import { Tabs } from "antd";

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
