import LayoutAdminMin from "@/components/layout/layout_admin_min";
import { Row, Col, Tabs } from "antd";

import dynamic from "next/dynamic";

const VentasTotalesSucursales = dynamic(
  () => import("@/components/admin/stock/VentasTotalesSucursales"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>Espere...</div>,
  },
);

export default function StockSucursalAdmin() {
  const tabsOptions = [
    {
      label: "Cantidades Vendidas",
      key: "3",
      children: <VentasTotalesSucursales />,
    },
  ];

  return (
    <>
      <Row>
        <Col span={24}></Col>
      </Row>
      <Row>
        <Col span={24}>
          <Tabs
            defaultActiveKey="1"
            type="card"
            size={"large"}
            items={tabsOptions}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}></Col>
      </Row>
    </>
  );
}

StockSucursalAdmin.PageLayout = LayoutAdminMin;
