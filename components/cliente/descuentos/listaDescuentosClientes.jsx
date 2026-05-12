import {
  EditOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Card, Checkbox, Col, Divider, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import NuevoDescuento from "./nuevoDescuento";
import { get, post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";
import SubGrupoFormV3 from "@/components/forms/deposito/SubgrupoFormV3";

const ListaDescuentosClientes = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [popupDetalleOpen, setPopupDetalleOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedSubgrupoId, setSelectedSubgrupoId] = useState(-1);
  const columns = [
    {
      render: (_, record) => (
        <>{+record.todos == 0 ? <>Cliente</> : <>General</>}</>
      ),
      title: "Tipo",
    },
    { dataIndex: "cliente", title: "Cliente" },
    { dataIndex: "porcentaje", title: "%" },
    {
      dataIndex: "subgrupo",
      title: "Subgrupo",
      render: (_, record) => (
        <>
          {record.subgrupo}&nbsp;
          <Button
            danger
            type="dashed"
            onClick={(_) => {
              setSelectedSubgrupoId(record.fk_subgrupo);
              setPopupDetalleOpen(true);
            }}
          >
            <InfoCircleOutlined />
          </Button>
        </>
      ),
    },
    {
      render: (_, record) => (
        <>
          <Checkbox
            checked={record.activo}
            onChange={(_) => {
              //setData(d=>d.map(row=>(row.id_descuento!=record.id_descuento ? row : {...row, activo: !row.activo} )))
              cambiarEstadoDescuento(
                record.id_descuento,
                record.activo ? 0 : 1,
              );
            }}
          ></Checkbox>
        </>
      ),
      title: "Activo",
    },
  ];
  const load = () => {
    fetch(get.obtener_lista_descuentos)
      .then((r) => r.json())
      .then((response) => {
        //alert(JSON.stringify(response));
        setData(response.map((row) => ({ ...row, activo: +row.activo == 1 })));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const cambiarEstadoDescuento = (id_descuento, activo) => {
    post_method(
      post.update.cambiar_estado_descuento,
      { id_descuento, activo },
      (response) => {
        setReload(!reload);
      },
    );
  };

  useEffect(() => {
    load();
  }, [reload]);
  return (
    <div>
      <Card
        size="small"
        title="Lista de descuentos"
        extra={
          <>
            <Button
              type="primary"
              onClick={(_) => {
                setModalOpen(true);
              }}
            >
              <PlusOutlined /> Agregar
            </Button>
          </>
        }
      >
        <Row>
          <Col span={24}>
            <Table
              size="small"
              columns={columns}
              dataSource={data}
              pagination={false}
              scroll={{ y: "300" }}
            />
          </Col>
        </Row>
      </Card>
      <Modal
        open={modalOpen}
        onCancel={(_) => {
          setModalOpen(false);
        }}
        destroyOnClose
        width={"700px"}
        footer={null}
        title="Agregar Descuento"
      >
        <NuevoDescuento
          callback={(_) => {
            setModalOpen(false);
            setReload(!reload);
          }}
        />
      </Modal>
      <Modal
        destroyOnClose
        open={popupDetalleOpen}
        onCancel={() => {
          setPopupDetalleOpen(false);
        }}
        footer={null}
        title="  "
        width={"950px"}
      >
        <div>
          <SubGrupoFormV3
            mostrarPrecioMayorista={true}
            mostrarPrecioPar={false}
            mostrarPrecioCaja={false}
            callback={() => {
              setPopupDetalleOpen(false);
              setReload(!reload);
            }}
            readOnly={false}
            idsubgrupo={selectedSubgrupoId}
            title="Detalle Subgrupo"
          />
        </div>
      </Modal>
    </div>
  );
};

export default ListaDescuentosClientes;
