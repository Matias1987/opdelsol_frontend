import {
  BarcodeOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Input, Modal, Row, Table } from "antd";
import { useState } from "react";
import BuscarCodigoFactura from "./buscarCodigoFactura";
import { get } from "@/src/urls";

const AgregarProductoFactura = ({ onchange }) => {
  const [inputStr, setInputStr] = useState("");
  const [data, setData] = useState([]);
  const [popupSelectCodigoOpen, setPopupSelectCodigoOpen] = useState(false);
  const columns = [
    {
      width: "200px",
      title: "Código",
      render: (_, record) => <>{record.codigo}</>,
    },
    {
      width: "80px",
      title: <div style={{ textAlign: "right" }}>Cant.</div>,
      render: (_, record) => (
        <>
          <Input
            type="number"
            min={1}
            value={record.cantidad}
            onChange={(e) => {
              const v = parseInt(e.target.value || "1");
              onSetData(record.idcodigo, "cantidad", v < 1 ? 1 : v);
            }}
          />
        </>
      ),
    },
    {
      width: "200px",
      title: "Descripción",
      render: (_, record) => <>{record.descripcion}</>,
    },
    {
      width: "120px",
      title: "Precio",
      render: (_, record) => (
        <>
          <Input
            value={record.precio}
            step={0.01}
            type="number"
            min={0}
            prefix={"$"}
            onChange={(e) =>
              onSetData(record.idcodigo, "precio", e.target.value)
            }
          />
        </>
      ),
    },
    {
      title: "",
      render: (_, record) => (
        <>
          <Button
            danger
            size="large"
            onClick={(_) => {
              onRemoveData(record.idcodigo);
            }}
          >
            <CloseOutlined />
          </Button>
        </>
      ),
    },
  ];

  const onRemoveData = (idcodigo) => {
    setData((_data) => {
      const _new_data = _data.filter((r) => r.idcodigo !== idcodigo);
      onchange?.(_new_data);
      return _new_data;
    });
  };

  const onSetData = (idcodigo, index, value) => {
    setData((_data) => {
      const _new_data = _data.map((r) =>
        r.idcodigo == idcodigo ? { ...r, [index]: value } : r
      );
      onchange?.(_new_data);
      return _new_data;
    });
  };

  const onAddData = (newData) => {
    setData((_data) => {
      const _new_data = [..._data, ...[newData]];
      onchange?.(_new_data);
      return _new_data;
    });
  };

  const addOrUpdateRow = (row) => {
    const code = data.find((r) => +r.idcodigo == +row.idcodigo);

    if (code) {
      //update quantity
      onSetData(code.idcodigo, "cantidad", code.cantidad + 1);
      return;
    }
    //add new row
    onAddData(row);
  };

  const onPressEnter = (_) => {
    const _inputstr = inputStr.trim();
    setInputStr("");
    if (_inputstr.length < 1) {
      return;
    }
    if (!/^[0-9]+$/.test(_inputstr)) {
      alert("Invalid ID");
      return;
    }
    fetch(get.detalle_codigo + _inputstr)
      .then((r) => r.json())
      .then((response) => {
        if (!response) {
          return;
        }

        if ((response?.data || []).length < 1) {
          return;
        }
        const _the_code = response.data[0];
        addOrUpdateRow({
          idcodigo: _the_code.idcodigo,
          codigo: _the_code.codigo,
          descripcion: _the_code.descripcion,
          cantidad: 1,
          precio: _the_code.costo,
        });
      });
  };

  const onChange = (e) => {
    setInputStr((e.target.value || "").toUpperCase());
  };

  return (
    <>
      <Row>
        <Col span={24} style={{ padding: "0" }}>
          Agregar C&oacute;digos
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ padding: "0" }}>
          <Card
            styles={{ header: { backgroundColor: "#eeeeeeff" } }}
            title={
              <>
                <Row gutter={16}>
                  <Col>
                    <Button
                      size="middle"
                      type="primary"
                      onClick={(_) => {
                        setPopupSelectCodigoOpen(true);
                      }}
                    >
                      <SearchOutlined /> Seleccionar C&oacute;digo{" "}
                    </Button>
                  </Col>
                  <Col>
                    <Input
                      prefix={
                        <>
                          <BarcodeOutlined />
                        </>
                      }
                      value={inputStr}
                      onPressEnter={onPressEnter}
                      onChange={onChange}
                      allowClear
                      style={{ width: "100%" }}
                    />
                  </Col>
                </Row>
              </>
            }
          >
            <Table
              size="small"
              dataSource={data}
              columns={columns}
              pagination={false}
              scroll={{ y: "300px" }}
            />
          </Card>
        </Col>
      </Row>
      <Modal
        footer={null}
        open={popupSelectCodigoOpen}
        onCancel={(_) => {
          setPopupSelectCodigoOpen(false);
        }}
        title="Buscar Codigo"
        destroyOnClose
        width={"800px"}
      >
        <BuscarCodigoFactura
          hideExtOpt={"1"}
          callback={(record) => {
            if (!record) {
              return;
            }

            setPopupSelectCodigoOpen(false);

            addOrUpdateRow({
              idcodigo: record.idcodigo,
              cantidad: 1,
              descripcion: record.descripcion,
              codigo: record.codigo,
              precio: record.costo,
            });
          }}
        />
      </Modal>
    </>
  );
};

export default AgregarProductoFactura;
