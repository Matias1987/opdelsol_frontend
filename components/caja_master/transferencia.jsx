import { Button, Col, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";

const Transferencia = (props) => {
    const { idCajaOrigen } = props;
    const [transferencia, setTransferencia] = useState({
        idCajaOrigen,
        idCajaDestino: null,
        monto: 0,
    });

    const onSave = () => {
        // Handle save logic here
    };

    const row_style={
        padding:"6px"
    }

    useEffect(() => {
    // Fetch initial data or perform setup
    }, []);

    return (
    <>

    <Row style={row_style}>
        <Col span={24}>
            <Select prefix="Destino:" style={{ width: '100%' }}>
                <Select.Option value="1">Opción 1</Select.Option>
                <Select.Option value="2">Opción 2</Select.Option>
                <Select.Option value="3">Opción 3</Select.Option>
            </Select>
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Input prefix="Monto: " placeholder="Monto a Transferir" type="number" />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Button type="primary" onClick={onSave}>Realizar Transferencia</Button>
        </Col>
    </Row>
    </>
  );
};

export default Transferencia;