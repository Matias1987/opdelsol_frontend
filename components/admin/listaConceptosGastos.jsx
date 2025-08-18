import { Button, Card, Checkbox, Col, Input, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import AgregarConceptoGastoForm from "./agregarConceptoGasto";
import { get, public_urls } from "@/src/urls";
import { PlusOutlined } from "@ant-design/icons";

const ListaConceptosGastos = (props) => {
  const [data, setData] = useState([]);
  const [agregarOpen, setAgregarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Activo",
      dataIndex: "activo",
      key: "activo",
      render: (_, { activo }) => (
        <>
          <Checkbox checked={activo} disabled />
        </>
      ),
    },
  ];

  const load = () => {
    fetch(get.conceptos_gasto)
      .then((res) => res.json())
      .then((res) => setData(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Card
        size="small"
        title={
          <>
            Lista de Conceptos de Gastos&nbsp;&nbsp;
            <Button size="small" type="link" onClick={() => setAgregarOpen(true)}>
              <PlusOutlined /> Agregar
            </Button>
          </>
        }
        extra={
          <>
            <Input
              prefix="Búsqueda"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Buscar concepto"
              style={{ width: 350, marginRight: 10 }}
              allowClear
            />
          </>
        }
      >
        <Row>
          <Col span={24}>
            <Table
              rowClassName={(record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
              size="small"
              columns={columns}
              dataSource={data.filter((item) =>
                item.nombre.toUpperCase().includes(searchValue.toUpperCase())
              )}
            />
          </Col>
        </Row>
      </Card>
      <Modal
        title="Agregar Concepto de Gasto"
        open={agregarOpen}
        onCancel={() => setAgregarOpen(false)}
        footer={null}
      >
        <AgregarConceptoGastoForm
          callback={(_) => {
            setAgregarOpen(false);
            load();
          }}
        />
      </Modal>
    </>
  );
};

export default ListaConceptosGastos;
