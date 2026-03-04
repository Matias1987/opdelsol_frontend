import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Col, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import InformeVenta from "./Base";
import InformeVentaMinV3 from "./InformeVentasMinV3";
import { InfoCircleFilled, InfoOutlined } from "@ant-design/icons";
import { formatFloat } from "@/src/helpers/formatters";

const ListaVentasVendedor = ({ idvendedor, idsucursal, mes, anio }) => {
  const [ventas, setVentas] = useState([]);
  const [popupDetalleVentaOpen, setPopupDetalleVentaOpen] = useState(false);
  const [selectedVenta, setSelectedVenta] = useState(null);

  const columns = [
    { width:"100px", title: "Nro. Venta", dataIndex: "idventa", key: "idventa", sorter: (a, b) => +a.idventa - +b.idventa },
    { width:"100px", title: "Fecha Retiro", dataIndex: "fecha_retiro", key: "fecha_retiro" },
    { width:"200px", title: "Cliente", dataIndex: "cliente", key: "cliente", sorter: (a, b) => a.cliente.localeCompare(b.cliente) },
    {
      width:"100px",
      title: <div style={{ textAlign: "right" }}>Monto</div>,
      dataIndex: "monto_total",
      key: "monto_total",
      render: (_, { monto_total }) => (
        <div style={{ textAlign: "right" }}>{formatFloat(monto_total)}</div>
      ),
      sorter: (a, b) => +a.monto_total - +b.monto_total,
    },
    {
      width:"100px",
      render: (_, record) => {
        return (
          <Button
            type="link"
            onClick={() => {
              // Abrir detalle de venta
              setSelectedVenta(record);
              setPopupDetalleVentaOpen(true);
            }}
          >
            <InfoCircleFilled />
            Detalle
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    post_method(
      post.obtener_ventas_vendedor_mes,
      { idvendedor, idsucursal, mes, anio },
      (response) => {
        console.log(response);
        if (!response.data) {
          return;
        }

        setVentas(
          response.data.map((venta) => {
            return { ...venta };
          }),
        );
      },
    );
  }, []);

  return (
    <>
      <Row>
        <Col span={24}>
          <Table
            rowClassName={(record, index) =>
              index % 2 === 0 ? "table-row-light" : "table-row-dark"
            }
            size="small"
            columns={columns}
            dataSource={ventas}
            pagination={true}
            scroll={{ y: "500px" }}
          />
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
      <Modal
        open={popupDetalleVentaOpen}
        onCancel={() => setPopupDetalleVentaOpen(false)}
        width={"1200px"}
        title={"Detalle de venta"}
        centered
      >
        {/* Detalle de venta */}
        <InformeVentaMinV3 idventa={selectedVenta?.idventa} />
      </Modal>
    </>
  );
};

export default ListaVentasVendedor;
