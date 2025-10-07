import { Button, Card, Col, Input, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { ReloadOutlined } from "@ant-design/icons";

import { get } from "@/src/urls";
import FichaCliente from "@/components/FichaCliente";
import LayoutCaja from "@/components/layout/layout_caja";
import DetalleCliente from "@/components/DetalleCliente";
import ClienteFormV2 from "./forms/ClienteFormV2";
import ListaPagares from "./forms/caja/ListaPagares";

export default function ListaClientes(props) {
  const [clientes, setClientes] = useState(null);
  const [searchVal, setSearchVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(false);
  const [modalFichaOpen, setModalFichaOpen] = useState(false);
  const [modalDetalleOpen, setModalDetalleOpen] = useState(false);
  const [modalPagareOpen, setModalPagareOpen] = useState(false);
  const [modalNuevoClienteOpen, setModalNuevoClienteOpen] = useState(false);
  const onSearch = (value) => {
    if ((value || "").trim().length < 1) {
      return;
    }
    setLoading(true);
    const params = encodeURIComponent(value);
    fetch(get.buscar_cliente + params)
      .then((response) => response.json())
      .then((response) => {
        setClientes(
          response.data.map((r) => ({
            dni: r.dni,
            idcliente: r.idcliente,
            apellido: r.apellido,
            nombre: r.nombre,
            direccion: r.direccion,
            bloqueado: r.bloqueado,
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const refresh = () => {
    setLoading(true);
    fetch(get.lista_clientes)
      .then((response) => response.json())
      .then((response) => {
        setClientes(
          response.data.map((r) => ({
            dni: r.dni,
            idcliente: r.idcliente,
            apellido: r.apellido,
            nombre: r.nombre,
            direccion: r.direccion,
            telefono1: r.telefono1,
            bloqueado: r.bloqueado,
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    refresh();
  }, []);

  const columns = [
    {
      width: "100px",
      dataIndex: "apellido",
      title: "Apellido",
      key: "apellido",
    },
    { width: "100px", dataIndex: "nombre", title: "Nombre", key: "nombre" },
    { width: "100px", dataIndex: "dni", title: "DNI", key: "dni" },
    {
      width: "150px",
      dataIndex: "direccion",
      title: "Direccion",
      key: "direccion",
    },
    {
      width: "80px",
      dataIndex: "idcliente",
      title: "",
      key: "acciones",
      render: (_, { idcliente }) => (
        <>
          {typeof props.ficha !== "undefined" ? (
            <Button
              type="link"
              size="small"
              onClick={(_) => {
                setSelectedCliente(idcliente);
                setModalFichaOpen(true);
              }}
            >
              <b>Ficha</b>
            </Button>
          ) : (
            <></>
          )}
          <Button
            type="link"
            size="small"
            onClick={(_) => {
              setSelectedCliente(idcliente);
              setModalPagareOpen(true);
            }}
          >
            Pagar&eacute;s
          </Button>
          <Button
            type="link"
            size="small"
            onClick={(_) => {
              setSelectedCliente(idcliente);
              setModalDetalleOpen(true);
            }}
          >
            Detalle
          </Button>
        </>
      ),
    },
  ];

  const row_style = {
    padding: "6px",
  };

  return (
    <>
      <Card
        size="small"
        style={{ boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}
        title={
          <div>
            <span style={{ fontSize: "1.2em" }}>Lista de Clientes</span>
            &nbsp;&nbsp;&nbsp;
          </div>
        }
        extra={<><Button type="primary" onClick={() => setModalNuevoClienteOpen(true)}>Nuevo Cliente</Button></>}
      >
        <Row style={row_style}>
          <Col span={24}>
            <Input.Search
              prefix={
                <span style={{ backgroundColor: "#DBE3E6" }}>
                  Buscar por Nombre o DNI:&nbsp;&nbsp;&nbsp;
                </span>
              }
              allowClear
              onSearch={onSearch}
              value={searchVal}
              onChange={(e) => {
                setSearchVal(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row style={row_style}>
          <Col span={12}></Col>
          <Col span={12}>
            &nbsp;&nbsp;&nbsp;
            <Button
              size="small"
              type="text"
              onClick={(e) => {
                setSearchVal((s) => {
                  refresh();
                  return "";
                });
              }}
            >
              <ReloadOutlined />
              Recargar
            </Button>
          </Col>
        </Row>
        <Row style={row_style}>
          <Col span={24}>
            <Table
              size="small"
              bordered
              scroll={{ y: "350px" }}
              loading={loading}
              rowClassName={(record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
              columns={columns}
              dataSource={clientes}
            />
          </Col>
        </Row>
      </Card>
      <Modal
        title="Ficha Cliente"
        destroyOnClose
        width={"1200px"}
        open={modalFichaOpen}
        footer={null}
        onCancel={() => {
          setModalFichaOpen(false);
        }}
      >
        <FichaCliente idcliente={selectedCliente} open={modalFichaOpen} />
      </Modal>
      <Modal
        title="Pagarés"
        destroyOnClose
        width={"1200px"}
        open={modalPagareOpen}
        footer={null}
        onCancel={() => {
          setModalPagareOpen(false);
        }}
      >
        <ListaPagares idcliente={selectedCliente} />
      </Modal>
      <Modal
        title="Detalle"
        destroyOnClose
        width={"1200px"}
        open={modalDetalleOpen}
        footer={null}
        onCancel={() => {
          setModalDetalleOpen(false);
        }}
      >
        <DetalleCliente idcliente={selectedCliente} />
      </Modal>
      <Modal
        title="Nuevo Cliente"
        destroyOnClose
        width={"900px"}
        open={modalNuevoClienteOpen}
        footer={null}
        onCancel={() => {
          setModalNuevoClienteOpen(false);
        }}
      >
        <ClienteFormV2
          callback={(id) => {
            setModalNuevoClienteOpen(false);
            refresh();
          }}
        />
      </Modal>
    </>
  );
}

ListaClientes.PageLayout = LayoutCaja;
