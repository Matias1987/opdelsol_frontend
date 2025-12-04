import { Button, Card, Col, Input, Row, Tabs } from "antd";
import ListaOperacionesTotal from "./lista_operaciones_total";
import SucursalSelect from "../SucursalSelect";
import { SearchOutlined } from "@ant-design/icons";
import LisaOperacionesPedidos from "./lista_operaciones_pedidos";
import LisaOperacionesCalibrado from "./lista_operaciones_calibrado";
import ListaOperacionesLab from "./lista_operaciones_laboratorio";
import ListaOperacionesTerminadasTaller from "./lista_operaciones_terminadas_taller";
import { useState } from "react";

const DashboardTaller = () => {
    const [selectedTab, setSelectedTab] =  useState("1");
  const items = [
    {
      key: "1",
      label: "Todas las Operaciones",
      children: <><ListaOperacionesTotal /></>,
    },
    {
      key: "2",
      label: "Pedidos",
      children: <><LisaOperacionesPedidos /></>,
    },
    {
      key: "3",
      label: "Calibrado",
      children: <><LisaOperacionesCalibrado /></>,
    },
    {
      key: "4",
      label: "Laboratorio",
      children: <><ListaOperacionesLab /></>,
    }
  ];

  const onChange = nro =>{setSelectedTab(nro)}

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
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <Card style={{backgroundColor:get_color()}}>
            
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
