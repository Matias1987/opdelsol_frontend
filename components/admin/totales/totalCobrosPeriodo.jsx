import { formatFloat } from "@/src/helpers/formatters";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Card, Col, DatePicker, Row, Table } from "antd";
import { useEffect, useState } from "react";

const TotalCobrosPeriodo = () => {
  const [data, setData] = useState(null);
  const [btnAplicarEnabled, setBtnAplicarEnabled] = useState(false);
  const [dates, setDates] = useState(null);
  const [reload, setReload] = useState(false);
  const columns = [
    { dataIndex: "modo_pago", title: "Modo de Pago" },
    { dataIndex: "total", title: <div style={{textAlign:"right"}}>Total</div>, render: (value) => <div style={{textAlign:"right"}}>$ {formatFloat(value)}</div> },
  ];

  const load = () => {
    if (dates == null) return;
    setBtnAplicarEnabled(false);
    post_method(
      post.total_cobros_tipo_periodo,
      { fecha_desde: dates[0], fecha_hasta: dates[1] },
      (response) => {
        setData(response.data);
        setBtnAplicarEnabled(true);
      }
    );
  };

  useEffect(() => {
    load();
  }, [reload]);

  const _parse = (str) => ({
    dia: str.substring(9, 11),
    mes: str.substring(6, 8),
    anio: str.substring(1, 5),
  });

  const _limpiar_fechas = (_) => {
    setDates(null);
  };

  const onDateChange = (val, dateStrings) => {
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    setBtnAplicarEnabled(true);

    if (val == null) {
      _limpiar_fechas();
      setData([]);
      return;
    }

    let from = _parse(JSON.stringify(val[0]));
    let to = _parse(JSON.stringify(val[1]));

    let date_from = new Date(from.anio, from.mes - 1, 1);
    let date_to = new Date(to.anio, to.mes - 1, "1");
    date_to.setMonth(date_to.getMonth() + 1);
    date_to.setDate(date_to.getDate() - 1);

    const _from_str = `${date_from.getFullYear()}-${
      date_from.getMonth() + 1
    }-${date_from.getDate()}`;
    const _to_str = `${date_to.getFullYear()}-${
      date_to.getMonth() + 1
    }-${date_to.getDate()}`;

    setDates([_from_str, _to_str]);
  };

  const onAplicarClick = () => {
    setBtnAplicarEnabled(false);
    setReload(!reload);
  };

  return (
    <Card title="Total Cobros Por Tipo y Período" size="small">
      <Row>
        <Col>
          <DatePicker.RangePicker
            onChange={onDateChange}
            prefix="Periodo:    "
            format="MM/YYYY"
            disabledTime={true}
            size="large"
            picker="month"
          />
        </Col>
        <Col>
          <Button size="large" disabled={!btnAplicarEnabled} onClick={onAplicarClick}>
            Aplicar
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ marginTop: "16px" }}>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            size="small"
          />
        </Col>
      </Row>
    </Card>
  );
};

export default TotalCobrosPeriodo;
