import LayoutAdmin from "@/components/layout/layout_admin";
import { Tabs } from "antd";
import { useState } from "react";
import dynamic from "next/dynamic";

const ListadoCajasAdmin = dynamic(
  () => import("@/components/admin/caja/ListadoCajasAdmin"),
  {
    ssr: false,
    loading: () => <div style={{ width: "300px" }}>Espere...</div>,
  },
);
const CajaMaster = dynamic(
  () => import("@/components/caja_master/caja_master"),
  {
    ssr: false,
    loading: () => <div style={{ width: "300px" }}>Espere...</div>,
  },
);
const ListadoCajaSucursales = dynamic(
  () => import("@/components/caja_master/listado_caja_sucursales"),
  {
    ssr: false,
    loading: () => <div style={{ width: "300px" }}>Espere...</div>,
  },
);

export default function PanelAdminCaja() {
  const [reload, setReload] = useState(false);
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Caja Central",
      children: <CajaMaster updateData={reload} />,
    },
    {
      key: "2",
      label: "Caja Sucursales Pendientes",
      children: (
        <ListadoCajaSucursales onModificationDone={(_) => setReload(!reload)} />
      ),
    },
    {
      key: "3",
      label: "Cajas por Día",
      children: <ListadoCajasAdmin />,
    },
  ];

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        size="large"
        type="card"
      />
    </>
  );
}

PanelAdminCaja.PageLayout = LayoutAdmin;
