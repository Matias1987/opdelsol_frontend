import { Chart } from "react-google-charts";
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
import { useState } from "react";

const movimientos = [
  { fecha: "25-08-2026", tipo: "Ingreso", categoria: "Venta", monto: 5000 },
  { fecha: "25-08-2026", tipo: "Egreso", categoria: "Proveedor", monto: 2000 },
];

export default function CajaDistribuidora() {
  const [visible, setVisible] = useState(false);

  const columns = [
    { title: "Fecha", dataIndex: "fecha" },
    { title: "Tipo", dataIndex: "tipo" },
    { title: "Categoría", dataIndex: "categoria" },
    { title: "Monto", dataIndex: "monto" },
  ];

  // Datos para gráficos
  const dataIngresos = [
    ["Tipo", "Monto"],
    ["Ventas", 5000],
    ["Pagos clientes", 3000],
  ];

  const dataEgresos = [
    ["Categoría", "Monto"],
    ["Proveedores", 2000],
    ["Sueldos", 1500],
  ];

  return (
    <div>
      <Card
        title="Resumen de Caja"
        size="small"
        style={{ boxShadow: "4px 4px 6px 0px rgba(0, 0, 0, 0.5)" }}
      >
        <Row>
          <Col span={12}>
            <Chart
              chartType="PieChart"
              data={dataIngresos}
              options={{
                title: "Ingresos por tipo",
                pieHole: 0.4,
                colors: ["#0088FE", "#00C49F"],
              }}
              width={"100%"}
              height={"300px"}
            />
          </Col>
          <Col span={12}>
            <Chart
              chartType="PieChart"
              data={dataEgresos}
              options={{
                pieHole: 0.4,
                title: "Egresos por categoría",
                colors: ["#FF8042","#ff4f42"],
              }}
              width={"100%"}
              height={"300px"}
            />
          </Col>
        </Row>
      </Card>
      &nbsp;
      <Card
        size="small"
        style={{ boxShadow: "4px 4px 6px 0px rgba(0, 0, 0, 0.5)" }}
        title="Movimientos"
        extra={
          <>
            <Button type="primary" onClick={(_) => setVisible(true)}>
              Registrar Movimiento
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
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        title="Nuevo movimiento"
      >
        <Form layout="vertical">
          <Form.Item label="Tipo">
            <Select>
              <Select.Option value="Ingreso">Ingreso</Select.Option>
              <Select.Option value="Egreso">Egreso</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Categoría">
            <Input />
          </Form.Item>
          <Form.Item label="Monto">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Observaciones">
            <Input.TextArea />
          </Form.Item>
          <Button type="primary">Guardar</Button>
        </Form>
      </Modal>
    </div>
  );
}
