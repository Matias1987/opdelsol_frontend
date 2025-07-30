import { Button, Col, Input, Row, Select } from "antd";
import SucursalSelect from "../SucursalSelect";

const FondoFijoForm = () => {
    const [ff, setFF] = useState({
        idsucursal: null,
        monto: null
    });

    const setValue = (key, value) => {
        setFF((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const onSubmit = () => {
        console.log("Formulario enviado con los siguientes datos:", ff);
    };

    return (
    <>
    <Row>
        <Col span={24}>
            <h1>Formulario de Fondo Fijo</h1>
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <SucursalSelect callback={(idsucursal) => {
                console.log("Sucursal seleccionada:", idsucursal);
                setValue("idsucursal", idsucursal);
            }} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Input placeholder="Ingrese Monto" style={{ width: '100%' }} onChange={(e) => setValue("monto", e.target.value)} />
        </Col>
    </Row>
    <Row>
        <Col span={24}>
            <Button type="primary" style={{ marginTop: '16px' }} onClick={onSubmit}>
                Guardar
            </Button>
        </Col>
    </Row>
    </>
  );
};

export default FondoFijoForm;