import { Button, Card, Col, Modal, Row, Table, Input } from "antd";
import { useEffect, useState } from "react";
import Egreso from "./egreso";
import { PlusOutlined } from "@ant-design/icons";

const DeudaDetalle = (props) => {
  const { iddeuda, callback } = props;
  const [reload, setReload] = useState(false);
  const [modalAddEgresoOpen, setModalAddEgresoOpen] = useState(false);
  const [deuda, setDeuda] = useState({ motivo: "VARIOS", monto: "500000", comentarios:"" });
  const columns = [{ title: "Fecha" }, { title: "Monto" }];
  const load = () => {};

  const row_style = {padding:"4px"}

  useEffect(() => {
    load();
  }, [reload]);

  return (
    <>
      <Card title="Detalle Deuda" extra={<></>} size="small">
        <Row style={row_style}>
          <Col span={24}>
            <Input style={{width:"300px"}}  readOnly value={deuda.motivo} prefix="Motivo: " />
          </Col>
          </Row>
          <Row style={row_style}>
          <Col span={24}>
            <Input style={{width:"300px"}}  readOnly value={deuda.monto} prefix="Monto: " />
          </Col>
        </Row>
        <Row gutter={16} style={row_style}>
            <Col><Input prefix={<>M&eacute;dico:</>} style={{width:"300px"}} /></Col>
        </Row>
        <Row gutter={16} style={row_style}>
            <Col><Input prefix="Vendedor" style={{width:"300px"}} /></Col>
        </Row>
        <Row gutter={16} style={{paddingLeft:"14px", paddingTop:"8px", paddingBottom:"16px"}}>
          <Col>Comentarios: </Col>
          <Col>
            <Input.TextArea readOnly value={deuda.comentarios} style={{width:"600px"}} />
          </Col>
        </Row>
        <Row style={row_style}>
          <Col span={24}>
            <Table
               
              size="small"
              title={(_) => (
                <>
                  Pagos &nbsp;{" "}
                  <Button
                    type="link"
                    onClick={(_) => {
                      setModalAddEgresoOpen(true);
                    }}
                  >
                    <PlusOutlined /> Agregar Pago
                  </Button>
                </>
              )}
              columns={columns}
              dataSource={[]}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}><Input readOnly prefix="Saldo: " value={"00000"} /></Col>
        </Row>
      </Card>
      <Modal
        open={modalAddEgresoOpen}
        destroyOnClose
        width={"900px"}
        title="Agregar Egreso"
        onCancel={(_) => {
          setModalAddEgresoOpen(false);
        }}
      >
        <Egreso iddeuda={iddeuda} />
      </Modal>
    </>
  );
};

export default DeudaDetalle;
