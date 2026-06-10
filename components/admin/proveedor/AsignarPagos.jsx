import { formatFloat } from "@/src/helpers/formatters";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import {
  ArrowRightOutlined,
  CheckOutlined,
  CloseOutlined,
  EditFilled,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Input,
  InputNumber,
  Modal,
  Row,
  Table,
} from "antd";
import { useEffect, useState } from "react";

const AsignarPagos = ({ idproveedor, moneda, modo, callback }) => {
  const [dataPagos, setDataPagos] = useState(null);
  const [compras, setCompras] = useState([]);
  const [cm, setCM] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPago, setSelectedPago] = useState(null);
  const [selectedCompra, setSelectedCompra] = useState(null);
  const [selectedCM, setSelectedCM] = useState(null);
  const [montoAsignado, setMontoAsignado] = useState(0);
  const [editPopupMonto, setEditPopupMonto] = useState(0);
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [btnGuardarEnabled, setBtnGuardarEnabled] = useState(true);
  const [selectPagoEnabled, setSelectPagoEnabled] = useState(true);

  //const [selectCompraEnabled, setSelectCompraEnabled] = useState(false);

  const columns_pagos = [
    {
      width: "40px",
      render: (_, record) => (
        <>
          <Checkbox
            disabled={!selectPagoEnabled}
            checked={record.checked}
            onChange={(_) => {
              setSelectedPago(!record.checked ? record : null);
              setDataPagos((pp) =>
                pp.map((p) =>
                  p.id == record.id
                    ? { ...p, checked: !p.checked }
                    : { ...p, checked: false },
                ),
              );
            }}
          ></Checkbox>
        </>
      ),
    },
    {
      title: "Nro.",
      dataIndex: "id",
      render: (_, { id, checked }) => (
        <>
          {checked ? <ArrowRightOutlined /> : <></>}
          {id}{" "}
        </>
      ),
    },
    
    {
      title: <div style={{ textAlign: "right" }}>Monto</div>,
      dataIndex: "monto",
      render: (_, { monto }) => (
        <div style={{ textAlign: "right" }}>$ {formatFloat(monto)}</div>
      ),
    },
  ];

  const columns_compras = [
    {
      title:"ID", dataIndex:"idfactura", key:"idfactura", width:"40px", render: (_, { idfactura }) => (
        <span style={{fontSize:"10px", color:"blue"}}>
          {idfactura} 
        </span>
      )
    },
    {
      render: (_, record) => (
        <>
          <Checkbox
            disabled={selectedPago == null || +record.monto_a_pagar != 0}
            checked={record.checked}
            onChange={(_) => {
              setCompras((cc) => {
                const temp = cc.map((c) =>
                  c.idfactura == record.idfactura
                    ? { ...c, checked: !c.checked }
                    : c,
                );
                updateMontoAsignado(temp, cm);
                return temp;
              });
            }}
          ></Checkbox>
        </>
      ),
      width: "40px",
    },
    { title: <>Nro</>, dataIndex: "numero" },
    {
      title: <div style={{ textAlign: "right" }}>Monto Total</div>,
      dataIndex: "monto",
      render: (_, { monto }) => (
        <div style={{ textAlign: "right" }}>$ {formatFloat(monto)}</div>
      ),
    },
    {
      title: <div style={{ textAlign: "right" }}>Pagado</div>,
      render: (_, { monto_pagado }) => (
        <div style={{ textAlign: "right" }}>$ {formatFloat(monto_pagado)}</div>
      ),
    },
    {
      title: <div style={{ textAlign: "right" }}>Saldo Previo</div>,
      render: (_, { saldo }) => (
        <div style={{ textAlign: "right" }}>$ {formatFloat(saldo)}</div>
      ),
    },
    {
      title: <div style={{ textAlign: "right" }}>A Pagar</div>,
      render: (_, record) => (
        <div style={{ textAlign: "right" }}>
          <Button
            type="link"
            disabled={
              !record.checked ||
              parseFloat(selectedPago?.monto || "0") -
                parseFloat(montoAsignado) <=
                0
            }
            onClick={(_) => {
              setSelectedCompra(record);
              setEditPopupVisible(true);
            }}
          >
            $ {record.monto_a_pagar}
            <EditFilled />
          </Button>
        </div>
      ),
    },
    {
      title: <div style={{ textAlign: "right" }}>Saldo</div>,
      render: (_, record) => (
        <div style={{ textAlign: "right" }}>
          ${" "}
          {formatFloat(
            parseFloat(record.saldo) - parseFloat(record.monto_a_pagar),
          )}
        </div>
      ),
    },
    {
      width: "60px",
      title: (
        <div style={{ textAlign: "center", fontSize: "9px" }}>Saldado</div>
      ),
      render: (_, record) => (
        <div>
          {record.saldado ? (
            <div
              style={{
                textAlign: "center",
                color: "green",
                fontSize: "18px",
                fontWeight: "bolder",
              }}
            >
              <CheckOutlined />{" "}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "red",
                fontSize: "18px",
                fontWeight: "bolder",
              }}
            >
              <CloseOutlined />{" "}
            </div>
          )}
        </div>
      ),
    },
  ];
  const columns_cm = [
    {
      render: (_, record) => (
        <>
          <Checkbox
            disabled={selectedPago == null || +record.monto_a_pagar != 0}
            checked={record.checked}
            onChange={(_) => {
              setCM((cc) => {
                const temp = cc.map((c) =>
                  c.id == record.id ? { ...c, checked: !c.checked } : c,
                );
                updateMontoAsignado(compras, temp);
                return temp;
              });
            }}
          ></Checkbox>
        </>
      ),
      width: "40px",
    },
    { title: <>Nro</>, dataIndex: "id" },
    {
      title: <div style={{ textAlign: "right" }}>Monto</div>,
      dataIndex: "monto",
      render: (_, { monto }) => (
        <div style={{ textAlign: "right" }}>$ {formatFloat(monto)}</div>
      ),
    },
    {
      title: <div style={{ textAlign: "right" }}>Pagado</div>,
      render: (_, { pagado }) => (
        <div style={{ textAlign: "right" }}>$ {formatFloat(pagado)}</div>
      ),
    },
    {
      title: <div style={{ textAlign: "right" }}>Saldo Previo</div>,
      render: (_, { saldo }) => (
        <div style={{ textAlign: "right" }}>$ {formatFloat(saldo)}</div>
      ),
    },
    {
      title: <div style={{ textAlign: "right" }}>A Pagar</div>,
      render: (_, record) => (
        <div style={{ textAlign: "right" }}>
          <Button
            type="link"
            disabled={
              !record.checked ||
              parseFloat(selectedPago?.monto || "0") -
                parseFloat(montoAsignado) <=
                0
            }
            onClick={(_) => {
              setSelectedCM(record);
              setEditPopupVisible(true);
            }}
          >
            $ {record.monto_a_pagar}
            <EditFilled />
          </Button>
        </div>
      ),
    },
    {
      title: <div style={{ textAlign: "right" }}>Saldo</div>,
      render: (_, record) => (
        <div style={{ textAlign: "right" }}>
          ${" "}
          {formatFloat(
            parseFloat(record.saldo) - parseFloat(record.monto_a_pagar),
          )}
        </div>
      ),
    },
    {
      width: "60px",
      title: (
        <div style={{ textAlign: "center", fontSize: "9px" }}>Saldado</div>
      ),
      render: (_, record) => (
        <div>
          {record.saldado ? (
            <div
              style={{
                textAlign: "center",
                color: "green",
                fontSize: "18px",
                fontWeight: "bolder",
              }}
            >
              <CheckOutlined />{" "}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "red",
                fontSize: "18px",
                fontWeight: "bolder",
              }}
            >
              <CloseOutlined />{" "}
            </div>
          )}
        </div>
      ),
    },
  ];

  const updateMontoAsignado = (_compras, _cm) => {
    const __compras = _compras ? _compras : [];
    const __cm = _cm ? _cm : [];
    const _all_operations = [...__compras, ...__cm];
    const total = _all_operations.reduce((acc, curr) => {
      return curr.checked ? acc + parseFloat(curr.monto_a_pagar) : acc;
    }, 0);
    setMontoAsignado(total);
    setSelectPagoEnabled(!(total > 0));
  };

  const load_pagos = (_callback) => {
    post_method(
      post.pagos_no_saldados,
      { idproveedor, moneda, modo },
      (response) => {
        setDataPagos(response.data.map((p) => ({ ...p, checked: false })));
        _callback?.();
      },
    );
  };

  const load_compras = (_callback) => {
    post_method(
      post.obtener_facturas_saldo,
      { idproveedor: idproveedor, moneda: moneda, modo },
      (resp) => {
        setCompras(
          resp.data.map((r) => ({
            ...r,
            checked: false,
            monto_a_pagar: 0,
            nuevo_saldo: 0,
            saldado: false,
          })),
          _callback?.(),
        );
      },
    );
  };

  const load_cm = (_callback) => {
    post_method(
      post.obtener_cm_saldo,
      { idproveedor: idproveedor, moneda: moneda, modo },
      (resp) => {
        setCM(
          resp.data.map((cm) => ({
            ...cm,
            checked: false,
            monto_a_pagar: 0,
            nuevo_saldo: 0,
            saldado: false,
          })),
        );
        _callback?.();
      },
    );
  };

  const load = () => {
    setLoading(true);
    load_compras((_) => {
      load_pagos((_) => {
        load_cm((_) => {
          setLoading(false);
        });
      });
    });
  };

  const asignar_saldo = () => {
    const _disp =
      parseFloat(selectedPago?.monto || "0") - parseFloat(montoAsignado);
    let _resto = 0;
    if (selectedCompra) {
      _resto =
        parseFloat(selectedCompra.saldo) > _disp
          ? _disp
          : parseFloat(selectedCompra.saldo);
    } else {
      _resto =
        parseFloat(selectedCM.saldo) > _disp
          ? _disp
          : parseFloat(selectedCM.saldo);
    }
    setEditPopupMonto(_resto);
  };

  useEffect(() => {
    load();
  }, []);

  const guardarCambios = () => {
    const data = {
      idpago: selectedPago.id,
      compras: compras.filter((c) => c.checked),
      cm: cm.filter((c) => c.checked),
    };
    setBtnGuardarEnabled(false);
    post_method(post.asignar_pagos, data, (response) => {
      alert("Datos Guardados");
      setBtnGuardarEnabled(true);
      callback?.();
    });

    //setBtnGuardarEnabled(false);
  };

  const limpiar = () => {};

  return (
    <>
      <Card title="Asignar Compras a Pagos" size="small">
        <Row>
          <Col span={24}>
            <Table
              pagination={false}
              scroll={{ y: 100 }}
              size="small"
              title={(_) => (
                <span style={{ fontWeight: "600" }}>Seleccione Pago:</span>
              )}
              columns={columns_pagos}
              dataSource={dataPagos}
            />
          </Col>
        </Row>
        <Row style={{ padding: "12px", backgroundColor: "rgb(251, 255, 227)" }}>
          <Col span={8}>
            <Input
              addonBefore="Monto Pago: "
              style={{ width: "220px" }}
              value={
                selectedPago ? formatFloat(selectedPago.monto) : formatFloat(0)
              }
              readOnly
            />
          </Col>
          <Col span={8}>
            <Input
              addonBefore="Asignado: "
              style={{ width: "220px", color: "red" }}
              value={formatFloat(montoAsignado)}
              readOnly
              key={montoAsignado}
            />
          </Col>
          <Col span={8}>
            <Input
              addonBefore="A asignar: "
              style={{ width: "220px", color: "red" }}
              value={formatFloat(
                parseFloat(selectedPago?.monto || "0") -
                  parseFloat(montoAsignado),
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              size="small"
              title={(_) => (
                <>
                  <span style={{ fontWeight: "600" }}>Compras</span>
                </>
              )}
              columns={columns_compras}
              dataSource={compras}
              scroll={{ y: 300 }}
              pagination={false}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              showHeader={false}
              size="small"
              title={(_) => (
                <>
                  <span style={{ fontWeight: "600" }}>
                    Cargas Manuales
                  </span>{" "}
                </>
              )}
              columns={columns_cm}
              dataSource={cm}
              scroll={{ y: 60 }}
              pagination={false}
            />
          </Col>
        </Row>
        <Divider />
        
        <Row>
          <Col span={24}>
            <Button
              type="primary"
              disabled={
                !btnGuardarEnabled ||
                parseFloat(selectedPago?.monto || "0") -
                  parseFloat(montoAsignado) >
                  0 ||
                montoAsignado <= 0
              }
              onClick={guardarCambios}
            >
              Guardar Cambios
            </Button>
            <Button
              onClick={(_) => {
                if (
                  !window.confirm(
                    "¿Cancelar edición? Se perderán los cambios no guardados.",
                  )
                ) {
                  return;
                }
                setSelectedCompra(null);
                setSelectedCM(null);
                setMontoAsignado(0);
                setEditPopupMonto(0);
                setEditPopupVisible(false);
                //load();
                callback?.();
              }}
            >
              Cancelar
            </Button>
          </Col>
        </Row>
      </Card>
      <Modal
        open={editPopupVisible}
        destroyOnClose
        onCancel={(_) => {
          setEditPopupVisible(false);
          setEditPopupMonto(0);
        }}
        width="400px"
        title="Editar Monto"
        footer={null}
      >
        <Row style={{ padding: "4px" }}>
          <Col span={24}>
            <Button type="link" onClick={asignar_saldo}>
              <span style={{ fontWeight: "bold", color: "red" }}>
                <CheckOutlined /> Asignar Saldo{" "}
              </span>
            </Button>
          </Col>
        </Row>
        <Row style={{ padding: "4px" }}>
          <Col span={24}>
            <InputNumber
              style={{ width: "300px" }}
              value={editPopupMonto}
              onChange={(val) => setEditPopupMonto(val || parseFloat("0"))}
            />
          </Col>
        </Row>
        <Row style={{ padding: "4px" }}>
          <Col span={24}>
            <Button
              disabled={editPopupMonto <= 0}
              type="primary"
              block
              onClick={(_) => {
                if (
                  editPopupMonto >
                  parseFloat(selectedCompra?.saldo || selectedCM?.saldo || "0")
                ) {
                  alert("El monto a pagar no puede ser mayor al saldo");
                  return;
                }
                //actualiza compras...
                if (selectedCompra) {
                  setCompras((cc) => {
                    const temp = cc.map((c) =>
                      c.idfactura == selectedCompra.idfactura
                        ? {
                            ...c,
                            monto_a_pagar: editPopupMonto,
                            saldado: !(
                              parseFloat(c.saldo) -
                                parseFloat(editPopupMonto) !=
                              0
                            ),
                          }
                        : c,
                    );
                    updateMontoAsignado(temp, cm);
                    return temp;
                  });
                } else {
                  //actualiza cm...
                  setCM((ccmm) => {
                    const temp = ccmm.map((cm) =>
                      cm.id == selectedCM.id
                        ? {
                            ...cm,
                            monto_a_pagar: editPopupMonto,
                            saldado: !(
                              parseFloat(cm.saldo) -
                                parseFloat(editPopupMonto) !=
                              0
                            ),
                          }
                        : cm,
                    );
                    updateMontoAsignado(compras, temp);
                    return temp;
                  });
                }

                setEditPopupVisible(false);
                setSelectedCompra(null);
                setSelectedCM(null);
                setEditPopupMonto(0);
              }}
            >
              <CheckOutlined /> Aceptar
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default AsignarPagos;
