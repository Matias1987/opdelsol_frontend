import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Input,
  Row,
  Select,
  Table,
} from "antd";
import { useState } from "react";

const InformeVentasFiltros = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [cbPrecioChecked, setCbPrecioChecked] = useState(false);
  const [cbDateChecked, setCbDateChecked] = useState(false);
  const [modoPrecio, setModoPrecio] = useState(0);
  const [btnAplicarEnabled, setBtnAplicarEnabled] = useState(true);
  const columns = [
    { title: "Nro." },
    { title: "Fecha" },
    { title: "Cliente" },
    { title: "Vendedor" },
    { title: "Tipo" },
    { title: "Monto" },
  ];

  /**
   * fecha desde - hasta
   * monto mayor a
   * monto igual a
   */
  const filtros = (_) => (
    <>
      <Row style={{ paddingBottom: "8px" }}>
        <Col style={{ textAlign: "left" }} span={24}>
          <span style={{ fontWeight: "bolder" }}>Ventas</span>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col>Filtros: </Col>
        <Col>
          <DatePicker.RangePicker
            disabled={!cbDateChecked}
            prefix={
              <Checkbox
                checked={cbDateChecked}
                onChange={(_) => {
                  setCbDateChecked(!cbDateChecked);
                }}
              >
                Per&iacute;odo:
              </Checkbox>
            }
          />
        </Col>

        <Col>
          <Select
            value={0}
            onChange={(v) => {
              setModoPrecio(v);
            }}
            disabled={!cbPrecioChecked}
            prefix={
              <>
                <Checkbox
                  checked={cbPrecioChecked}
                  onChange={(__) => {
                    setCbPrecioChecked(!cbPrecioChecked);
                  }}
                >
                  Precio:
                </Checkbox>
              </>
            }
            style={{ width: "300px" }}
            options={[
              { label: "Igual a", value: 0 },
              { label: "Mayor a", value: 1 },
              { label: "Menor a", value: 2 },
            ]}
          />
        </Col>
        <Col>
          <Input
            prefix="Valor:"
            disabled={!cbPrecioChecked}
            style={{ width: "150px" }}
          />
        </Col>
        <Col>
          <Button size="middle" type="primary" disabled={!btnAplicarEnabled}>
            Aplicar
          </Button>
        </Col>
      </Row>
    </>
  );

  return (
    <>
      <Row>
        <Col>{}</Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            title={(_) => filtros()}
            columns={columns}
            dataSource={dataSource}
            footer={(_) => (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button type="primary">Export</Button>
              </div>
            )}
          />
        </Col>
      </Row>
    </>
  );
};

export default InformeVentasFiltros;
