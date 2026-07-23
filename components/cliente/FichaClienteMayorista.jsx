import { get, post } from "@/src/urls";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Input,
  Modal,
  Row,
  Spin,
  Table,
  Tabs,
  Tag,
} from "antd";
import { useEffect, useRef, useState } from "react";
import CobroOperacion from "../forms/caja/CobroForm";
import CargaManual from "../forms/caja/CargaManual";
import CargaBloqueo from "../forms/caja/CargaBloqueo";
import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import Anotaciones from "../anotacion/anotaciones";
import MostrarDNI from "../etc/MostrarDNI";
import { formatFloat } from "@/src/helpers/formatters";
import esES from "antd/locale/es_ES";
import dayjs from "dayjs";
import ImpresionResumen from "./ImpresionResumen";
import { InfoCircleOutlined, PrinterOutlined } from "@ant-design/icons";
import ClienteDescuentos from "./descuentos/clienteDescuentos";

export default function FichaClienteMayorista(props) {
  const [operaciones, setOperaciones] = useState([]);
  const [dataCliente, setDataCliente] = useState(null);
  //const [dataChange, setDataChange] = useState(true)
  const [scrollChange, setScrollChange] = useState(false);
  const [saldo, setSaldo] = useState(0);
  const [filtrarSucursal, setFiltrarSucursal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fix, setFix] = useState(0);
  const [loadPending, setLoadPending] = useState(true);
  const [filtrarPorFecha, setFiltrarPorFecha] = useState(true);
  const [fechaFiltro, setFechaFiltro] = useState(null);
  const [modalInformeVisible, setModalInformeVisible] = useState(false);
  const dummyref = useRef(null);

  const gridRow = {
    display: "grid",
    gridAutoFlow: "column" /* Force items into columns */,
    overflowX: "hidden" /* Allow horizontal scroll if needed */,
    gap: "2px" /* Space between items */,
    padding: "0px",
    background: "#f0f0f0",
  };
  const gridItem = {
    fontWeight: "bold",
  };

  const bloquear = (_) => {
    if (!confirm("Bloquear Cuenta?")) {
      return;
    }
    fetch(get.bloquear_cliente + dataCliente.idcliente)
      .then((resp) => resp.json())
      .then((resp) => {
        load();
      });
  };
  const anular_carga_manual = (id) => {
    if (!confirm("Anular Carga Manual?")) {
      return;
    }
    post_method(post.update.anular_carga_manual, { id: id }, (response) => {
      load();
    });
  };

  function processAndSortArray(arr, targetDateStr) {
    // Helper to parse 'dd-mm-yyyy' into a native Date object
    const parseDate = (dateStr) => {
      const [day, month, year] = dateStr.split("-").map(Number);
      return new Date(year, +month - 1, day);
    };

    const targetLimitDate = parseDate(targetDateStr);
    let accumulatedDebe = 0;
    let accumulatedHaber = 0;
    const filteredAndSortedRecords = [];

    // Step 1: Separate records into accumulated total or active records
    arr.forEach((item) => {
      const itemDate = parseDate(item.fecha_f);

      if (itemDate <= targetLimitDate) {
        // Accumulate total for records on or before the target date
        accumulatedDebe += parseFloat(item.debe) || 0;
        accumulatedHaber += parseFloat(item.haber) || 0;
      } else {
        // Keep records after the target date
        filteredAndSortedRecords.push({ ...item });
      }
    });

    // Step 2: Sort the remaining future records by date (ascending)
    filteredAndSortedRecords.sort(
      (a, b) => parseDate(a.fecha_f) - parseDate(b.fecha_f),
    );

    // Step 3: Insert the accumulated summary row at the beginning
    const summaryRow = {
      detalle_m: "Saldo Anterior",
      fecha_f: targetDateStr,
      debe: accumulatedDebe,
      haber: accumulatedHaber,
      saldo: parseFloat(accumulatedDebe) - parseFloat(accumulatedHaber),
      id: "summary", // Unique identifier for the summary row
      isSummary: true, // Visual flag to help you identify this special row
    };

    return [summaryRow, ...filteredAndSortedRecords];
  }

  const onChangeDate = (_date, _date_str) => {
    if (!_date) {
      setFechaFiltro(null);
      return;
    }
    setFechaFiltro(_date_str);
  };
  const desBloquear = (_) => {
    if (!confirm("Desbloquear Cuenta?")) {
      return;
    }
    fetch(get.desbloquear_cliente + dataCliente.idcliente)
      .then((resp) => resp.json())
      .then((resp) => {
        load();
      });
  };

  const columns = [
    { width: "90px", dataIndex: "id", title: "Nro." },
    { width: "90px", dataIndex: "fecha_f", title: "Fecha" },

    {
      width: "300px",
      dataIndex: "detalle",
      title: "Detalle",
      render: (_, { detalle_m, id, tipo }) => {
        {
          switch (tipo) {
            case "VENTA":
              return <>{detalle_m}</>;
              break;
            case "PAGO CUOTA":
              return <>{detalle_m}</>;
              break;
            case "ENTREGA":
              return <>{detalle_m}</>;
              break;
            case "CARGA MANUAL":
              return <>{detalle_m}</>;
            default:
              return <>{detalle_m}</>;
          }
        }
      },
    },
    {
      width: "120px",
      dataIndex: "debe",
      title: "Debe",
      align: "right",
      render: (_, { debe }) => <>{`$ ${parseFloat(debe || 0).toFixed(2)}`}</>,
    },
    {
      width: "120px",
      dataIndex: "haber",
      title: "Haber",
      align: "right",
      render: (_, { haber }) => <>{`$ ${parseFloat(haber || 0).toFixed(2)}`}</>,
    },
    {
      width: "120px",
      title: "Saldo",
      align: "right",
      dataIndex: "saldo",
      render: (_, { saldo }) => <>{`$ ${parseFloat(saldo || 0).toFixed(2)}`}</>,
    },
  ];

  const detalles_cliente = (_) =>
    dataCliente === null ? (
      <Spin />
    ) : (
      <>
        <p>
          Nro.: <b>{dataCliente.idcliente}</b>&nbsp;&nbsp;Apellido y Nombre:{" "}
          <b>{dataCliente.apellido + ",  " + dataCliente.nombre}</b>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp; CUIL/CUIT:{" "}
          <b>
            <MostrarDNI dni={dataCliente.dni} />
          </b>
        </p>
        <p>
          Tel.: <b>{dataCliente.telefono1}</b> &nbsp;&nbsp;&nbsp;&nbsp; Dir.:{" "}
          <b>{dataCliente.direccion}</b>
        </p>
        <p>
          {dataCliente.bloqueado == 1 ? (
            <>
              <Tag color="red">BLOQUEADO</Tag>
            </>
          ) : (
            <></>
          )}
        </p>
      </>
    );

  useEffect(() => {
    setFechaFiltro(dayjs().subtract(1, "month").format("DD-MM-YYYY"));
    setFiltrarPorFecha(true);
    if (scrollChange) {
      dummyref.current?.scrollIntoView({ behavior: "smooth" });
      setScrollChange(false);
    }

    if (loadPending) {
      setLoadPending(false);
      load();
    }
  }, [scrollChange]);

  const load = (pFiltrarSucursal = -1) => {
    //alert(get.cliente_por_id + props.idcliente);
    //detalles
    fetch(get.cliente_por_id + props.idcliente)
      .then((response) => response.json())
      .then((response) => {
        setDataCliente(response.data[0]);
      });
    //operaciones
    let _filtrarSucursal =
      pFiltrarSucursal < 0 ? filtrarSucursal : pFiltrarSucursal == 1;
    setLoading(true);
    post_method(
      get.operaciones_cliente,
      {
        idcliente: props.idcliente,
        idsucursal: _filtrarSucursal ? globals.obtenerSucursal() : -1,
      },
      (response) => {
        //alert(JSON.stringify(response.data))
        let saldo = 0;
        const _rows = [];

        response.data.forEach((row) => {
          saldo += +row.debe - +row.haber;

          _rows.push({ ...row, saldo: saldo });
        });

        setOperaciones(
          _rows.map((row) => ({
            id: row.id,
            fecha: row.fecha,
            fecha_f: row.fecha_f,
            tipo: row.tipo,
            detalle: row.detalle,
            detalle_m: row.detalle_m,
            debe: row.debe,
            haber: row.haber,
            idsucursal: row.idsucursal,
            saldo: row.saldo,
          })),
        );

        setScrollChange(true);
        setLoading(false);
      },
    );
    setFix(fix + 1);
  };

  const items = [
    {
      key: "1",
      label: <>Saldo</>,
      children: (
        <>
          
            <Row>
              <Col span={20}>{detalles_cliente()}</Col>
            </Row>
            <Row>
              <Col span={24}>
                <Table
                  size="small"
                  columns={columns}
                  dataSource={[]}
                  pagination={false}
                  locale={{ emptyText: null }}
                  className="hide-table-body ant-table-thead-custom"
                  title={() => (
                    <Row gutter={32}>
                      <Col style={{ paddingTop: "4px", paddingLeft: "32px" }}>
                        <span style={{ fontWeight: "600" }}>
                          Lista de Operaciones
                        </span>
                      </Col>
                      <Col>
                        <DatePicker
                          locale={esES}
                          format={"DD-MM-YYYY"}
                          defaultValue={dayjs().subtract(1, "month")}
                          prefix={
                            <>
                              <Checkbox
                                checked={filtrarPorFecha}
                                onChange={(_) => {
                                  setFiltrarPorFecha(!filtrarPorFecha);
                                }}
                              >
                                <span style={{ whiteSpace: "nowrap" }}>
                                  Ocultar Hasta
                                </span>{" "}
                              </Checkbox>
                            </>
                          }
                          disabled={!filtrarPorFecha}
                          onChange={(v, str) => {
                            onChangeDate(v, str);
                          }}
                        />
                      </Col>
                      <Col>
                        <Button type="link" onClick={() => setModalInformeVisible(true)}><PrinterOutlined /> Informe</Button>
                      </Col>
                    </Row>
                  )}
                />
              </Col>
              <Col span={24} className="scrollable-div">
                {
                  <>
                    <Table
                      showHeader={false}
                      style={{
                        border: "1px dotted #e4e3e3",
                        boxShadow: "-1px 1px 1px 1px #9e9c9c",
                        backgroundColor: "#fafafa",
                      }}
                      size="small"
                      loading={loading}
                      columns={columns}
                      dataSource={
                        filtrarPorFecha && fechaFiltro
                          ? processAndSortArray(operaciones, fechaFiltro)
                          : operaciones
                      }
                      pagination={false}
                      summary={(data) => {
                        var total_debe = 0;
                        var total_haber = 0;
                        data.forEach((r) => {
                          total_debe += parseFloat(r.debe);
                          total_haber += parseFloat(r.haber);
                        });
                        setSaldo(total_debe - total_haber);
                        return (
                          <>
                            <Table.Summary.Row>
                              <Table.Summary.Cell colSpan={3}>
                                <b>Totales</b>
                              </Table.Summary.Cell>
                              <Table.Summary.Cell align="right">
                                <b>{total_debe.toFixed(2)}</b>
                              </Table.Summary.Cell>
                              <Table.Summary.Cell align="right">
                                <b>{total_haber.toFixed(2)}</b>
                              </Table.Summary.Cell>
                              <Table.Summary.Cell align="right">
                                <b>{(total_debe - total_haber).toFixed(2)}</b>
                              </Table.Summary.Cell>
                            </Table.Summary.Row>
                          </>
                        );
                      }}
                    />
                  </>
                }
                <div ref={dummyref}></div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Input
                  prefix={"Saldo: $ "}
                  style={{ backgroundColor: "#feffc1" }}
                  readOnly={true}
                  value={formatFloat(parseFloat(saldo).toFixed(2))}
                />
              </Col>
            </Row>
          
          <Row>
            <Col span={12}>
              {dataCliente == null ? (
                <></>
              ) : (
                <>
                  {dataCliente.bloqueado == 1 ? (
                    <></>
                  ) : (
                    <CobroOperacion
                      tarjetaHidden={false}
                      ctacteHidden={true}
                      chequeHidden={false}
                      mutualHidden={false}
                      buttonText="Cargar Pago"
                      totalsHidden={true}
                      tipo="cuota"
                      idcliente={props.idcliente}
                      callback={() => {
                        load();
                      }}
                    />
                  )}
                </>
              )}
              &nbsp;&nbsp;
              <CargaManual
                idcliente={props.idcliente}
                callback={() => {
                  load();
                }}
              />
            </Col>
            <Col span={12}>
              {dataCliente == null ? (
                <></>
              ) : (
                <>
                  {dataCliente.bloqueado == 1 ? (
                    <>
                      <Button
                        block
                        onClick={desBloquear}
                        type="primary"
                        size="small"
                        danger
                      >
                        Desbloquear
                      </Button>
                    </>
                  ) : (
                    <>
                      {/*<Button onClick={bloquear} type="primary" size="small" danger>Bloquear</Button>*/}
                      <>
                        <CargaBloqueo
                          idcliente={dataCliente.idcliente}
                          callback={() => {
                            load();
                          }}
                        />
                      </>
                    </>
                  )}
                </>
              )}
            </Col>
          </Row>
        </>
      ),
    },
    {
      key: "3",
      label: <>Descuentos</>,
      children: (
        <>
          <Row>
            <Col span={20}>{detalles_cliente()}</Col>
          </Row>
          <Row>
            <Col span={24}>
              {dataCliente == null ? (
                <></>
              ) : (
                <ClienteDescuentos
                  cliente={dataCliente}
                  key={fix}
                />
              )}
            </Col>
          </Row>
        </>
      ),
    },
    {
      key: "2",
      label: <>Anotaciones</>,
      children: (
        <>
          <Row>
            <Col span={20}>{detalles_cliente()}</Col>
          </Row>
          <Row>
            <Col span={24}>
              {dataCliente == null ? (
                <></>
              ) : (
                <Anotaciones
                  tipo="CLIENTE"
                  idref={dataCliente.idcliente}
                  key={fix}
                />
              )}
            </Col>
          </Row>
        </>
      ),
    },
    
  ];

  return (
    <div style={{ backgroundColor: "#fafafa" }}>
      {/*<Button onClick={()=>{setOpen(true); load();}}>Ficha</Button>
    <Modal open={open} title={"Ficha Cliente"} onCancel={()=>{setOpen(false)}} footer={null} width={"80%"} destroyOnClose={true}>  */}
      <Tabs defaultActiveKey="1" items={items} />
      <Modal open={modalInformeVisible} title={"Informe de Operaciones"} onCancel={() => { setModalInformeVisible(false) }} footer={null} width={"90%"} destroyOnClose={true}>
        <ImpresionResumen
          cliente={dataCliente}
          operaciones={
            filtrarPorFecha && fechaFiltro
              ? processAndSortArray(operaciones, fechaFiltro)
              : operaciones
          }
        />
      </Modal>
    </div>
  );
}
