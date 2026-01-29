import { formatFloat } from "@/src/helpers/formatters";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { ArrowRightOutlined, CheckOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Input, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";

const SeleccionCompraAPagar = ({ idproveedor, onChange }) => {
  const [compras, setCompras] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCompra, setSelectedCompra] = useState(null);
  const columns = [
    {
      width: "50px",
      dataIndex: "checked",
      key: "checked",
      render: (_, { checked, idfactura }) => (
        <Checkbox
          checked={checked}
          onChange={(e) => {
            const nuevasCompras = compras.map((c) => {
              if (c.idfactura == idfactura) {
                return { ...c, checked: e.target.checked };
              }
              return c;
            });
            onChange?.(nuevasCompras.filter((c) => c.checked));
            setCompras(nuevasCompras);
          }}
        />
      ),
    },
    {
      title: "Nro. ",
      dataIndex: "numero",
      key: "numero",
    },
    {
      title: <div style={{ textAlign: "right" }}>Monto Total</div>,
      dataIndex: "monto_pagado",
      key: "monto_pagado",
      render: (_, { monto }) => (
        <div style={{ textAlign: "right" }}>{formatFloat(monto)}</div>
      ),
    },
    {
      title: <div style={{ textAlign: "right" }}>Monto Pagado</div>,
      dataIndex: "monto_pagado",
      key: "monto_pagado",
      render: (_, { monto_pagado }) => (
        <div style={{ textAlign: "right" }}>{formatFloat(monto_pagado)}</div>
      ),
    },
    {
      title: <div style={{ textAlign: "right" }}>Saldo</div>,
      dataIndex: "saldo",
      key: "saldo",
      render: (_, { idfactura, saldo, checked }) => (
        <div style={{ textAlign: "right" }}>
          {formatFloat(saldo)}{" "}
          <Button
            style={{ color: checked ? "red" : "#e6e6e6" }}
            disabled={!checked}
            onClick={(_) => {
              const nuevasCompras = compras.map((c) => {
                if (c.idfactura == idfactura) {
                  return { ...c, monto_a_pagar: saldo };
                }
                return c;
              });
              onChange?.(nuevasCompras.filter((c) => c.checked));
              setCompras(nuevasCompras);
            }}
            type="link"
            size="small"
          >
            <ArrowRightOutlined />
          </Button>
        </div>
      ),
    },
    {
      title: <div style={{ textAlign: "right" }}>Monto a Pagar</div>,
      dataIndex: "monto_a_pagar",
      key: "monto_a_pagar",
      render: (_, { monto_a_pagar, idfactura, checked }) =>
        checked ? (
          <div
            style={{
              textAlign: "right",
              cursor: "pointer",
              fontWeight: "bolder",
              color: "rgb(17, 155, 74)",
            }}
            onClick={() => {
              setSelectedCompra(idfactura);
              setModalOpen(true);
            }}
          >
            {formatFloat(monto_a_pagar)}
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>-</div>
        ),
    },
  ];

  const load = () => {
    post_method(
      post.obtener_facturas_saldo,
      { idproveedor: idproveedor },
      (resp) => {
        setCompras(
          resp.data.map((r) => ({ ...r, checked: false, monto_a_pagar: 0 })),
        );
      },
    );
  };

  useEffect(() => {
    load();
  }, [idproveedor]);

  return (
    <div>
      <Row>
        <Col>
          <Table
            size="small"
            title={(_) => <>Seleccione Documentos a Pagar</>}
            footer={_=><div>Total a Pagar: $ {formatFloat(compras.filter(c=>c.checked).reduce((acc,c)=>acc+c.monto_a_pagar,0))}</div>}
            dataSource={compras}
            columns={columns}
            pagination={false}
            scroll={{ y: "180px" }}
          />
        </Col>
      </Row>
      <Modal
        closable={false}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        destroyOnClose
        footer={null}
        title="Ingrese Monto a Pagar"
        width={"300px"}
      >
        <Row gutter={[16, 16]}>
          <Col>
            <Input
              style={{ width: "200px" }}
              placeholder="Monto a Pagar"
              onChange={(e) => {
                const monto = parseFloat(e.target.value);
                if (isNaN(monto)) {
                  return;
                }
                const nuevasCompras = compras.map((c) => {
                  if (c.idfactura == selectedCompra) {
                    return { ...c, monto_a_pagar: monto };
                  }
                  return c;
                });
                onChange?.(nuevasCompras.filter((c) => c.checked));
                setCompras(nuevasCompras);
                //setModalOpen(false);
              }}
            />
          </Col>
          <Button size="middle" type="link" onClick={() => setModalOpen(false)}>
            <CheckOutlined />
          </Button>
        </Row>
      </Modal>
    </div>
  );
};

export default SeleccionCompraAPagar;
