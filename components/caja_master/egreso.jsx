import { Button, Input, Select } from "antd";
import { useEffect, useState } from "react";

const Egreso = props =>{

    const [motivos, setMotivos] = useState([]);

    const [egreso, setEgreso] = useState({
        motivo:-1,
        monto:0
    });

      useEffect(() => {
        // Fetch initial data or perform setup
      }, []);

    const row_style={
        padding: "6px",
    }

    const onGuardar = () => {
        // Aquí se implementaría la lógica para guardar el egreso
        console.log("Egreso guardado:", egreso);
    };

    return <>
    <Row style={row_style}>
        <Col span={24}>
            <Select options={motivos} placeholder="Seleccione Motivo" onChange={(value) => setEgreso({...egreso, motivo:value})} />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Input prefix="Monto: " placeholder="Ingrese Monto.." type="number" onChange={(e) => setEgreso({...egreso, monto:e.target.value})} />
        </Col>
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Button type="primary" onClick={onGuardar}>Agregar Egreso</Button>
        </Col>
    </Row>
    </>
}

export default Egreso;