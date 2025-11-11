import { get } from "@/src/urls";
import { Button, Card, Col, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";

const AgregarDeuda = (props) => {
  const [motivos, setMotivos] = useState([]);
  const load = (_) => {
    fetch(get.conceptos_gasto)
      .then((response) => response.json())
      .then((response) => {
        setMotivos(
          response.data.map((r) => ({
            value: r.idconcepto_gasto,
            label: r.nombre,
          }))
        );
      });
  };

  useEffect(() => {
    load();
  }, []);

  const row_style = {
    padding:"16px"
  }

  return (
    <>
      <Card>
        <Row gutter={16} style={row_style}>
          <Col>Monto:</Col>
          <Col>
            <Input style={{width:"300px"}} />
          </Col>
        </Row>
        <Row gutter={16} style={row_style}>
          <Col>Motivo: </Col>
          <Col>
          <Select
            style={{ width: "300px" }}
            options={motivos}
            placeholder="Seleccione Motivo"
            onChange={(value) => setEgreso({ ...egreso, idMotivo: value })}
          />
          </Col>
        </Row>
        <Row>
            <Col>
            <Button>Guardar</Button>
            </Col>
        </Row>
      </Card>
    </>
  );
};

export default AgregarDeuda;
