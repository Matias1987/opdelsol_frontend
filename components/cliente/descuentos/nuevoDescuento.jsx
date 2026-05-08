import SubGroupSelect from "@/components/SubGroupSelect";
import SubGroupSelectV2 from "@/components/SubGrupoSelectV2";
import {
  Button,
  Card,
  Checkbox,
  Col,
  InputNumber,
  Modal,
  Row,
  Table,
} from "antd";
import { useState } from "react";
import SelectClienteDescuento from "./selectClienteDescuento";

const NuevoDescuento = () => {
  const [descuentoGral, setDescuentoGral] = useState(false);
  const [modalClientesOpen, setModalClientesOpen] = useState(false);
  const row_style = { padding: "8px" };
  return (
    <div>
      <Card title="Nuevo Descuento para Clientes" size="small">
        <Row style={row_style}>
          <Col span={24}>
            <Checkbox
              checked={descuentoGral}
              onChange={(e) => {
                setDescuentoGral(!descuentoGral);
              }}
            >
              Descuento Para Todos los Clientes
            </Checkbox>
            <Button danger disabled={descuentoGral} onClick={_=>{setModalClientesOpen(true)}}>
              Seleccionar Clientes...
            </Button>
          </Col>
        </Row>
        {descuentoGral ? (
          <></>
        ) : (
          <Row style={row_style}>
            <Col span={24}>
              <Table size="small" title={(_) => <>Clientes</>} />
            </Col>
          </Row>
        )}
        <Row style={row_style}>
          <Col span={24}>Categor&iacute;a:</Col>
          <Col span={24}>
            <SubGroupSelectV2
              title="Seleccione..."
              callback={(res) => {
                alert(JSON.stringify(res));
              }}
            />
          </Col>
        </Row>
        <Row style={row_style}>
          <Col span={24}>Porcentaje:</Col>
          <Col span={24}>
            <InputNumber addonAfter="%" />
          </Col>
        </Row>
        <Row style={row_style}>
          <Col span={24}>
            <Button type="primary">Guardar</Button>
          </Col>
        </Row>
      </Card>
      <Modal
        width={"800px"}
        footer={null}
        open={modalClientesOpen}
        onCancel={(_) => {
          setModalClientesOpen(false);
        }}
        title="Seleccionar Cliente"
        destroyOnClose
      >

        <SelectClienteDescuento callback={c=>{alert(JSON.stringify(c))}} />
      </Modal>
    </div>
  );
};

export default NuevoDescuento;
