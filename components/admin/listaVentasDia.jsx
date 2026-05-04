import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import SucursalSelect from "../SucursalSelect";
import AnularVentasCobradas from "./anularVentasCobradas";
import InformeVentaMinV3 from "@/components/informes/ventas/InformeVentasMinV3";
import { InfoCircleOutlined, InfoOutlined } from "@ant-design/icons";
import CustomCalendar from "../etc/CustomCalendar";

const ListaVentasDia = ({
  dia,
  mes,
  anio,
  dateReadOnly,
  sucursal,
  sucursalReadOnly,
}) => {
  const [ventas, setVentas] = useState([]);
  const [idusuarioGraph, setIdUsuarioGraph] = useState(-1);
  const [total, setTotal] = useState(0);
  const [vendedores, setVendedores] = useState([]);
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const [popupAnularOpen, setPopupAnularOpen] = useState(false);
  const [popupDetalleOpen, setPopupDetalleOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [selectedVenta, setSelectedVenta] = useState(null);
  const [filtros, setFiltros] = useState({
    dia: 0,
    mes: 0,
    anio: 0,
    idusuario: -1,
    idsucursal: sucursal ? sucursal : -1,
    formattedDate:""
  });
  const get_tipo = (tipo) => {
    switch (+tipo) {
      case 1:
        return "Vta. Dir.";
      case 2:
        return "Rec. Stock";
      case 3:
        return "L.C. Stock";
      case 4:
        return "Monof. Lab.";
      case 5:
        return "Multif. Lab.";
      case 6:
        return "L.C. Lab.";
    }
  };
  const columns = [
    {
      dataIndex: "idventa",
      title: "Nro.",
      sorter: (a, b) => +a.idventa - +b.idventa,
    },
    {
      dataIndex: "cliente",
      title: "Cliente",
      sorter: (a, b) => (a.cliente || "").localeCompare(b.cliente),
    },
    {
      dataIndex: "estado",
      title: "Estado",
      sorter: (a, b) => (a.estado || "").localeCompare(b.estado),
    },
    {
      dataIndex: "tipo",
      title: "Tipo",
      render: (_, { tipo }) => <>{get_tipo(tipo)}</>,
      sorter: (a, b) => (a.estado || "").localeCompare(b.estado),
    },
    {
      dataIndex: "monto",
      title: "Monto",
      sorter: (a, b) => +a.monto - +b.monto,
      render: (_, { monto }) => (
        <div style={{ textAlign: "right" }}>
          {parseFloat(monto).toLocaleString(2)}
        </div>
      ),
    },
    {
      dataIndex: "sucursal",
      title: "Sucursal",
      sorter: (a, b) => (a.sucursal || "").localeCompare(b.sucursal),
    },
    {
      dataIndex: "idventa",
      title: "",
      render: (_, { idventa }) => {
        return (
          <>
            <Button
              size="small"
              onClick={(_) => {
                setSelectedVenta(idventa);
                setPopupDetalleOpen(true);
              }}
            >
              <InfoCircleOutlined />
            </Button>
            <Button
              size="small"
              type="link"
              danger
              onClick={(_) => {
                setSelectedVenta(idventa);
                setPopupAnularOpen(true);
              }}
            >
              Anular
            </Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const today = new Date();
    setFiltros((_f) => ({
      ..._f,
      dia: dia ? dia : today.getDate(),
      mes: mes ? mes : today.getMonth() + 1,
      anio: anio ? anio : today.getFullYear(),
    }));
    //get lista vendedores
    fetch(get.lista_usuarios)
      .then((r) => r.json())
      .then((response) => {
        const resp = response?.data || [];
        setVendedores([
          ...[{ label: "Todos", value: "-1" }],
          ...resp.map((r) => ({ label: r.nombre, value: r.idusuario })),
        ]);
      });
  }, []);

  const load = () => {
    post_method(
      post.venta_estado_sucursal,
      {
        idusuario: filtros.idusuario,
        fecha: `${filtros.anio}-${filtros.mes}-${filtros.dia}`,
        idsucursal: +filtros.idsucursal < 0 ? "" : filtros.idsucursal,
        incIngresadas: false,
        incAnuladas: false,
      },
      (response) => {
        const resp = response?.data || [];
        setVentas(
          resp.map((r) => ({
            idventa: r.idventa,
            cliente: r.cliente,
            monto: r.monto,
            estado: r.estado,
            sucursal: r.sucursal,
            tipo: r.tipo,
          })),
        );
        let t = 0;
        resp.forEach((r) => {
          t += parseFloat(r.monto);
        });
        setTotal(t);
      },
    );
  };

  const onChange = (idx, value) => {
    setButtonEnabled(true);
    setFiltros((_f) => ({ ..._f, [idx]: value }));
  };

  const aplicarFiltros = (_) => {
    setButtonEnabled(false);
    setIdUsuarioGraph(filtros.idusuario);
    setFormattedDate(filtros.formattedDate);
    load();
  };

  const header = (_) => (
    <>
      {formattedDate.length>0 ? `Ventas del día ${formattedDate}` : ""}
    </>
  );

  return (
    <>
      <Card size="small">
        <Row>
          <Col style={{ width: "230px"}}>
            <Row style={{ paddingTop: "0px" }}>
              <Col span={24}>
                <SucursalSelect
                  disabled={sucursalReadOnly ? true : false}
                  idsucursal={sucursal ? sucursal : null}
                  callback={(idsucursal) => {
                    onChange("idsucursal", idsucursal);
                  }}
                />
              </Col>
            </Row>
            <Row style={{ paddingTop: "16px" }}>
              <Col span={24}>
                <Select
                  prefix={<span>Vendedor:&nbsp;</span>}
                  onChange={(v) => {
                    setVentas([]);
                    onChange("idusuario", v);
                  }}
                  options={vendedores}
                  placeholder="Seleccione vendedor"
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <CustomCalendar
                  onSelect={(date) => {
                    if (!date) return;

                    // Format to Argentinian style dd-mm-yyyy
                    const formatted = date.format("DD-MM-YYYY");
                    
                    // Extract into separate variables
                    const day = date.date(); // 1–31
                    const month = date.month() + 1; // 0–11, so add 1
                    const year = date.year();

                    //alert(formatted, day, month, year);

                    setFiltros((f) => ({
                      ...f,
                      dia: day,
                      mes: month,
                      anio: year,
                      formattedDate: formatted,
                    }));
                    setButtonEnabled(true);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Button
                  type="primary"
                  onClick={aplicarFiltros}
                  disabled={!buttonEnabled}
                >
                  Aplicar Filtros
                </Button>
              </Col>
            </Row>
          </Col>
          <Col style={{ width: "700px" }}>
            <Row>
              <Col span={24}>
                <Table
                  pagination={false}
                  scroll={{ y: "600px" }}
                  title={header}
                  rowClassName={(record, index) =>
                    +record.idventa === selectedVenta
                      ? "ok-row"
                      : "table-row-light"
                  }
                  dataSource={ventas}
                  columns={columns}
                  size="small"
                  bordered
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Input value={ventas.length} readOnly prefix="Cantidad:   " />
                <Input
                  value={(total || "0").toLocaleString(2)}
                  readOnly
                  prefix="Total: $  "
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      {/*<Row>
        <Col span={24}>
            <InformeUsuarioGraphVentas idusuario={idusuarioGraph} key={idusuarioGraph} />
        </Col>
    </Row>*/}
      <Modal
        open={popupAnularOpen}
        onCancel={(_) => setPopupAnularOpen(false)}
        width="800px"
        footer={null}
        destroyOnClose
      >
        <AnularVentasCobradas idventa={selectedVenta} />
      </Modal>
      <Modal
        open={popupDetalleOpen}
        onCancel={(_) => {
          setPopupDetalleOpen(false);
        }}
        width={"800px"}
        footer={null}
        destroyOnClose
      >
        <InformeVentaMinV3 idventa={selectedVenta} />
      </Modal>
    </>
  );
};

export default ListaVentasDia;
