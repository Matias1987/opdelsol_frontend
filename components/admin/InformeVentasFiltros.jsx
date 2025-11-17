import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
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
  const [precio, setPrecio] = useState(0);
  const [btnAplicarEnabled, setBtnAplicarEnabled] = useState(true);
  const [filtros, setFiltros] = useState({
    fecha_desde: "",
    fecha_hasta: "",
    codigo: "",
    monto_igual_a: "",
  });
  const columns = [
    { title: "Nro.", dataIndex:"idventa" },
    { title: "Fecha", dataIndex:"fecha" },
    { title: "Cliente" , dataIndex: "cliente"},
    { title: "Vendedor" , dataIndex: "vendedor"},
    { title: "Tipo", dataIndex: "tipo" },
    { title: "Monto", dataIndex: "monto_total" },
  ];

  const _parse = (str) => ({
    dia: str.substring(9, 11),
    mes: str.substring(6, 8),
    anio: str.substring(1, 5),
  });
  const _limpiar_fechas = (_) => {
    setFiltros((_f) => ({ ..._f, fecha_desde: "", fecha_hasta: "" }));
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
      fecha_desde: `${from.anio}-${from.mes}-${from.dia}`,
      fecha_hasta: `${to.anio}-${to.mes}-${to.dia}`,
    }));
  };

  const onAplicarFiltros = () => {
    
    const _filtros = {
      fecha_desde: cbDateChecked ? filtros.fecha_desde : "",
      fecha_hasta: cbDateChecked ? filtros.fecha_hasta : "",
      valor_desde: +modoPrecio == 1 ? precio:"",
      valor_hasta: +modoPrecio == 2 ? precio:"",
      monto_igual_a: +modoPrecio == 0 ? precio:"",
      
    }

    alert(JSON.stringify(_filtros));
    post_method(post.informe_ventas_filtros, _filtros, (response) => {
      alert(JSON.stringify(response));
      setDataSource(response.data)
    });
  };

  /**
   * fecha desde - hasta
   * monto mayor a
   * monto igual a
   */
  const filtros_html = (_) => (
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
            onChange={periodoDia}
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
            type="number"
            value={precio}
            onChange={(e) => {
              setPrecio(e.target.value.length < 1 ? 0 : e.target.value)
            }}
            prefix="Valor:"
            disabled={!cbPrecioChecked}
            style={{ width: "150px" }}
          />
        </Col>
        <Col>
          <Button
            size="middle"
            type="primary"
            disabled={!btnAplicarEnabled}
            onClick={onAplicarFiltros}
          >
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
            title={(_) => filtros_html()}
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
