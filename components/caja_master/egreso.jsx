import { Input, Select } from "antd";

const Egreso = props =>{

    const [motivos, setMotivos] = useState([]);

    const [egreso, setEgreso] = useState({
        motivo:-1,
        monto:0
    });

    const onGuardar = () => {
        // Aquí se implementaría la lógica para guardar el egreso
        console.log("Egreso guardado:", egreso);
    };

    return <>
    <Row>
        <Col span={24}>
            <Select options={motivos} placeholder="Seleccione Motivo" onChange={(value) => setEgreso({...egreso, motivo:value})} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input placeholder="Ingrese Monto.." type="number" onChange={(e) => setEgreso({...egreso, monto:e.target.value})} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Button type="primary" onClick={onGuardar}>Agregar Egreso</Button>
        </Col>
    </Row>
    </>
}

export default Egreso;