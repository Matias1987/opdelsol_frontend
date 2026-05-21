import { formatFloat } from "@/src/helpers/formatters";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { ArrowRightOutlined, CheckOutlined, CloseOutlined, EditFilled } from "@ant-design/icons";
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
  const [loading, setLoading] = useState(false);
  const [selectedPago, setSelectedPago] = useState(null);
  const [selectedCompra, setSelectedCompra] = useState(null);
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
    { title: "Nro.", dataIndex: "id",  render:(_,{id, checked})=><>{checked ? <ArrowRightOutlined /> : <></> }{id} </> },
    { title: "Fecha", dataIndex: "fecha" },
    { title: <div style={{textAlign:"right"}}>Monto</div>, dataIndex: "monto", render:(_,{monto})=><div style={{textAlign:"right"}}>$ {formatFloat(monto)}</div> },
  ];

  const columns_compras = [
    {
      render: (_, record) => (
        <>
          <Checkbox
            disabled={selectedPago == null}
            checked={record.checked}
            onChange={(_) => {
              setCompras((cc) => {
                const temp = cc.map((c) =>
                  c.idfactura == record.idfactura
                    ? { ...c, checked: !c.checked }
                    : c,
                );
                updateMontoAsignado(temp);
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
            disabled={!record.checked}
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
        <div style={{ textAlign: "right" }}>$ {formatFloat(parseFloat(record.saldo) - parseFloat(record.monto_a_pagar))}</div>
      ),
    },
    {
      width:"60px",
      title: <div style={{ textAlign: "center", fontSize:"9px" }}>Saldado</div>,
      render: (_, record) => (
        <div>{record.saldado ? <div style={{textAlign:"center", color:"green", fontSize:"18px", fontWeight:"bolder"}}><CheckOutlined /> </div> : <div style={{textAlign:"center", color:"red", fontSize:"18px", fontWeight:"bolder"}}><CloseOutlined /> </div>}</div>
      ),
    },
  ];

  const updateMontoAsignado = (_compras) => {
    const total = _compras.reduce((acc, curr) => {
      return curr.checked ? acc + parseFloat(curr.monto_a_pagar) : acc;
    }, 0);
    setMontoAsignado(total);
    setSelectPagoEnabled(!(total>0));
  };

  const load_pagos = (_callback) => {
    post_method(
      post.pagos_no_saldados,
      { idproveedor, moneda, modo },
      (response) => {
        //AGREGAR CAMPO CHECKED
        // alert(JSON.stringify(response))
        setDataPagos(response.data);
        _callback?.();
      },
    );
  };

  const load_compras = (_callback) => {
    post_method(
      post.obtener_facturas_saldo,
      { idproveedor: idproveedor, moneda: moneda },
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

  const load = () => {
    setLoading(true);
    load_compras((_) => {
      load_pagos((_) => {
        setLoading(false);
      });
    });
  };

  const asignar_saldo = () =>{
    const _disp  = parseFloat(selectedPago?.monto||"0") - parseFloat(montoAsignado);
    const _resto = parseFloat(selectedCompra.monto) > _disp ? _disp : parseFloat(selectedCompra.monto);
    setEditPopupMonto(_resto);
  }

  useEffect(() => {
    load();
  }, []);

  const guardarCambios = () => {
    const data = {
      idpago: selectedPago.id,
      compras: compras.filter(c=>c.checked)
    }
    alert(JSON.stringify(data));

    post_method(post.asignar_pagos,data,(response)=>{
      alert("Datos Guardados");
      callback?.()
    })
    
    //setBtnGuardarEnabled(false);
  };

  const limpiar = () =>{

  }

  return (
    <>
      <Card title="Asignar Compras a Pagos" size="small">
        <Row>
          <Col span={24}>
            <Table
              pagination={false}
              scroll={{y:200}}
              size="small"
              title={(_) => <span style={{fontWeight:"600"}}>Pagos</span>}
              columns={columns_pagos}
              dataSource={dataPagos}
            />
          </Col>
        </Row>
        <Row style={{padding:"8px"}}>
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
              style={{ width: "220px", color:"red" }}
              value={formatFloat(montoAsignado)}
              readOnly
              key={montoAsignado}
            />
          </Col>
          <Col span={8}>
            <Input addonBefore="A asignar: " style={{ width: "220px", color:"red" }} value={formatFloat(parseFloat(selectedPago?.monto||"0") - parseFloat(montoAsignado))}/>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Table
              size="small"
              title={(_) => <span style={{fontWeight:"600"}}>Compras</span>}
              columns={columns_compras}
              dataSource={compras}
              scroll={{ y: 200 }}
              pagination={false}
            />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={24}>
            <Button type="primary" disabled={!btnGuardarEnabled} onClick={guardarCambios}>
              Guardar Cambios
            </Button>
          </Col>
        </Row>
      </Card>
      <Modal
        open={editPopupVisible}
        destroyOnClose
        onCancel={(_) => {
          setEditPopupVisible(false);
        }}
        width="400px"
        title="Editar Monto"
        footer={null}
      >
        <Row>
          <Col span={24}>
          <Button type="link" onClick={asignar_saldo}>Asignar Saldo</Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <InputNumber
              style={{width:"300px"}}
              value={editPopupMonto}
              onChange={(val) => setEditPopupMonto(val || parseFloat("0"))}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Button
              block
              onClick={(_) => {
                setCompras((cc) => {
                  const temp = cc.map((c) =>
                    c.idfactura == selectedCompra.idfactura
                      ? { ...c, monto_a_pagar: editPopupMonto }
                      : c,
                  );
                  updateMontoAsignado(temp);
                  return temp;
                });
                setEditPopupVisible(false);
                setSelectedCompra(null);
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
