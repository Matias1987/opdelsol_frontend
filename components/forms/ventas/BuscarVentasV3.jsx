import ListaVentas from "@/components/informes/ventas/ListaVentas";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Input,
  Modal,
  Row,
  Table,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import FiltroVentas from "./filtroVentas";
import { post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";
import globals from "@/src/globals";
import { HomeFilled, PrinterFilled, ReloadOutlined } from "@ant-design/icons";
import InformeVentaMinV3 from "@/components/informes/ventas/InformeVentasMinV3";
import CambiarResponsableDestinatario from "./edicion/CambiarResponsableDestinatario";
import AnularVentasCobradas from "@/components/admin/anularVentasCobradas";
import InformeVenta from "@/components/informes/ventas/Base";
import PrinterWrapper from "@/components/PrinterWrapper";
import OpcionesVenta from "./common/opcionesVenta";
import {
  registrarVentaAnulado,
  registrarVentaTerminado,
} from "@/src/helpers/evento_helper";
import CobroOperacionV2 from "../caja/CobroFormV2";
import { current_date_ymd } from "@/src/helpers/string_helper";

const BuscarVentaV3 = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [filtros, setFiltros] = useState({});
  const [reload, setReload] = useState(true);
  const [popupCobroOpen, setPopupCobroOpen] = useState(false)
  const [detalleOpen, setDetalleOpen] = useState(false);
  const [selectedVenta, setSelectedVenta] = useState(null);
  const [modalImprimirOpen, setModalImprimirOpen] = useState(false);
  const [verSoloSucursal, setVerSoloSucursal] = useState(true);

  const add = (obj, value, key) =>
    typeof value === "undefined" ? obj : { ...obj, [key]: value };

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

  const load = () => {
    const url = post.venta_estado_sucursal;
    var params = {}; //{idsucursal: globals.obtenerSucursal()}
    params;
    params = add(params, filtros.idcliente, "idcliente");
    params = add(params, filtros.idmedico, "idmedico");
    params = add(params, filtros.id, "id");
    params = add(params, filtros.iddestinatario, "iddestinatario");
    params = add(params, filtros.fecha, "fecha");
    params = add(params, filtros.estado, "estado");
    params = add(params, filtros.tipo, "tipo");
    params = add(
      params,
      verSoloSucursal ? globals.obtenerSucursal() : "",
      "idsucursal"
    );

    post_method(url, params, (response) => {
      if (response == null) {
        return;
      }

      if (response.data == null) {
        return;
      }
      //alert(JSON.stringify(response))
      setDataSource((_) =>
        response.data.map((v) => ({
          idventa: v.idventa,
          idcliente: v.cliente_idcliente,
          fecha: v.fecha,
          cliente: v.cliente,
          vendedor: v.vendedor,
          estado: v.estado,
          monto: v.monto,
          tipo: v.tipo,
          idsucursal: v.sucursal_idsucursal,
          sucursal: v.sucursal,
          en_laboratorio: v.en_laboratorio,
          iddestinatario: v.fk_destinatario,
        }))
      );
    });
  };

  const onDetalleClick = (_venta) => {
    setSelectedVenta(_venta);
    setDetalleOpen(true);
  };

  const onImprimirClick = (_venta) => {
    setSelectedVenta(_venta);
    setModalImprimirOpen(true);
  };

  const onCobrarClick = (_venta) => {
    setSelectedVenta(_venta);
    setPopupCobroOpen(true);
  };

  const onMarcarTerminadoClick = (_venta) => {
    if (confirm("Marcar operación como disponible para entrega?")) {
      if (
        _venta.idsucursal != globals.obtenerSucursal() &&
        (props.ignoreSucursalEntrega || "0") == "0"
      ) {
        alert("<!> Venta de Otra Sucursal");
        return;
      }
      post_method(
        post.cambiar_estado_venta,
        {
          idventa: _venta.idventa,
          estado: "TERMINADO",
          fecha_retiro: current_date_ymd(),
        },
        (resp) => {
          alert("OK");
          setReload(!reload);
        }
      );
      registrarVentaTerminado(_venta.idventa);
    }
  };

  const onEnviarALaboratorioClick = (_venta) => {
    if (confirm("Enviar venta a taller?")) {
      if (_venta.idsucursal != globals.obtenerSucursal()) {
        alert("<!> Venta de Otra Sucursal");
        return;
      }
      post_method(
        post.update.cambiar_venta_sucursal_deposito,
        { idventa: _venta.idventa, en_laboratorio: "1" },
        (resp) => {
          alert("OK");
          setReload(!reload);
        }
      );
    }
  };

  const onAnularClick = (_venta) => {
    if (confirm("Anular Operacion?")) {
      if (_venta.idsucursal != globals.obtenerSucursal()) {
        alert("<!> Venta de Otra Sucursal");
        return;
      }
      post_method(
        post.cambiar_estado_venta,
        { idventa: _venta.idventa, estado: "ANULADO" },
        (resp) => {
          setReload(!reload);
          alert("OK");
          post_method(
            post.update.inc_cantidades_stock_venta,
            { idventa: _venta.idventa, idsucursal: globals.obtenerSucursal() },
            (response) => {}
          );
          registrarVentaAnulado(_venta.idventa);
        }
      );
    }
  };

  /*
  const onPopupClosed = () => {
    setFiltros({});
    setReload(!reload);
  };*/

  useEffect(() => {
    load();
  }, [reload]);
  /*
  const on_venta_click = (estado, id, en_deposito, idsucursal) => {
    setSelectedVenta((_) => ({
      estado: estado,
      id: id,
      en_deposito: en_deposito,
      idsucursal: idsucursal,
    }));
    setModalListaOpen(true);
  };

  
  const onCancel = () => {
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
    load();
  };*/
  return (
    <>
      <Card
        size="small"
        extra={
          <>
            <Input
              value={filtros.id}
              allowClear
              type="number"
              onChange={(e) => {
                let _id = isNaN(e.target.value) ? 0 : parseInt(e.target.value);

                setFiltros((_f) => ({ ..._f, id: _id }));
                setReload(!reload);
              }}
              placeholder="Nro. Venta"
            />
          </>
        }
        title={
          <>
            <Row gutter={32}>
              <Col>
                <FiltroVentas
                  callback={(f) => {
                    setFiltros((_f) => f);
                    setReload(!reload);
                  }}
                />
              </Col>
              <Col>
                <Button
                  type="link"
                  onClick={(e) => {
                    setFiltros((_f) => ({}));
                    setReload(!reload);
                  }}
                >
                  <ReloadOutlined /> Recargar
                </Button>
              </Col>
              <Col>
                <Checkbox
                  checked={verSoloSucursal}
                  style={{ color: "#362056FF" }}
                  onChange={() => {
                    setVerSoloSucursal(!verSoloSucursal);
                    setReload(!reload);
                  }}
                >
                  <HomeFilled /> Ver Solo Sucursal
                </Checkbox>
              </Col>
            </Row>
          </>
        }
      >
        <Row>
          <Col span={24}>
            <Table
              size="small"
              scroll={{
                y: 400,
              }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    event.stopPropagation();
                    setSelectedVenta(record);
                    
                    setDetalleOpen(true);
                  }, // click row
                };
              }}
              rowClassName={(record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
              dataSource={dataSource}
              columns={[
                { title: "Nro.:", dataIndex: "idventa", width: "60px" },
                {
                  width: "200px",
                  title: "Cliente",
                  dataIndex: "cliente",
                  render: (_, { cliente, idventa, estado, idsucursal }) => {
                    return (
                      <>
                        {cliente}
                        {estado == "INGRESADO" &&
                        idsucursal == globals.obtenerSucursal() ? (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <CambiarResponsableDestinatario
                              idventa={idventa}
                              callback={load}
                            />
                          </span>
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  },
                },
                { title: "Fecha", dataIndex: "fecha", width: "80px" },
                {
                  hidden: false,
                  width: "80px",
                  title: "Tipo",
                  dataIndex: "tipo",
                  render: (_, { tipo }) => (
                    <span style={{ fontSize: ".75em" }}>
                      <b>{get_tipo(tipo)}</b>
                    </span>
                  ),
                },
                {
                  title: "Estado",
                  width: "80px",
                  dataIndex: "estado",
                  render: (_, { estado }) => {
                    switch (estado) {
                      case "INGRESADO":
                        return (
                          <Tag color="red">
                            <b>{estado}</b>
                          </Tag>
                        );
                      case "PENDIENTE":
                        return <Tag color="geekblue">{estado}</Tag>;
                      case "ENTREGADO":
                        return <Tag color="volcano">{estado}</Tag>;
                      case "ANULADO":
                        return <Tag color="#56051DFF">{estado}</Tag>;
                      case "TERMINADO":
                        return <Tag color="green">{estado}</Tag>;
                    }
                  },
                },
                {
                  title: "Sucursal",
                  width: "80px",
                  dataIndex: "sucursal",
                  render: (_, { sucursal }) => {
                    return <>{sucursal}</>;
                  },
                },
                {
                  title: "Acciones",
                  width: "100px",
                  /*fixed: 'right',*/
                  dataIndex: "idventa",
                  render: (_, _venta) => {
                    return (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        {globals.esUsuarioCaja1() ? (
                          <OpcionesVenta
                            venta={_venta}
                            onDetalleClick={onDetalleClick}
                            onImprimirClick={onImprimirClick}
                            onCobrarClick={onCobrarClick}
                            onMarcarTerminadoClick={onMarcarTerminadoClick}
                            onEnviarALaboratorioClick={
                              onEnviarALaboratorioClick
                            }
                            onAnularClick={onAnularClick}
                          />
                        ) : (
                          <></>
                        )}

                        {(globals.esUsuarioAdmin() ||
                          globals.esUsuarioAdminMin()) &&
                        estado != "ANULADO" ? (
                          <AnularVentasCobradas
                            idventa={idventa}
                            callback={load}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  },
                },
              ]}
            />
          </Col>
        </Row>
      </Card>

      <Modal
        width={"1100px"}
        destroyOnClose
        open={detalleOpen}
        footer={null}
        onCancel={() => {
          setDetalleOpen(false);
        }}
      >
        {
          selectedVenta ? <InformeVentaMinV3 idventa={selectedVenta.idventa} key={selectedVenta.idventa} /> : null
        }
      </Modal>

      <Modal
        destroyOnClose
        title="Detalle"
        onCancel={(_) => {
          setModalImprimirOpen(false);
        }}
        width={"1000px"}
        footer={null}
        open={modalImprimirOpen}
      >
        <PrinterWrapper>
          {selectedVenta ? <InformeVenta idventa={selectedVenta.idventa} /> : null}
        </PrinterWrapper>
      </Modal>
      <Modal
        destroyOnClose
        title="Cobro"
        onCancel={(_) => {
          setPopupCobroOpen(false);
          setReload(!reload);
        }}
        width={"1200px"}
        footer={null}
        open={popupCobroOpen}
      >
        { selectedVenta ?
        <CobroOperacionV2
          callback={(_) => {
            setPopupCobroOpen(false);
            setReload(!reload);
          }}
          tarjetaHidden={false}
          ctacteHidden={false}
          totalsHidden={false}
          idventa={selectedVenta.idventa}
          idcliente={selectedVenta.idcliente}
          tipo={ selectedVenta.estado === 'INGRESADO' ? 'ingreso' : selectedVenta.estado === 'PENDIENTE' ? 'resfuerzo' : 'entrega'}
          
        /> : <></>}
      </Modal>
    </>
  );
};

export default BuscarVentaV3;
