import CustomModal from "@/components/CustomModal";
import { Button, Col, Input, Modal, Row, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { CloseOutlined, PlusOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { get } from "@/src/urls";
import ClienteFormV2 from "../ClienteFormV2";

const SelectClienteDescuento = ({callback}) => {
  const [clientes, setClientes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popupAddOpen, setPopupAddOpen] = useState(false);

  const [reload, setReload] = useState(false);
  const columns = [
    { dataIndex: "apellido", title: "Apellido", key: "apellido" },
    { dataIndex: "nombre", title: "Nombre", key: "nombre" },
    { dataIndex: "dni", title: "DNI", key: "dni" },
    { dataIndex: "direccion", title: "Direccion", key: "direccion" },
  ];

  const load = () => {
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
          })),
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    load();
  }, [reload]);

  return (
    <>
      <Table
        onRow={(record, index) => ({
          onClick: (e) => {
            if (+record.bloqueado == 1) {
              alert("Cliente bloqueado");
              return;
            }
            callback?.(record);
          },
        })}
        title={(_) => (
          <Row gutter={16}>
            <Col>
              <span style={{ fontWeight: "bold" }}>Clientes</span>{" "}
            </Col>
            <Col><Input addonAfter={<><SearchOutlined /></>} /></Col>

            <Col>
              <Button
                onClick={(_) => {
                  setPopupAddOpen(true);
                }}
              >
                <PlusOutlined /> Agregar
              </Button>
            </Col>
            
            <Col>
              <Button
                size="middle"
                style={{ color: "red" }}
                onClick={() => {
                  setReload(!reload);
                }}
                type="text"
              >
                <ReloadOutlined />
              </Button>
            </Col>
          </Row>
        )}
        size="small"
        scroll={{ y: "500px" }}
        loading={loading}
        rowClassName={(record, index) =>
          record.bloqueado
            ? "error-row"
            : index % 2 === 0
              ? "table-row-light"
              : "table-row-dark"
        }
        columns={columns}
        dataSource={clientes}
      />
      <Modal
        open={popupAddOpen}
        onCancel={(_) => {
          setPopupAddOpen(false);
        }}
        title="Agregar Cliente"
        destroyOnClose
        width={"900px"}
        footer={null}
      >
        <ClienteFormV2
          callback={(id) => {
            setReload(!reload);
            upload_cliente_details(id);
          }}
        />
      </Modal>
    </>
  );
};
export default SelectClienteDescuento;
