import ExportToExcel from "@/components/etc/ExportToExcel";
import SucursalSelect from "@/components/SucursalSelect";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Row, DatePicker, Table, Col, Checkbox, Button, Card } from "antd";
import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;
var Excel = require("exceljs");

const InformeTarjetas = (props) => {
  const [data, setData] = useState([]);
  const [filtroFechaDisabled, setFiltroFechaDisabled] = useState(false);
  const [filtros, setFiltros] = useState({
    fecha_desde: "",
    fecha_hasta: "",
    sucursal: -1,
  });

  const columns = [
    { title: "Tarjeta", dataIndex: "tarjeta" },
    {
      title: <div style={{ textAlign: "right" }}>Monto</div>,
      render: (text, record) => (
        <div style={{ textAlign: "right" }}>{record.monto}</div>
      ),
    },
  ];

  const _parse = (str) => ({
    dia: str.substring(9, 11),
    mes: str.substring(6, 8),
    anio: str.substring(1, 5),
  });
  const _limpiar_fechas = (_) => {
    setFiltros((_f) => ({ ..._f, fecha_desde: "", fecha_hasta: "" }));
  };

  const load = () => {
    let _desde = filtros.fecha_desde;
    let _hasta = filtros.fecha_hasta;
    
    if (!filtroFechaDisabled && (filtros.fecha_desde == "" || filtros.fecha_hasta == "")) {
      alert("Por favor, complete las fechas.");
      return;
    }
    if(filtroFechaDisabled)
    {
       _desde = "";
       _hasta = "";
    }
    //alert(JSON.stringify(filtros));

    //alert(post.total_tarjetas_periodo)
    post_method(post.total_tarjetas_periodo, {...filtros, fecha_desde: _desde, fecha_hasta: _hasta}, (response) => {
      //alert(JSON.stringify(response.data));
      setData(response.data);
    });
  };

  const periodoMes = (val, dateString) => {
    if (val == null) {
      _limpiar_fechas()
      return;
    }

    let from = _parse(JSON.stringify(val[0]));
    let to = _parse(JSON.stringify(val[1]));

    let date_from = new Date(from.anio, from.mes - 1, 1);
    let date_to = new Date(to.anio, to.mes - 1, "1");
    date_to.setMonth(date_to.getMonth() + 1);
    date_to.setDate(date_to.getDate() - 1);

    setFiltros((_f) => ({
      ..._f,

      fecha_desde: `${date_from.getFullYear()}-${
        date_from.getMonth() + 1
      }-${date_from.getDate()}`,
      fecha_hasta: `${date_to.getFullYear()}-${
        date_to.getMonth() + 1
      }-${date_to.getDate()}`,
    }));
  };

 
  return (
    <>
      <Card title="Informe de Tarjetas" size="small">
        <Row gutter={16} style={{ paddingBottom: "10px" }}>
          <Col style={{ paddingTop: "5px" }}>
            <Checkbox
              checked={!filtroFechaDisabled}
              onChange={(e) => {setFiltroFechaDisabled(!e.target.checked)}}
            >
              Filtrar por Fecha
            </Checkbox>
          </Col>
          <Col>
            <RangePicker
              format="MM/YYYY"
              disabledTime={true}
              size="middle"
              disabled={filtroFechaDisabled}
              picker="month"
              onChange={periodoMes}
            />
          </Col>
          <Col>
            <SucursalSelect
              callback={(s) => {
                setFiltros((prev) => ({ ...prev, sucursal: s }));
              }}
            />
          </Col>
          <Col>
          <Button type="primary" onClick={load}>
              Aplicar Filtros
            </Button>
          </Col>
          <Col>
            <ExportToExcel
              data={data.map((item) => ({
                id: item.idtarjeta,
                tarjeta: item.tarjeta,
                monto: item.monto,
              }))}
              columns={[
                {
                  header: "Tarjeta",
                  key: "tarjeta",
                  width: 20,
                },
                {
                  header: "Monto",
                  key: "monto",
                  width: 20,
                },
              ]}
              fileName={
                "Informe_Tarjetas_" + new Date().toISOString().slice(0, 10)
              }
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              dataSource={data}
              columns={columns}
              pagination={false}
              scroll={{ y: "400px" }}
              summary={(data) => {
                var total = 0;
                data.forEach((item) => {
                  total += item.monto;
                });
                return (
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="right">
                      {total.toFixed(2)}
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                );
              }}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default InformeTarjetas;
