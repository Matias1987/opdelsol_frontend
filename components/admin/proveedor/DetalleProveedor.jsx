import { Button, Col, Input, Row } from "antd";
import { useEffect } from "react";

const DetalleProveedor = ({idproveedor, callback}) => {
    const [proveedor, setProveedor] = useState({
        nombre: "",
        telefono: "",
        correo: "",
        direccion: "",
        cuit: ""
    });

    const load = () =>{
        // Aquí iría la lógica para cargar los datos del proveedor usando el idproveedor
    }

    useEffect(()=>{
        load();
    }, [idproveedor]);

  return (
    <div>
      <Row>
        <Col span={24}>Detalle Proveedor</Col>
      </Row>
      <Row>
        <Col span={24}>
          <Input value={proveedor.nombre} placeholder="Nombre" />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Input value={proveedor.telefono} placeholder="Teléfono" />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Input value={proveedor.correo} placeholder="Correo" />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Input value={proveedor.direccion} placeholder="Dirección" />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Input value={proveedor.cuit} placeholder="CUIT" />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button>Guardar Cambios</Button>
        </Col>
      </Row>
    </div>
  );
};

export default DetalleProveedor;
