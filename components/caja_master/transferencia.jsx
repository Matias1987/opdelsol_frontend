import { get } from "@/src/urls";
import { Button, Col, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";

const Transferencia = (props) => {
    const { idCajaOrigen, aFondoFijo } = props;
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
        load();
    }, []);

    const load = _ =>{
        const url = aFondoFijo ? get.lista_ff : get.lista_cajas;
        //alert(url)
        fetch(url)
        .then(response => response.json())
        .then((response) => {
            //alert(JSON.stringify(response));
            setData(response || []);
        });
    }

    return (
    <>

    <Row style={row_style}>
        <Col span={24}>
            <Select prefix="Destino:" style={{ width: '100%' }} options={data.map(item => ({ label: item.sucursal, value: item.idcaja }))} />
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