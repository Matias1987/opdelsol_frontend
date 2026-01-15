import { Button, Card, Col, DatePicker, Row, Table } from "antd";
import { useEffect, useState } from "react";

const TotalesGastosPorSucursal = () => {
  const [data, setData] = useState(null);
  const [dates, setDates] = useState(null);
  const [reload, setReload] = useState(false);
  const [btnAplicarEnabled, setBtnAplicarEnabled] = useState(true);
  const columns = [
    {
      title: "Sucursal",
      dataIndex: "sucursal",
      key: "sucursal",
    },
    {
      title: "Total Gastos",
      dataIndex: "total_gastos",
      key: "total_gastos",
    },
  ];
  const load = () => {

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
    <>
    <Card title="Totales de Gastos por Sucursal" size="small">
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
          <Button
            size="large"
            disabled={!btnAplicarEnabled}
            onClick={onAplicarClick}
          >
            Aplicar
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            scroll={{ y: "500px" }}
            pagination={false}
            dataSource={data}
            columns={columns}
          />
        </Col>
      </Row>
      </Card>
    </>
  );
};

export default TotalesGastosPorSucursal;
