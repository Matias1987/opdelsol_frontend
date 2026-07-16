import globals from "@/src/globals";
import { get, post } from "@/src/urls";
import {
  AlertFilled,
  AlertOutlined,
  InfoCircleFilled,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
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
import { ignorar_paso_taller } from "@/src/config";

const ListadoVentasTM = (_) => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [reload, setReload] = useState(false);
  const [formsEnabled, setFormEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      render: (_, record) => <></>,
      width: "15px",
      title: "",
    },
    {
      sorter: (a, b) => +a.idventa - +b.idventa,
      dataIndex: "idventa",
      width: "50px",
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

      render: (_, record) =>
        +record.isParent == 0 ? (
          <span
            style={{ fontStyle: "italic", fontSize: "1.1em", color: "#000a9c" }}
          >
            {record.idventa}-{record.idtrabajo}
          </span>
        ) : (
          <>
            {record.idventa}
            <Button
              type="link"
              onClick={(e) => {
                setVentaSeleccionada(record);
                setModalOpen(true);
              }}
            >
              <InfoCircleFilled />
            </Button>
          </>
        ),
    },
    {
      dataIndex: "cliente",
      width: "100px",
      title: "Cliente",
      render: (_, record) =>
        1 === +record.isParent ? <>{record.cliente}</> : <></>,
      sorter: (a, b) => a.cliente.localeCompare(b.cliente),
    },
    {
      dataIndex: "fecha",
      width: "60px",
      title: "Fecha",
      render: (_, record) =>
        1 === +record.isParent ? <>{record.fecha}</> : <></>,
    },
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
      width: "60px",
      dataIndex: "estado",
      render: (_, { estado, isParent, estado_trabajo }) => {
        if (+isParent === 0) {
          if (true == ignorar_paso_taller || "ANULADO" == estado || "ENTREGADO" == estado) {
            return "";
          }
          return (
            <>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span
                style={{
                  fontWeight: "bold",
                  color: `${
                    estado_trabajo == "LAB"
                      ? "red"
                      : estado_trabajo == "CALIBRADO"
                        ? "blue"
                        : estado_trabajo == "TERMINADO"
                          ? "green"
                          : estado_trabajo == "PEDIDO"
                            ? "orange"
                            : "purple"
                  }`,
                }}
              >
                {estado_trabajo}
              </span>
            </>
          );
        }
        switch (estado) {
          case "PENDIENTE":
            return (
              <span
                style={{
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  color: "#eb0202",
                }}
              >{`En Taller`}</span>
            );
          case "ENTREGADO":
            return (
              <span
                style={{
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  color: "#007914",
                }}
              >
                Entregado
              </span>
            );
          case "ANULADO":
            return (
              <span
                style={{
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  color: "#490101",
                }}
              >
                Anulado
              </span>
            );
          case "TERMINADO":
            return (
              <span
                style={{
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  color: "#000cb8",
                }}
              >
                Terminado
              </span>
            );
        }
      },
    },
    {
      width: "80px",
      title: "Acciones",
      render: (_, record) => (
        <>
          {+record.isParent === 1 &&
          ("TERMINADO" == record.estado || ignorar_paso_taller) &&
          "ENTREGADO" != record.estado &&
          "ANULADO" != record.estado ? (
            <Button
              type="dashed"
              size="small"
              style={{ color: "red", fontWeight: "bold" }}
              disabled={!formsEnabled}
              onClick={(_) => {
                if (!confirm("Confirmar Marcar como Entregado")) {
                  return;
                }
                marcar_entregado(record.idventa);
              }}
            >
              Marcar como Entregado
            </Button>
          ) : (
            <></>
          )}
          {+record.isParent === 1 &&
          "ENTREGADO" != record.estado &&
          "ANULADO" != record.estado ? (
            <Button
              danger
              size="small"
              type="dashed"
              onClick={(_) => {
                if (!confirm("Confirmar Anular Venta")) {
                  return;
                }
                anular_venta(record.idventa);
              }}
            >
              Anular
            </Button>
          ) : (
            <></>
          )}
        </>
      ),
    },
  ];
  const load = () => {
    setLoading(true);
    setFormEnabled(false);
    fetch(get.obtener_ventas_tm + globals.obtenerSucursal() + "/0")
      .then((response) => response.json())
      .then((response) => {
        setData(response.data);
        setFormEnabled(true);
        setLoading(false);
      });
  };

  const marcar_entregado = (_idventa) => {
    setFormEnabled(false);
    post_method(
      post.entrega_venta_distrib,
      {
        idventa: _idventa,
      },
      (resp) => {
        setReload(!reload);
        setFormEnabled(true);
      },
    );
  };

  const anular_venta = (_idventa) => {
    setFormEnabled(false);
    post_method(
      post.update.anular_venta_multiple,
      {
        idventa: _idventa,
      },
      (resp) => {
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
      <Card
        style={{
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
          borderRadius: "16px",
        }}
        styles={{
          header: {
            backgroundColor: "##ffffed",
            background:
              "linear-gradient(281deg, #ffebcd 32%, rgba(231,233,235, 1) 75%)",
            borderBottom: "1px solid #eee",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          },
        }}
        title="Operaciones"
        size="small"
        extra={
          <>
            <Button
              onClick={(_) => {
                setReload(!reload);
              }}
              type="link"
            >
              <ReloadOutlined />
            </Button>
          </>
        }
      >
        <Row>
          <Col>
            <Table
              loading={loading}
              columns={columns}
              dataSource={data}
              scroll={{ y: "300" }}
              size="small"
              rowClassName={(record, index) =>
                +record.idtrabajo < 0 || +record.isParent == 1
                  ? index % 2 === 0 ? "table-row-light" : "table-row-dark"
                  : "table-row-light-yellow"
              }
            />
          </Col>
        </Row>
      </Card>
      <Modal
        footer={null}
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
/*
Looking out across the nighttime
The city winks a sleepless eye
Hear her voice shake my window
Sweet seducing sighs

Get me out into the nighttime
Four walls won't hold me tonight
If this town is just an apple
Then let me take a bite

If they say: Why? Why?
Tell them that it's human nature
Why? Why does he do me that way?
If they say: Why? Why?
Tell them that it's human nature
Why? Why does he do me that way?

Reaching out to touch a stranger
Electric eyes are everywhere
See that girl, she knows I'm watching
She likes the way I stare

If they say: Why? Why?
Just tell them that it's human nature
Why? Why does he do me that way?
If they say: Why? Why?
(She's keeping him by, keeping him around)
Tell them that it's human nature
Why? Why does he do me that way?

I like livin' this way
I like lovin' this way
(That way) why? Oh, why?
(That way) why? Oh, why?

Looking out across the morning
The city's heart begins to beat
Reaching out, I touch her shoulder
I'm dreaming of the street

If they say: Why? Why?
Tell them that it's human nature
Why? Why does he do me that way?
If they say: Why? Why?
(She's keeping him by, keeping him around)
Oh, tell 'em!
Why? Why does he do me that way?

If they say: Why? Why?
Cha-cha-cha-cha-cha (why? Why?)
Oh, why? Why does he do me that way?

If they say: Why? Why?
(She's keeping him by, keeping him around)
Oh, tell 'em!
Why? Why does he do me that way?
If they say: Why? Why?
Oh, tell 'em!
Why? Why does he do me that way?

If they say: Why? Why?
(She's keeping him by, keeping him around)
Da-da-da-da-da-da-da
Why? Why does he do me that way?

I like living this way
Why? Oh, why? (That way)
Why? Oh, why? (That way)
Why? Oh, why? (That way)*/
