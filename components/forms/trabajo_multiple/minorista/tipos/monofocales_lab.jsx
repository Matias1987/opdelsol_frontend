import HelperToolTip from "@/components/forms/ventas/common/HelperToolTip";
import SelectCodigoVenta from "@/components/forms/ventas/SelectCodigoVenta";
import globals from "@/src/globals";
import {
  Card,
  Col,
  Divider,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
  Tabs,
} from "antd";
import { useEffect, useState } from "react";
import DistanciaCristal from "./distancia_cristal";

const TipoMonofocalesLab = ({ callback, onComentariosChange }) => {
  const [trabajoStock, setTrabajoStock] = useState({
    lejos: null,
    cerca: null,
  });

  const tabItems = [
    {
      key: "1",
      label: "LEJOS",
      children: (
        <>
          <DistanciaCristal
            tipo={"lejos"}
            callback={(lejos) => {
              onChange("lejos", lejos);
            }}
          />
        </>
      ),
    },
    {
      key: "2",
      label: "CERCA",
      children: (
        <>
          <DistanciaCristal
            tipo={"cerca"}
            callback={(cerca) => {
              onChange("cerca", cerca);
            }}
          />
        </>
      ),
    },
  ];

  const onChangeTabs = (key) => {
    console.log(`Active tab key: ${key}`);
  };

  const onChange = (key, value) => {
    setTrabajoStock((t) => {
      const modif = { ...t, [key]: value };
      callback?.(modif, 0 /**  calculate total here... */);
      return modif;
    });
  };

  return (
    <>
      <Card
        size="small"
        title={<span style={{ color: "#262D42" }}>Monofocales Laboratorio</span>}
        style={{ boxShadow: "-1px 1px 1px 1px #9e9c9c" }}
      >
        <Tabs
          defaultActiveKey="1"
          items={tabItems}
          onChange={onChangeTabs}
          type="line"
        />
      </Card>{" "}
    </>
  );
};

export default TipoMonofocalesLab;
