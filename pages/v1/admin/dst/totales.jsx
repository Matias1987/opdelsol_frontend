import LayoutAdmin from "@/components/layout/layout_admin";
import { post_method } from "@/src/helpers/post_helper";
import { Card, Col, DatePicker, Row, Table } from "antd";
import { useState } from "react";

export default function totales_ventas() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState({ desde: "", hasta: "" });
  const columns = [];

  const _parse = (str) => ({
    dia: str.substring(9, 11),
    mes: str.substring(6, 8),
    anio: str.substring(1, 5),
  });

  const load = () => {
    setLoading(true);
    post_method("", null, (response) => {
      setLoading(false);
    });
  };

  const _limpiar_fechas = (_) => {
    setFiltros((_f) => ({ ..._f, desde: "", hasta: "" }));
  };

  const periodoDia = (val, dateString) => {
    if (val == null) {
      _limpiar_fechas();
      return;
    }

    let from = _parse(JSON.stringify(val[0]));
    let to = _parse(JSON.stringify(val[1]));

    setFiltros((_f) => ({
      ..._f,
      desde: `${from.anio}-${from.mes}-${from.dia}`,
      hasta: `${to.anio}-${to.mes}-${to.dia}`,
    }));
  };

  const aplicar_click = () => {
    load();
  };

  return (
    <>
      <Card>
        <Row>
          <Col>
            <DatePicker.RangePicker
              prefix="Días: "
              size="large"
              onChange={periodoDia}
            />
          </Col>
        </Row>
        <Row>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
        </Row>
        <Row>
          <Col>
            <Table
              loading={loading}
              dataSource={data}
              columns={columns}
              pagination={false}
              scroll={{ y: 300 }}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
}

totales_ventas.PageLayout = LayoutAdmin;
