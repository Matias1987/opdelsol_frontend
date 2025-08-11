import { Button, Col, Input, Row, Select } from "antd";

const Transferencia = () => {
  return (
    <>
    <Row>
        <Col span={24}>
            <h1>Transferencia</h1>
        </Col>
    </Row>

    <Row>
        <Col span={24}>
            <Select prefix="Sucursal Destino: ">
                <Select.Option value="1">Opción 1</Select.Option>
                <Select.Option value="2">Opción 2</Select.Option>
                <Select.Option value="3">Opción 3</Select.Option>
            </Select>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input placeholder="Monto a Transferir" type="number" />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Button type="primary">Realizar Transferencia</Button>
        </Col>
    </Row>
    </>
  );
};

export default Transferencia;