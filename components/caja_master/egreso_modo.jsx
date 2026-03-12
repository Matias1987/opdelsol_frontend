import {
  Button,
  Col,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Table,
} from "antd";
import { useState } from "react";

const EgresoModo = (props) => {
  const [egresoModos, setEgresoModos] = useState([]);
  const [cuentasBancarias, setCuentasBancarias] = useState([]);
  const [modos, setModos] = useState([
    { value: "Efectivo", label: "Efectivo" },
    { value: "Transferencia Bancaria", label: "Transferencia Bancaria" },
    { value: "Mercado Pago", label: "Mercado Pago" },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const rowStyle = {
    padding: "6px",
  };
  return (
    <>
      <Row style={rowStyle}>
        <Col></Col>
      </Row>
      <Row style={rowStyle}>
        <Col></Col>
      </Row>
      <Row style={rowStyle}>
        <Col span={24}>
          <Table
            size="small"
            dataSource={egresoModos}
            columns={[
              { title: "Modo", dataIndex: "modo" },
              { title: "Monto", dataIndex: "monto" },
              {
                title: "Acciones",
                render: (text, record) => (
                  <Button
                    type="link"
                    onClick={() => alert("Eliminar " + record.id)}
                  >
                    Eliminar
                  </Button>
                ),
              },
            ]}
          />
        </Col>
      </Row>
      <Row style={rowStyle}>
        <Col span={24}>
          <Button type="primary" onClick={() => setModalOpen(true)} block>
            Agregar
          </Button>
        </Col>
      </Row>
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        title="Agregar Modo de Egreso"
      >
        <Row style={rowStyle}>
          <Col span={24}>
            <Select style={{ width: "100%" }} prefix="Modo:" options={modos} />
          </Col>
        </Row>
        <Row style={rowStyle}>
          <Col span={24}>
            <Select
              style={{ width: "100%" }}
              prefix="Cuenta:"
              options={cuentasBancarias}
            />
          </Col>
        </Row>
        <Row style={rowStyle}>
          <Col span={24}>
            <InputNumber prefix="Monto:" style={{ width: "100%" }} />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default EgresoModo;
