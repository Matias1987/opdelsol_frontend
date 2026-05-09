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
import { post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";

const NuevoDescuento = () => {
  const [descuentoGral, setDescuentoGral] = useState(false);
  const [modalClientesOpen, setModalClientesOpen] = useState(false);
  const [clientesSeleccionados, setClientesSeleccionados] = useState([]);
  const [idsubgrupo, setIdSubGrupo] = useState(-1);
  const [porcentaje, setPorcentaje] = useState(0);
  const columns = [
    { dataIndex: "apellido", title: "Apellido", key: "apellido" },
    { dataIndex: "nombre", title: "Nombre", key: "nombre" },
    { dataIndex: "dni", title: "DNI", key: "dni" },
    { dataIndex: "direccion", title: "Direccion", key: "direccion" },
    {render: (_, record) => <Button danger size="small" onClick={() => {
      setClientesSeleccionados((c) => c.filter((cl) => cl.idcliente != record.idcliente));
    }}>Eliminar</Button>}
  ]
  const onAgregarCliente = (cliente) => {
    if (clientesSeleccionados.find((c) => c.idcliente == cliente.idcliente)) {
      alert("Cliente ya seleccionado");
      return;
    }
    setClientesSeleccionados((c) => [...c, cliente]);
  }

  const guardarDescuento = () => {
    const payload = {
      descuentoGral,
      porcentaje,
      idsubgrupo,
      idclientes: clientesSeleccionados.map(c => c.idcliente),
    };
    //alert(post.insert.descuento_cliente);
    //alert(JSON.stringify(payload));
    post_method(post.insert.descuento_cliente, payload, (res)=>{
      // Reset form
      setDescuentoGral(false);
      setClientesSeleccionados([]);
      setIdSubGrupo(-1);
      setPorcentaje(0);
      alert("Descuento guardado con éxito");
    })
    
  };

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
              <Table  size="small" title={(_) => <>Clientes</>} dataSource={clientesSeleccionados} columns={columns} />
            </Col>
          </Row>
        )}
        <Row style={row_style}>
          <Col span={24}>Categor&iacute;a:</Col>
          <Col span={24}>
            <SubGroupSelectV2
              title="Seleccione..."
              callback={(res) => {
                setIdSubGrupo(res);
                //alert(JSON.stringify(res));
              }}
            />
          </Col>
        </Row>
        <Row style={row_style}>
          <Col span={24}>Porcentaje:</Col>
          <Col span={24}>
            <InputNumber
              addonAfter="%"
              value={porcentaje}
              onChange={(value) => setPorcentaje(value)}
            />
          </Col>
        </Row>
        <Row style={row_style}>
          <Col span={24}>
            <Button type="primary" onClick={guardarDescuento}>
              Guardar
            </Button>
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
        <SelectClienteDescuento callback={c=>{onAgregarCliente(c)}} />
      </Modal>
    </div>
  );
};

export default NuevoDescuento;
