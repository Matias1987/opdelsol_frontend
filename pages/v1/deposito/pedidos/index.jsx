import MyLayout from "@/components/layout/layout";
import AdminPedidos from "@/components/pedidos/lista_pedidos";
import { Col, Row, Tabs } from "antd";

export default function PedidosDeposito() {
  const tabItems = [
    {
      key: "1",
      label: "Recibidos",
      children: <AdminPedidos modo="interno" recibidos={1} />,
    },
    {
      key: "2",
      label: "Generados",
      children: <AdminPedidos modo="prov" enviados={1} />,
    },
  ];

  const handleTabChange = (key) => {
    console.log(`Switched to tab: ${key}`);
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Tabs
            defaultActiveKey="1"
            items={tabItems}
            onChange={handleTabChange}
          />
        </Col>
      </Row>
    </>
  );
}

PedidosDeposito.PageLayout = MyLayout;
