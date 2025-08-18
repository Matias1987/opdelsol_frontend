import { Button, Col, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";

const Transferencia = (props) => {
    const { idCajaOrigen } = props;
    const [data, setData] = useState([]);
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

    const load = _ =>{
        
    }

    return (
    <>

    <Row style={row_style}>
        <Col span={24}>
            <Select prefix="Destino:" style={{ width: '100%' }} options={data} />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
        Comentarios:
        </Col>
        <Col span={24}>
            <Input.TextArea prefix="Comentarios: " placeholder="Comentarios sobre la transferencia" type="text" />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Input prefix="Monto: " placeholder="Monto a Transferir" type="number" />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24} style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button type="primary" onClick={onSave}>Realizar Transferencia</Button>
        </Col>
    </Row>
    </>
  );
};

export default Transferencia;