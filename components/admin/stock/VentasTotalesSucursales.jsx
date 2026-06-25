import CategoriaSelect from "@/components/CategoriaSelect";
import ExportToCSV from "@/components/ExportToCSV";
import SucursalSelect from "@/components/SucursalSelect";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Row, Col, DatePicker, Radio, Table, Button, Input } from "antd";
import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;
const VentasTotalesSucursales = (props) => {
  const [modo, setModo] = useState("dia");
  const [dataSource, setDataSource] = useState([]);
  const [update, setUpdate] = useState(false);
  const [filtros, setFiltros] = useState({
    desde: "",
    hasta: "",
    idsucursal: -1,
    codigo: "",
    cat: "",
    idcategoria: "-1",
  });
  const columns = [
    { width: "100px", title: "Sucursal", dataIndex: "sucursal", fixed:"left" },

    { width: "150px", title: "Código", dataIndex: "codigo", fixed:"left" },
    { width: "500px", title: "Descripción", dataIndex: "descripcion" },

    { width: "80px", title: "Cant.", dataIndex: "cantidad", fixed:"right" },
  ];
  //2024-04-13T14:48:55.591Z
  const _parse = (str) => ({
    dia: str.substring(9, 11),
    mes: str.substring(6, 8),
    anio: str.substring(1, 5),
  });
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
  const periodoSemana = (val, dateString) => {
    if (val == null) {
      _limpiar_fechas();
      return;
    }

    let from = _parse(JSON.stringify(val[0]));
    let to = _parse(JSON.stringify(val[1]));
  };
  const periodoMes = (val, dateString) => {
    if (val == null) {
      _limpiar_fechas();
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

      desde: `${date_from.getFullYear()}-${date_from.getMonth() + 1}-${date_from.getDate()}`,
      hasta: `${date_to.getFullYear()}-${date_to.getMonth() + 1}-${date_to.getDate()}`,
    }));
  };

  const load = () => {
    post_method(post.totales_stock_ventas_periodo, filtros, (rows) => {
      setDataSource(rows.data);
    });
  };

  useEffect(() => {
    load();
  }, [update]);

  return (
    <>
      <Row>
        <Col span={24}>
          <Row>
            <Col span={24}>
              <SucursalSelect
                callback={(id) => {
                  setFiltros((f) => ({ ...f, idsucursal: id }));
                  setUpdate(!update);
                }}
              />
            </Col>
          </Row>
          <Row style={{ padding: ".5em" }} gutter={[8,8]}>
            <Col>
              <Radio.Group
                value={modo}
                onChange={(e) => {
                  setModo(e.target.value);
                }}
              >
                <Radio.Button value="dia">D&iacute;a</Radio.Button>
                <Radio.Button disabled value="semana">
                  Semana
                </Radio.Button>
                <Radio.Button value="mes">Mes</Radio.Button>
              </Radio.Group>
            </Col>
         
            <Col>
              <RangePicker
                prefix="Días: "
                size="large"
                disabled={modo != "dia"}
                onChange={periodoDia}
              />
            </Col>
         
            {/*<Col>
              <RangePicker
                size="large"
                disabled={modo != "semana"}
                picker="week"
                onChange={periodoSemana}
              />
            </Col>*/}
         
            <Col>
              <RangePicker
                prefix="Meses: "
                format="MM/YYYY"
                disabledTime={true}
                size="large"
                disabled={modo != "mes"}
                picker="month"
                onChange={periodoMes}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <CategoriaSelect
                callback={(categoria, id) => {
                  setFiltros((_f) => ({
                    ..._f,
                    cat: categoria,
                    idcategoria: id,
                  }));
                }}
              />
            </Col>
          </Row>
          <Row style={{ padding: ".5em" }}>
            <Col span={24}>
              <Input
                prefix={"Código: "}
                style={{ width: "100%", backgroundColor: "lightgray" }}
                allowClear
                onChange={(e) => {
                  setFiltros((_f) => ({ ..._f, codigo: e.target.value }));
                }}
              />
            </Col>
          </Row>
          <Row style={{ padding: ".5em" }}>
            <Col span={24}>
              <Button
                block
                type="primary"
                onClick={() => {
                  setUpdate(!update);
                }}
              >
                Aplicar
              </Button>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row justify="center" align="middle">
            <Col
              span={24}
              style={{
                border: "1px solid #A9A9A9",
                padding: "12px",
                borderRadius: "6px",
              }}
            >
              <Table
                title={() => (
                  <>
                    Listado de Cantidades&nbsp;&nbsp;
                    <ExportToCSV
                      parseFnt={() => {
                        let str = "sucursal,codigo,descripcion,cantidad\r\n";
                        dataSource.forEach((d) => {
                          str += `${d.sucursal},"' ${d.codigo} '","' ${d.descripcion} '",${d.cantidad}\r\n`;
                        });
                        return str;
                      }}
                    />
                  </>
                )}
                summary={(pageData) => {
                  let total = 0;
                  pageData.forEach(({ cantidad }) => {
                    total += parseInt(cantidad);
                  });

                  return (
                    <Table.Summary fixed>
                      <Table.Summary.Row>
                        <Table.Summary.Cell index={0} colSpan={3}>
                          Total
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1} fixed={"right"}>
                          {total}
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </Table.Summary>
                  );
                }}
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                scroll={{ y: 300 }}
                tableLayout="fixed"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default VentasTotalesSucursales;
