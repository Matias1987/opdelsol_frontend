import LayoutAdmin from "@/components/layout/layout_admin";

import dynamic from "next/dynamic";

const BuscarVenta = dynamic(
  () => import("@/components/forms/ventas/BuscarVenta"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
  },
);

const ListaVentasMedicosTotales = dynamic(
  () => import("@/components/informes/medicos/ventas_medicos_totales"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
  },
);

const VentasSucursales = dynamic(
  () => import("@/components/informes/ventas/admin/ventas_sucursales"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
  },
);

const VentasVendedor = dynamic(
  () => import("@/components/informes/ventas/admin/ventas_vendedor"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
  },
);

const ListaVentasDia = dynamic(
  () => import("@/components/admin/listaVentasDia"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>..::Loading::..</div>,
  },
);

import { Tabs } from "antd";

const VentasAdminPanel = () => {
  const items = [
    {
      key: "1",
      label: "Ventas Día",
      children: <ListaVentasDia />,
    },
    {
      key: "2",
      label: "Ventas Mes Por Sucursal",
      children: <VentasSucursales />,
    },
    {
      key: "3",
      label: "Ventas Mes Por Vendedor",
      children: <VentasVendedor />,
    },
    {
      key: "4",
      label: "Ventas Médicos",
      children: <ListaVentasMedicosTotales />,
    },
    {
      key: "5",
      label: "Buscar Ventas",
      children: <BuscarVenta />,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} type="card" size="large" />
    </div>
  );
};
VentasAdminPanel.PageLayout = LayoutAdmin;
export default VentasAdminPanel;
