import {
  BarcodeOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Input, Modal, Row, Table } from "antd";
import { useState } from "react";
import BuscarCodigoFactura from "./buscarCodigoFactura";

const AgregarProductoFactura = () => {
  const [inputStr, setInputStr] = useState("");
  const [data, setData] = useState([]);
  const [localId, setLocalId] = useState(0);
  const [popupSelectCodigoOpen, setPopupSelectCodigoOpen] = useState(false);
  const columns = [
    { width:"230px", title: "Código", render: (_, record) => <>{record.codigo}</> },
    { width:"80px",
      title: <div style={{ textAlign: "right" }}>Cant.</div>,
      render: (_, record) => (
        <div style={{ textAlign: "right" }}>{record.cantidad}</div>
      ),
    },
    { width:"300px", title: "Descripción", render: (_, record) => <>{record.descripcion}</> },
    {
      title: "",
      render: (_, record) => (
        <>
          <Button
            danger
            size="large"
            onClick={(_) => {
              setData((_data) =>
                _data.filter((r) => r.idcodigo !== record.idcodigo)
              );
            }}
          >
            <CloseOutlined />
          </Button>
        </>
      ),
    },
  ];

  const onAddNewRow = (row) => {
    const code = data.find((r) => r.idcodigo == row.dicodigo);

    if (code) {
      //update quantity
      setData((_data) =>
        _data.map((_r) =>
          r.idcodigo == _r.idcodigo ? { ...r, cantidad: _r.cantidad + 1 } : _r
        )
      );
      return;
    }

    setData((_data) => [..._data, ...[row]]);
  };

  const onPressEnter = (_) => {
    if (inputStr.trim().length < 1) {
      return;
    }
    onAddNewRow({
      codigo: `CODIGO-${localId}`,
      descripcion: "",
      cantiad: 1,
      idcodigo: localId,
    });
    setLocalId((li) => li + 1);
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
        <BuscarCodigoFactura hideExtOpt={"1"} callback={(record) => {

            if(!record)
            {
                return;
            }
            
            setPopupSelectCodigoOpen(false);

            if(data.find(r=>r.idcodigo==record.idcodigo))
            {
                setData(_data=>_data.map(row=>row.idcodigo==record.idcodigo?{...row,cantidad:row.cantidad+1} : row))
                return;
            }
            
            setData(_data=>[..._data,...[{idcodigo: record.idcodigo, cantidad:1 , descripcion: record.descripcion, codigo: record.codigo}]]);
            
            
        }} />
      </Modal>
    </>
  );
};

export default AgregarProductoFactura;
