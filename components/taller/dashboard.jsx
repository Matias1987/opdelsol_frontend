import { Card, Col, Row, Tabs } from "antd";
import ListaOperacionesTotal from "./lista_operaciones_total";
import LisaOperacionesPedidos from "./lista_operaciones_pedidos";
import LisaOperacionesCalibrado from "./lista_operaciones_calibrado";
import ListaOperacionesLab from "./lista_operaciones_laboratorio";
import { useState } from "react";

const DashboardTaller = () => {
  const [selectedTab, setSelectedTab] = useState("1");
  const items = [
    {
      key: "1",
      label: <span style={{color:"#012c04", fontWeight:"600"}}>Todas Las Operaciones</span>,
      children: (
        <>
          <ListaOperacionesTotal />
        </>
      ),
    },
    {
      key: "2",
      label: <span style={{color:"#F0581C", fontWeight:"600"}}>Pedidos</span>,
      children: (
        <>
          <LisaOperacionesPedidos />
        </>
      ),
    },
    {
      key: "3",
      label: <span style={{color:"#00790a", fontWeight:"600"}}>Calibrado</span>,
      children: (
        <>
          <LisaOperacionesCalibrado />
        </>
      ),
    },
    {
      key: "4",
      label: <span style={{color:"#f01c27", fontWeight:"600"}}>Laboratorio</span>,
      children: (
        <>
          <ListaOperacionesLab />
        </>
      ),
    },
  ];

  const onChange = (nro) => {
    setSelectedTab(nro);
  };

  const get_color = () => {
    switch (selectedTab) {
      case "2":
        return "orange";
      case "3":
        return "#D8FFB2";
      case "4":
        return "#D3B0D3";
      default:
        return "#D8D8D8";
    }
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Card>
            <Row>
              <Col span={24}>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardTaller;
