import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { CheckOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Col, DatePicker, Input, Row, Table } from "antd";
import { useEffect, useState } from "react";

const InformeCantidadesPeriodo = () => {
  const [data, setData] = useState([]);
  const [stringFilter, setStringFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const columns = [
    { title: "Codigo", dataIndex: "codigo", key: "codigo" },
    { title: "Cantidad", dataIndex: "cantidad", key: "cantidad" },
  ];
  const [filtros, setFiltros] = useState({
    fecha_desde: null,
    fecha_hasta: null,
  });
  const load = () => {
    setLoading(true);
    post_method(post.informe_taller_cantidades_periodo, filtros, (response) => {
      setData(response.data);
      setLoading(false);
    });
  };
  const _parse = (str) => ({
    dia: str.substring(9, 11),
    mes: str.substring(6, 8),
    anio: str.substring(1, 5),
  });
  const _limpiar_fechas = (_) => {
    setFiltros((_f) => ({ ..._f, fecha_desde: "", fecha_hasta: "" }));
  };

  const periodoMes = (val, dateString) => {
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
    <Card title={<>Informe de Cantidades utilizadas por peri&oacute;do</>}>
      <Row gutter={16}>
        <Col>
          <DatePicker.RangePicker
            prefix="Periodo:    "
            format="MM/YYYY"
            disabledTime={true}
            size="large"
            picker="month"
            onChange={periodoMes}
          />
        </Col>
        <Col style={{ paddingTop: "2px" }}>
          <Button
            type="primary"
            onClick={load}
            disabled={loading || !filtros.fecha_desde || !filtros.fecha_hasta}
          >
            <CheckOutlined />
            Aplicar
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table
            size="small"
            title={(_) => (
              <>
                
                <Row style={{display:"flex", justifyContent:"space-between"}}>
                  <Col>
                  <Row><Col style={{fontWeight:"600"}}>Resultado</Col></Row>
                  <Row><Col span={24}>{(!filtros.fecha_desde || !filtros.fecha_hasta) || data.length === 0 ? "" : `Cantidad de cantidades utilizada desde ${filtros.fecha_desde} hasta ${filtros.fecha_hasta}`}</Col></Row>
                    
                  </Col>
                  <Col>
                    <Input
                      prefix="Filtro: "
                      style={{ width: "300px" }}
                      allowClear
                      value={stringFilter}
                      onChange={(e) => setStringFilter(e.target.value)}
                    />
                  </Col>
                </Row>
              </>
            )}
            dataSource={
              stringFilter
                ? data.filter((item) =>
                    item.codigo
                      .toUpperCase()
                      .includes(stringFilter.toUpperCase())
                  )
                : data
            }
            columns={columns}
            loading={loading}
            pagination={false}
            scroll={{ y: "400px" }}
          />
        </Col>
      </Row>
      </Card>
    </>
  );
};

export default InformeCantidadesPeriodo;
