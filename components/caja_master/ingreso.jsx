import { Button, Col, Input, Row, Select } from "antd";
import { useEffect } from "react";

const Ingreso = (props) => {
  const row_style = {
    padding: "6px",
  };

  useEffect(() => {
    // Fetch initial data or perform setup
  }, []);

  return (
    <>
      <Row style={row_style}>
        <Col span={24}>
          <Select
            style={{ width: "100%" }}
            prefix="Motivo:"
            options={[
              { label: "Caja 1", value: "1" },
              { label: "Caja 2", value: "2" },
              { label: "Caja 3", value: "3" },
            ]}
          />
        </Col>
      </Row>
      <Row style={row_style}>
        <Col span={24}>
          <Input prefix="Monto: " placeholder="Ingrese Monto.." type="number" />
        </Col>
      </Row>
      <Row style={row_style}>
        <Col span={24}>
          <Button type="primary">Agregar Ingreso</Button>
        </Col>
      </Row>
    </>
  );
};

export default Ingreso;
