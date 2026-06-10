import globals from "@/src/globals";
import { get, post } from "@/src/urls";
import { InfoCircleFilled, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  InputNumber,
  Modal,
  Row,
  Space,
  Table,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import Informe from "../informe/informe";
import { post_method } from "@/src/helpers/post_helper";
import { current_date_ymd } from "@/src/helpers/string_helper";

const ListadoVentasTM = (_) => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [reload, setReload] = useState(false);
  const [formsEnabled, setFormEnabled] = useState(true);
  const columns = [
    {
      render: (_, record) =>
        +record.isParent == 0 ? (
          <></>
        ) : (
          <>
            <Button
              onClick={(e) => {
                setVentaSeleccionada(record);
                setModalOpen(true);
              }}
            >
              <InfoCircleFilled />
            </Button>
          </>
        ),
      width: "50px",
      title: "info",
    },
    {
      sorter: (a, b) => +a.idventa - +b.idventa,
      dataIndex: "idventa",
      width: "80px",
      title: "ID",
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      // Render a custom input panel
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <InputNumber
            placeholder="Nro."
            value={selectedKeys[0]}
            onChange={(value) => {
              // Store the input value in selectedKeys (must be an array)
              setSelectedKeys(value !== null ? [value] : []);
            }}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block", width: "100%" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Filtrar
            </Button>
            <Button
              onClick={() => {
                if (clearFilters) clearFilters();
                confirm(); // Instantly refreshes the table context
              }}
              size="small"
              style={{ width: 90 }}
            >
              Borrar Filtro
            </Button>
          </Space>
        </div>
      ),
      // Execute evaluation against the text inputs
      onFilter: (value, record) => {
        // 'value' corresponds to selectedKeys[0] passed from the input field
        return record.idventa.toString().includes(value);
      },
    },
    {
      dataIndex: "cliente",
      width: "80px",
      title: "Cliente",
      sorter: (a, b) => a.cliente.localeCompare(b.cliente),
    },
    { dataIndex: "fecha", width: "80px", title: "Fecha" },
    {
      // 1. Define the choices appearing in the filter menu
      filters: [
        { text: "PENDIENTE", value: "PENDIENTE" },
        { text: "ENTREGADO", value: "ENTREGADO" },
        { text: "TERMINADO", value: "TERMINADO" },
      ],
      // 2. Define the local filtering execution logic
      onFilter: (value, record) => record.estado.includes(value),
      // 3. Optional: Set false if you only want a single selection
      filterMultiple: false,

      title: "Estado",
      width: "80px",
      dataIndex: "estado",
      render: (_, { estado, isParent, estado_trabajo }) => {
        if (+isParent === 0) {
          return (
            <Tag
              color={
                estado_trabajo == "LAB"
                  ? "red"
                  : estado_trabajo == "CALIBRADO"
                    ? "blue"
                    : estado_trabajo == "TERMINADO"
                      ? "green"
                      : estado_trabajo == "PEDIDO"
                        ? "orange"
                        : "purple"
              }
            >
              {estado_trabajo}
            </Tag>
          );
        }
        switch (estado) {
          case "PENDIENTE":
            return <b>{`${estado} `}</b>;
          case "ENTREGADO":
            return <b>{estado}</b>;
          case "ANULADO":
            return <b>{estado}</b>;
          case "TERMINADO":
            return <b>{estado}</b>;
        }
      },
    },
    {
      width: "80px",
      title: "Acciones",
      render: (_, record) =>
        "TERMINADO" == record.estado ? (
          <Button
            disabled={!formsEnabled}
            onClick={(_) => {
              marcar_entregado(record.idventa);
            }}
          >
            Marcar como Entregado
          </Button>
        ) : (
          <></>
        ),
    },
  ];
  const load = () => {
    setFormEnabled(false);
    fetch(get.obtener_ventas_tm + globals.obtenerSucursal())
      .then((response) => response.json())
      .then((response) => {
        setData(response.data);
        setFormEnabled(true);
      });
  };

  const marcar_entregado = (_idventa) => {
    setFormEnabled(false);
    post_method(
      post.cambiar_estado_venta,
      {
        idventa: _idventa,
        estado: "ENTREGADO",
        fecha_retiro: current_date_ymd(),
      },
      (resp) => {
        alert("OK");
        setReload(!reload);
        setFormEnabled(true);
      },
    );
  };

  useEffect(() => {
    load();
  }, [reload]);

  return (
    <>
      <Card title="Operaciones" size="small">
        <Row>
          <Col>
            <Table
              columns={columns}
              dataSource={data}
              scroll={{ y: "300" }}
              size="small"
            />
          </Col>
        </Row>
      </Card>
      <Modal
        destroyOnClose
        width={"1100px"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        title={`Venta ${ventaSeleccionada?.idventa}`}
      >
        <Informe idventa={ventaSeleccionada?.idventa} />
      </Modal>
    </>
  );
};

export default ListadoVentasTM;
