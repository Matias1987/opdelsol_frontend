import LayoutAdmin from "@/components/layout/layout_admin";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, Input, Row, Select, Table } from "antd";
import { useEffect, useState } from "react";

export default function monto_ventas_mes() {
  const currentDate = new Date();
  const [anio, setAnio] = useState(currentDate.getFullYear());
  const [mes, setMes] = useState(currentDate.getMonth());
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      width: "150px",
      title: "Optica",
      render: (_, record) => <div style={{fontWeight:"bold"}}>{record.sucursal}</div>,
      fixed: 'left',
    },
    {
      width: "150px",
      title: <div style={{ textAlign: "right" }}>Efectivo</div>,
      render: (_, record) => (
        <div style={{ textAlign: "right" }}>
          $&nbsp;{parseFloat(record.efectivo).toLocaleString()}
        </div>
      ),
    },
    {
      width: "150px",
      title: <div style={{ textAlign: "right" }}>Tarjeta</div>,
      render: (_, record) => (
        <div style={{ textAlign: "right" }}>
          $&nbsp;{parseFloat(record.tarjeta).toLocaleString()}
        </div>
      ),
    },
    {
      width: "150px",
      title: <div style={{ textAlign: "right" }}>Mercado Pago</div>,
      render: (_, record) => (
        <div style={{ textAlign: "right" }}>
          $&nbsp;{parseFloat(record.mercadopago).toLocaleString()}
        </div>
      ),
    },
    {
      width: "150px",
      title: <div style={{ textAlign: "right" }}>Transferencia</div>,
      render: (_, record) => (
        <div style={{ textAlign: "right" }}>
          $&nbsp;{parseFloat(record.transferencia).toLocaleString()}
        </div>
      ),
    },
    {
      width: "150px",
      title: <div style={{ textAlign: "right" }}>Cheque</div>,
      render: (_, record) => (
        <div style={{ textAlign: "right" }}>
          $&nbsp;{parseFloat(record.cheque).toLocaleString()}
        </div>
      ),
    },
    {
      width: "150px",
      title: <div style={{ textAlign: "right" }}>Mutual</div>,
      render: (_, record) => (
        <div style={{ textAlign: "right" }}>
          $&nbsp;{parseFloat(record.mutual).toLocaleString()}
        </div>
      ),
    },
    {
      width: "150px",
      title: <div style={{ textAlign: "right", fontWeight:"bold" }}>Total Ventas</div>,
      render: (_, record) => (
        <div
          style={{
            textAlign: "right",
            fontWeight: "bold",
            color: "black",
            fontSize: "1.0em",
            backgroundColor: "#ddffe2ff",
          }}
        >
          $&nbsp;{parseFloat(record.total_ventas).toLocaleString()}
        </div>
      ),
    },
    {
      width: "150px",
      title: <div style={{ textAlign: "right" }}>Cuotas</div>,
      render: (_, record) => (
        <div style={{ textAlign: "right" }}>
          $&nbsp;{parseFloat(record.cuotas).toLocaleString()}
        </div>
      ),
    },
    {
      width: "150px",
      title: <div style={{ textAlign: "right" }}>Total</div>,
      render: (_, record) => (
        <div
          style={{
            textAlign: "right",
            fontWeight: "bold",
            fontSize: "1.1em",
            color: "blue",
            backgroundColor: "#ddffe2ff",
          }}
        >
          $&nbsp;{parseFloat(record.total).toLocaleString()}
        </div>
      ),
    },
    { width: "150px", title: "Acciones", hidden: true },
  ];

  const load = () => {
    post_method(
      post.informe_monto_ventas_periodo,
      { mes: +mes + 1, anio },
      (response) => {
        // alert(JSON.stringify(response))
        setDataSource(response.data);
      }
    );
  };

  useEffect((_) => {}, []);

  const onAplicarClick = (_) => {
    load();
  };

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
  ];
  return (
    <>
      <Row>
        <Col span={24}>Ingresos por Mes por Sucursal</Col>
      </Row>
      <Row gutter={16}>
        <Col>
          <Select
            value={mes}
            style={{ width: "300px" }}
            options={meses.map((m, index) => ({ value: index, label: m }))}
            onChange={(v) => {
              setMes(+v);
            }}
          />
        </Col>
        <Col>
          <Input
            value={anio}
            type="number"
            onChange={(e) => {
              setAnio(parseInt(e.target.value || "2025"));
            }}
          />
        </Col>
        <Col>
          <Button type="primary" size="small" onClick={onAplicarClick}>
            Aplicar
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            scroll={{ y: "600px" }}
          />
        </Col>
      </Row>
    </>
  );
}

monto_ventas_mes.PageLayout = LayoutAdmin;
