import { get, post } from "@/src/urls";
import { Button, Card, Checkbox, Col, Input, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import ObraSocialForm from "../forms/ObraSocialForm";
import { post_method } from "@/src/helpers/post_helper";

const ListaMutuales = () => {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [popupAddOpen, setPopupAddOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
    },
    {
      title: "Activo",
      render: (_, record) => (
        <>
          <Checkbox
            checked={record.checked}
            onChange={(_) => {
              onActivoChange(record, () => {
                setReload(!reload);
              });
            }}
          ></Checkbox>
        </>
      ),
    },
  ];

  const onActivoChange = (record, callback) => {
    setLoading(true);
    post_method(post.modificar_mutual_activo, 
      {
        id: record.idmutual,
        activo: record.checked ? 0 : 1,
      },
      (response)=>{
        setReload(!reload);
      }
    )
  };

  const load = () => {
    setLoading(true);
    fetch(get.lista_mutuales_todos)
      .then((response) => response.json())
      .then((response) => {
        setData(
          response.data.map((r) => ({
            idmutual: r.idmutual,
            nombre: (r.nombre ?? "").toUpperCase(),
            checked: +r.activo === 1,
          })),
        );
        setLoading(false);
      });
  };
  useEffect(() => {
    load();
  }, [reload]);
  return (
    <>
      <Card
        title="Listado de Mutuales"
        extra={
          <>
            <Button
              type="primary"
              onClick={(_) => {
                setPopupAddOpen(true);
              }}
            >
              Agregar
            </Button>
          </>
        }
      >
        <Row>
          <Col span={24}>
            <Table
              loading={loading}
              title={(_) => (
                <>
                  <Input
                    allowClear
                    prefix="Buscar"
                    value={searchText}
                    onChange={(e) => {
                      setSearchText((e.target.value ?? "").toUpperCase());
                    }}
                  />
                </>
              )}
              columns={columns}
              dataSource={
                searchText.length > 0
                  ? data.filter((d) =>
                      d.nombre.toLowerCase().includes(searchText.toLowerCase()),
                    )
                  : data
              }
            />
          </Col>
        </Row>
      </Card>
      <Modal
        title="Agregar Mutual"
        destroyOnClose
        open={popupAddOpen}
        onCancel={() => setPopupAddOpen(false)}
        footer={null}
        width={"500px"}
      >
        <ObraSocialForm
          callback={() => {
            setReload(!reload);
            setPopupAddOpen(false);
          }}
        />
      </Modal>
    </>
  );
};

export default ListaMutuales;
