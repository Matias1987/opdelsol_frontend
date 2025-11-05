import ListaVentasDia from "@/components/admin/listaVentasDia";
import ListaVentasMedicosTotales from "@/components/informes/medicos/ventas_medicos_totales";
import InformeVentasTotales from "@/components/informes/ventas/admin/totales";
import VentasSucursales from "@/components/informes/ventas/admin/ventas_sucursales";
import VentasVendedor from "@/components/informes/ventas/admin/ventas_vendedor";
import LayoutAdmin from "@/components/layout/layout_admin";
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
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} type="card" size="large" />
    </div>
  );
};
VentasAdminPanel.PageLayout = LayoutAdmin;  
export default VentasAdminPanel;
