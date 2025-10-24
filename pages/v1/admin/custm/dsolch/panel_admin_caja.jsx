import ListadoCajasAdmin from "@/components/admin/caja/ListadoCajasAdmin";
import CajaMaster from "@/components/caja_master/caja_master";
import ListadoCajaSucursales from "@/components/caja_master/listado_caja_sucursales";
import LayoutAdmin from "@/components/layout/layout_admin";
import { Tabs } from "antd";

export default function PanelAdminCaja() {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Caja Central",
      children: <CajaMaster />,
    },
    {
      key: "2",
      label: "Caja Sucursales Pendientes",
      children: <ListadoCajaSucursales />,
    },
    {
      key: "3",
      label: "Cajas por Día",
      children: <ListadoCajasAdmin />,
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
}

PanelAdminCaja.PageLayout = LayoutAdmin;
