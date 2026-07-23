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
import { useEffect, useState } from "react";
import SelectClienteDescuento from "./selectClienteDescuento";
import { post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";
import IconViewSubgrupoSelector from "@/components/deposito/iconViewSubgrupoSelector";
import DetalleSubgrupo from "@/components/DetalleSubgrupo";
import { CloseOutlined } from "@ant-design/icons";

const NuevoDescuento = ({ callback, pCliente }) => {
  const [descuentoGral, setDescuentoGral] = useState(false);
  const [modalClientesOpen, setModalClientesOpen] = useState(false);
  const [clientesSeleccionados, setClientesSeleccionados] = useState([]);
  const [idsubgrupo, setIdSubGrupo] = useState(-1);
  const [porcentaje, setPorcentaje] = useState(0);
  const [clienteSelectionEnabled, setClienteSelectionEnabled] = useState(true);
  const columns = [
    { dataIndex: "nombre", title: "Nombre", key: "nombre" },
    { dataIndex: "dni", title: "DNI", key: "dni" },
    {
      render: (_, record) => (
        <Button
          danger
          size="small"
          onClick={() => {
            setClientesSeleccionados((c) =>
              c.filter((cl) => cl.idcliente != record.idcliente),
            );
          }}
        >
          Eliminar
        </Button>
      ),
    },
  ];
  const onAgregarCliente = (cliente) => {
    if (clientesSeleccionados.find((c) => c.idcliente == cliente.idcliente)) {
      alert("Cliente ya seleccionado");
      return;
    }
    setClientesSeleccionados((c) => [...c, cliente]);
  };

  const guardarDescuento = () => {
    const payload = {
      descuentoGral,
      porcentaje,
      idsubgrupo,
      idclientes: clientesSeleccionados.map((c) => c.idcliente),
    };
    //alert(post.insert.descuento_cliente);
    //alert(JSON.stringify(payload));
    post_method(post.insert.descuento_cliente, payload, (res) => {
      // Reset form
      setDescuentoGral(false);
      setClientesSeleccionados([]);
      setIdSubGrupo(-1);
      setPorcentaje(0);
      alert("Descuento guardado con éxito");
      callback?.();
    });
  };

  useEffect(() => {
    if (pCliente) {
      setClienteSelectionEnabled(false);
      setClientesSeleccionados((c) => [...c, pCliente]);
    }
  }, []);

  const row_style = { padding: "8px" };
  return (
    <div>
      <Card
        title=""
        size="small"
        style={{ boxShadow: "-1px 1px 1px 1px #9e9c9c" }}
      >
        {!clienteSelectionEnabled ? (
          <></>
        ) : (
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
              <Button
                danger
                disabled={descuentoGral}
                onClick={(_) => {
                  setModalClientesOpen(true);
                }}
              >
                Seleccionar Clientes...
              </Button>
            </Col>
          </Row>
        )}
        {pCliente ? (
          <Row style={{ padding: "6px" }}>
            <Col>
              <span>Cliente: </span>&nbsp;
              <span style={{ fontWeight: "bold" }}>
                {pCliente.apellido + " " + pCliente.nombre}
              </span>
            </Col>
          </Row>
        ) : (
          <></>
        )}

        {!clienteSelectionEnabled || descuentoGral ? (
          <></>
        ) : (
          <Row style={row_style}>
            <Col span={24}>
              <Table
                size="small"
                title={(_) => <>Clientes</>}
                dataSource={clientesSeleccionados}
                columns={columns}
                pagination={false}
                scroll={{ y: 200 }}
              />
            </Col>
          </Row>
        )}
        <Row style={row_style}>
          <Col span={24} style={{ fontWeight: "600", paddingBottom: "4px" }}>
            Seleccione Categor&iacute;a:
          </Col>
          <Col span={24}>
            {/*<SubGroupSelectV2
              title="Seleccione..."
              callback={(res) => {
                setIdSubGrupo(res);
              }}
            />*/}
            {idsubgrupo > 0 ? (
              <>
                <Row gutter={[4, 4]}>
                  <Col>
                    <DetalleSubgrupo
                      idsubgrupo={idsubgrupo}
                      closable={true}
                      onClose={(_) => setIdSubGrupo(-1)}
                    />
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <IconViewSubgrupoSelector
                  disableAdd={true}
                  idInicial={19}
                  tipoInicial={"familia"}
                  nombreInicial={"DISTRIBUIDORA"}
                  size={"s"}
                  vistaTabla={true}
                  callback={(id) => {
                    if (!id) {
                      return;
                    }
                    setIdSubGrupo(id);
                  }}
                  modoDistribuidora={true}
                />
              </>
            )}
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
            <Button block type="primary" onClick={guardarDescuento}>
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
        <SelectClienteDescuento
          callback={(c) => {
            onAgregarCliente(c);
          }}
        />
      </Modal>
    </div>
  );
};

export default NuevoDescuento;
