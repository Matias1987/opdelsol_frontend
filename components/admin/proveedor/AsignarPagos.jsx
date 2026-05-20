import { formatFloat } from "@/src/helpers/formatters";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { EditFilled } from "@ant-design/icons";
import { Button, Card, Checkbox, Col, Divider, Input, Row, Table } from "antd";
import { useEffect, useState } from "react";

const AsignarPagos = ({ idproveedor, moneda, modo }) => {
  const [dataPagos, setDataPagos] = useState(null);
  const [compras, setCompras] = useState(null);
  const [loading, setLoading] = useState(false);
  const columns_pagos = [
    { width:"40px", render:(_,{checked,id})=><><Checkbox checked={checked} onChange={_=>{setDataPagos(pp=>pp.map(p=>p.id==id ? {...p,checked:!p.checked}:p))}}></Checkbox></>},
    { title: "Nro.", dataIndex: "id" },
    { title: "Fecha", dataIndex: "fecha" },
    { title: "Monto", dataIndex: "monto" },
  ];

  const columns_compras = [
    {
      render: (_, record) => (
        <>
          <Checkbox
            checked={record.checked}
            onChange={(_) => {
              setCompras((cc) =>
                cc.map((c) =>
                  c.idfactura == record.idfactura
                    ? { ...c, checked: !c.checked }
                    : c,
                ),
              );
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
        <div style={{ textAlign: "right" }}>{formatFloat(monto)}</div>
      ),
    },
    {
      title: <div style={{ textAlign: "right" }}>Pagado</div>,
      render: (_, { monto_pagado }) => (
        <div style={{ textAlign: "right" }}>{formatFloat(monto_pagado)}</div>
      ),
    },
    {
      title: <div style={{ textAlign: "right" }}>Saldo Previo</div>,
      render: (_, { saldo }) => (
        <div style={{ textAlign: "right" }}>{formatFloat(saldo)}</div>
      ),
    },
    {
      title: <div style={{ textAlign: "right" }}>A Pagar</div>,
      render: (_, record) => (
        <div style={{ textAlign: "right" }}>
          <Button type="link" disabled={!record.checked}>
            {record.monto_a_pagar}
            <EditFilled />
          </Button>
        </div>
      ),
    },
    {
      title: <div style={{ textAlign: "right" }}>Saldo</div>,
      render: (_, { nuevo_saldo }) => (
        <div style={{ textAlign: "right" }}>{formatFloat(nuevo_saldo)}</div>
      ),
    },
  ];

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

  useEffect(() => {
    load();
  }, []);

  return (
    <>
    <Card title="Asignar Compras a Pagos" size="small">
      <Row>
        <Col span={24}>
          <Table
            size="small"
            title={(_) => <>Pagos</>}
            columns={columns_pagos}
            dataSource={dataPagos}
          />
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Input prefix="Monto Pago: " style={{ width: "220px" }} />
        </Col>
        <Col span={8}>
          <Input prefix="Asignado: " style={{ width: "220px" }} />
        </Col>
        <Col span={8}>
          <Input prefix="A asignar: " style={{ width: "220px" }} />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Table
            size="small"
            title={(_) => <>Compras</>}
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
          <Button type="primary">Guardar Cambios</Button>
        </Col>
      </Row>
      </Card>
    </>
  );
};

export default AsignarPagos;
