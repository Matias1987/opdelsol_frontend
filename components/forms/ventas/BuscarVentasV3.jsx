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
import { HomeFilled, ReloadOutlined } from "@ant-design/icons";
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
import Resfuerzo from "../caja/cobro_v2/resfuerzo";
import ExportToExcel2 from "@/components/etc/ExportToExcel2";

const BuscarVentaV3 = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [filtros, setFiltros] = useState({});
  const [reload, setReload] = useState(true);
  const [popupCobroOpen, setPopupCobroOpen] = useState(false);
  const [popupCobroResfuerzoOpen, setPopupCobroResfuerzoOpen] = useState(false);
  const [detalleOpen, setDetalleOpen] = useState(false);
  const [selectedVenta, setSelectedVenta] = useState(null);
  const [modalImprimirOpen, setModalImprimirOpen] = useState(false);
  const [verSoloSucursal, setVerSoloSucursal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filtroIdLocal, setFiltroIdLocal] = useState("");
  const [popupAnularOpen, setPopupAnularOpen] = useState(false);
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
    params = add(params, 300, "limit");
    params = add(
      params,
      verSoloSucursal ? globals.obtenerSucursal() : "",
      "idsucursal"
    );
    setLoading(true);
    post_method(url, params, (response) => {
      setLoading(false);
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

  const onResfuerzoClick = (_venta) => {
    setSelectedVenta(_venta);
    setPopupCobroResfuerzoOpen(true);
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
            (response) => { }
          );
          registrarVentaAnulado(_venta.idventa);
        }
      );
    }
  };

  const onDevolucionClick = (_venta) => {
    // TO-DO: Implementar Devolucion
    if (confirm("Enviar venta a depósito?")) {
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

  const onAnularCobradasClick = _venta => {
    setSelectedVenta(_venta);
    setPopupAnularOpen(true);
  }

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

        styles={{ header: { color: "#663f4c", fontSize: "1.3em" } }}
        size="small"
        extra={
          <Row gutter={16}>
            <Col>
              <Input
                style={{ width: "300px" }}
                prefix="Nro.:"
                disabled={loading}
                value={filtros.id}
                allowClear
                type="number"
                onChange={(e) => {
                  let _id = isNaN(e.target.value) ? _id : e.target.value;

                  setFiltros((_f) => ({ ..._f, id: _id }));
                  //setFiltroIdLocal(e.target.value);
                }}
                onPressEnter={(_) => {
                  setReload(!reload);
                }}
                placeholder="Ingrese y presione Enter..."
              />
            </Col>
            <Col>
              <Button
                type="primary"
                onClick={(e) => {
                  setFiltros((_f) => ({ id: "" }));
                  setReload(!reload);
                }}
              >
                <ReloadOutlined /> Recargar
              </Button>
            </Col>
          </Row>
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

              loading={loading}
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
              dataSource={
                filtroIdLocal.trim() == ""
                  ? dataSource
                  : dataSource.filter((d) =>
                    d.idventa.toString().includes(filtroIdLocal.trim())
                  )
              }
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
                  render: (_, { estado, en_laboratorio }) => {
                    switch (estado) {
                      case "INGRESADO":
                        return (
                          <Tag color="red">
                            <b>{estado}</b>
                          </Tag>
                        );
                      case "PENDIENTE":
                        return (
                          <Tag color="geekblue">{`${estado} ${en_laboratorio ? "(Lab)" : ""
                            }`}</Tag>
                        );
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
                            onResfuerzoClick={onResfuerzoClick}
                            onDevolucionClick={onDevolucionClick}
                            onAnularCobradasClick={onAnularCobradasClick}
                            permitirAnularCobradas={true}
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
        <Row style={{ display: "flex", justifyContent: "start" }}>
          <Col>
            {/*<ExportToExcel2
            fileName={"Ventas"}
            buttonText=" "
            buttonType="link"
            buttonStyle={{backgroundColor:"white", color:"green"}}
            butttonSize="small"
            sheets={
              [
                {
                  sheet_name:"Ventas",
                  footer:"",
                  columns:[
                    {header:"Nro.", key:"idventa", width:15},
                    {header:"Fecha", key:"fecha", width:20},
                    {header:"Cliente", key:"cliente", width:40},
                    {header:"Vendedor", key:"vendedor", width:30},
                   
                    {header:"Monto", key:"monto", width:15},
                    {header:"Estado", key:"estado", width:15},
                  ],
                  data:(_=>dataSource.map(_row=>({
                    idventa: _row.idventa,
                    fecha: _row.fecha,
                    cliente: _row.cliente,
                    vendedor: _row.vendedor,
                    tipo: _row.tipo,
                    monto: _row.monto,
                    estado: _row.estado
                  })))()
                }
              ]
            }
            />*/}
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
        {selectedVenta ? (
          <InformeVentaMinV3
            idventa={selectedVenta.idventa}
            key={selectedVenta.idventa}
          />
        ) : null}
      </Modal>

      <Modal
        key={selectedVenta?.idventa}
        destroyOnClose
        title="Detalle"
        onCancel={(_) => {
          setModalImprimirOpen(false);
        }}
        width={"100%"}
        footer={null}
        open={modalImprimirOpen}
      >
        <PrinterWrapper>
          {selectedVenta ? (
            <InformeVenta idventa={selectedVenta.idventa} />
          ) : null}
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
        {selectedVenta ? (
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
            tipo={
              selectedVenta.estado === "INGRESADO"
                ? "ingreso"
                : selectedVenta.estado === "PENDIENTE"
                  ? "resfuerzo"
                  : "entrega"
            }
          />
        ) : (
          <></>
        )}
      </Modal>
      <Modal
        open={popupCobroResfuerzoOpen}
        onCancel={(_) => {
          setPopupCobroResfuerzoOpen(false);
        }}
        width={"1200px"}
        footer={null}
        destroyOnClose
        title=""
      >
        <Resfuerzo
          callback={(_) => {
            setPopupCobroResfuerzoOpen(false);
            setReload(!reload);
          }}
          title="Resfuerzo"
          idventa={selectedVenta?.idventa}
          idcliente={selectedVenta?.idcliente}
        />
      </Modal>
      <Modal open={popupAnularOpen} onCancel={_ => {setPopupAnularOpen(false); setReload(!reload)}} width="800px" footer={null} destroyOnClose>
        <AnularVentasCobradas idventa={selectedVenta?.idventa} />
      </Modal>
    </>
  );
};

export default BuscarVentaV3;
