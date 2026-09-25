import LayoutAdmin from "@/components/layout/layout_admin";
import { Tabs } from "antd";
import dynamic from "next/dynamic";

const ListaProveedores = dynamic(
  () => import("@/components/admin/proveedor/ListaProveedores"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>&#9203;</div>,
  },
);

const Proveedores = dynamic(
  () => import("@/components/admin/dashboard_components/proveedores"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>&#9203;</div>,
  },
);

export default function panel_proveedores() {
  const items = [
    {
      key: "1",
      label: "Lista de Proveedores",
      children: <ListaProveedores />,
    },
    {
      key: "2",
      label: "Listado por último pago",
      children: <Proveedores />,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} type="card" size="large" />
    </div>
  );
}

panel_proveedores.PageLayout = LayoutAdmin;
