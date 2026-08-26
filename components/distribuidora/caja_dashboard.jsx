import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
} from "antd";
import { useEffect, useState } from "react";
import DonutIngresoCategoria from "../charts/donutIngresoCategoria";
import DonutEgresoCategoria from "../charts/donutEgresoCategoria";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import globals from "@/src/globals";
import { formatFloat } from "@/src/helpers/formatters";
import GastoForm from "../forms/caja/GastoForm";

//const movimientos = [
//  { fecha: "25-08-2026", tipo: "Ingreso", categoria: "Venta", monto: 5000 },
//  { fecha: "25-08-2026", tipo: "Egreso", categoria: "Proveedor", monto: 2000 },
//];

export default function CajaDistribuidora() {
  const [visible, setVisible] = useState(false);
  const [idsucural, setIdsucursal] = useState(-1);
  const [movimientos, setMovimientos] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setIdsucursal(globals.obtenerSucursal());
    load();
  }, [reload]);

  const columns = [
    { title: "Nro.", dataIndex: "id" },
    { title: "Fecha", dataIndex: "fecha" },
    {
      title: "Tipo",
      dataIndex: "tipo_d",
      render: (_, { tipo, tipo_d }) => (
        <div
          style={{
            color: "i" === tipo ? "#03990f" : "#bd0000",
            fontWeight: "600",
          }}
        >
          {tipo_d}
        </div>
      ),
    },
    //{ title: "Categoría", dataIndex: "categoria" },
    {
      title: <div style={{ textAlign: "right" }}>Monto</div>,
      dataIndex: "monto",
      render: (_, { monto }) => (
        <div style={{ textAlign: "right" }}>$ {formatFloat(monto)}</div>
      ),
    },
  ];

  const load = () => {
    post_method(
      post.inf_ls_eg_ig,
      { idsucursal: globals.obtenerSucursal() },
      (response) => {
        setMovimientos(
          response.data.map((r) => ({
            fecha: r.f_fecha,
            id: r.id,
            monto: r.monto,
            tipo_d: "i" === r.tipo ? "Ingreso" : "Egreso",
            tipo: r.tipo,
          })),
        );
      },
    );
  };

  // Datos para gráficos

  return (
    <div>
      <Card
        title="Resumen de Caja"
        size="small"
        style={{ boxShadow: "4px 4px 6px 0px rgba(0, 0, 0, 0.5)" }}
      >
        <Row gutter={[16, 16]}>
          <Col>
            <DonutIngresoCategoria idsucursal={idsucural} reload={reload} />
          </Col>
          <Col>
            <DonutEgresoCategoria idsucursal={idsucural} reload={reload} />
          </Col>
        </Row>
        &nbsp;
        <Card
          size="small"
          style={{ boxShadow: "2px 2px 3px 0px rgba(0, 0, 0, 0.5)" }}
          title="Movimientos"
          extra={
            <>
              <Button
                type="primary"
                onClick={(_) => {
                  setReload(!reload);
                  setVisible(true);
                }}
              >
                Registrar Egreso
              </Button>
            </>
          }
        >
          <Table
            dataSource={movimientos}
            columns={columns}
            rowKey="fecha"
            scroll={{ y: 300 }}
            pagination={false}
            size="small"
          />
        </Card>
      </Card>
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        title="Nuevo Egreso"
        footer={null}
      >
        <GastoForm
          callback={(_) => {
            setReload(!reload);
            setVisible(false);
          }}
        />
      </Modal>
    </div>
  );
}
