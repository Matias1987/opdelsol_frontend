import {
  FolderOpenTwoTone,
  ReloadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Modal, Row, Table } from "antd";
import { useState } from "react";
import InformeVendedor from "../empleados/informeVendedor";

const TotalesVentasDiaEmpleado = (props) => {
  const [modalDetalleUsuarioOpen, setModalDetalleUsuarioOpen] = useState(false);
  const [sucursalesData, setSucursalesData] = useState([
    {
      sucursal: "ALBERDI",
      montos: [
        { vendedor: "lore", idvendedor: 1, monto: 9000 },
        { vendedor: "ariel", idvendedor: 2, monto: 8000 },
      ],
    },
    {
      sucursal: "BARRANQUERAS",
      montos: [
        { vendedor: "jose", idvendedor: 3, monto: 10000 },
        { vendedor: "abigail", idvendedor: 4, monto: 7000 },
      ],
    },
    {
      sucursal: "ALBERDI",
      montos: [
        { vendedor: "lore", idvendedor: 1, monto: 9000 },
        { vendedor: "ariel", idvendedor: 2, monto: 8000 },
      ],
    },
    {
      sucursal: "BARRANQUERAS",
      montos: [
        { vendedor: "jose", idvendedor: 3, monto: 10000 },
        { vendedor: "abigail", idvendedor: 4, monto: 7000 },
      ],
    },
    {
      sucursal: "ALBERDI",
      montos: [
        { vendedor: "lore", idvendedor: 1, monto: 9000 },
        { vendedor: "ariel", idvendedor: 2, monto: 8000 },
      ],
    },
    {
      sucursal: "BARRANQUERAS",
      montos: [
        { vendedor: "jose", idvendedor: 3, monto: 10000 },
        { vendedor: "abigail", idvendedor: 4, monto: 7000 },
      ],
    },
    {
      sucursal: "ALBERDI",
      montos: [
        { vendedor: "lore", idvendedor: 1, monto: 9000 },
        { vendedor: "ariel", idvendedor: 2, monto: 8000 },
      ],
    },
    {
      sucursal: "BARRANQUERAS",
      montos: [
        { vendedor: "jose", idvendedor: 3, monto: 10000 },
        { vendedor: "abigail", idvendedor: 4, monto: 7000 },
      ],
    },
    {
      sucursal: "ALBERDI",
      montos: [
        { vendedor: "lore", idvendedor: 1, monto: 9000 },
        { vendedor: "ariel", idvendedor: 2, monto: 8000 },
      ],
    },
    {
      sucursal: "BARRANQUERAS",
      montos: [
        { vendedor: "jose", idvendedor: 3, monto: 10000 },
        { vendedor: "abigail", idvendedor: 4, monto: 7000 },
      ],
    },
  ]);
  const columns = [
    {
      title: "Vendedor",
      dataIndex: "vendedor",
      render: (_, record) => (
        <div style={{ textAlign: "left" }}>
          <Button type="link" onClick={_=>setModalDetalleUsuarioOpen(true)}>
          <span style={{ color: "#1000f3" }}>
            <UserOutlined />
          </span>{" "}
          {record.vendedor}
          </Button>
        </div>
      ),
    },
    {
      title: <div style={{ textAlign: "right" }}>Monto</div>,
      dataIndex: "monto",
      render: (_, record) => (
        <div style={{ textAlign: "right" }}>$&nbsp;{record.monto}</div>
      ),
    },
  ];

  const header_style = {
    backgroundColor: "##ffffed",
    background:
      "linear-gradient(90deg,rgba(248,248,234, 1) 32%, rgba(231,233,235, 1) 75%)",
    fontWeight: "bolder",
    paddingLeft: "8px",
  };

  const header = (title) => <div style={header_style}>{title}</div>;

  const sucursal_content = (data) => (
    <div
      style={{
        margin: "8px",
        borderRadius: "8px",
        minWidth: "400px",
        boxShadow: "-1px 3px 3px 2px #9e9c9c",
      }}
    >
      <Table
        showHeader={false}
        size="small"
        style={{ width: "400px" }}
        pagination={false}
        scroll={{ y: 600 }}
        columns={columns}
        title={(_) => header(data.sucursal)}
        dataSource={data.montos.map((record) => ({
          vendedor: record.vendedor,
          sucursal: record.sucursal,
          idusuario: record.idusuario,
          idsucursal: record.idsucursal,
          monto: record.monto,
        }))}
        summary={(data) => {
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell>Total</Table.Summary.Cell>
              <Table.Summary.Cell>0</Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </div>
  );
  return (
    <>
      <Row
        style={{
          padding: "8px",
          backgroundColor: "#f5f5f5",
          borderRadius: "16px",
        }}
      >
        <Col span={24}>
          <Button type="link">
            <ReloadOutlined />
            &nbsp;Recargar
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ padding: "4px" }}>
        {sucursalesData.map((sdata) => sucursal_content(sdata))}
      </Row>
      <Modal
        destroyOnClose
        open={modalDetalleUsuarioOpen}
        onCancel={(_) => setModalDetalleUsuarioOpen(false)}
        footer={null}
        title="Detalle"
      >
        <InformeVendedor idvendedor={0} />
      </Modal>
    </>
  );
};

export default TotalesVentasDiaEmpleado;
/*
SELECT v.sucursal_idsucursal, v.usuario_idusuario, COUNT(*) AS 'qtty', SUM(v.monto_total) AS 'monto' 
FROM venta v 
WHERE v.estado<>'ANULADO' AND v.estado<>'INGRESADO' AND DATE(v.fecha)=DATE(NOW())
GROUP BY v.sucursal_idsucursal, v.usuario_idusuario; */
