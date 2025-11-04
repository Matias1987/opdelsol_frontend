import  Proveedores  from "@/components/admin/dashboard_components/proveedores";
import  ListaProveedores  from "@/components/admin/proveedor/ListaProveedores";
import LayoutAdmin from "@/components/layout/layout_admin";
import { Tabs } from "antd";

export default function panel_proveedores(){
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
      <Tabs defaultActiveKey="2" items={items} type="card" size="large" />
    </div>
  );
    
}

panel_proveedores.PageLayout = LayoutAdmin;  