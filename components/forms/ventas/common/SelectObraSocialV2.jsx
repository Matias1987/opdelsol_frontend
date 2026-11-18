import CustomModal from "@/components/CustomModal";
import CloseOutlined from "@ant-design/icons/CloseOutlined";
import { Button, Input, Modal, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import ObraSocialForm from "../../ObraSocialForm";
import { get } from "@/src/urls";

const SelectObraSocialV2 = (props) => {
  const { pIdOS } = props;
  const [idOS, setIdOS] = useState(-1);
  const [obrasociales, setObraSociales] = useState([]);
  const [dataObraSocial, setDataObraSocial] = useState(null);
  const [loading, setLoading] = useState(false);
  const columns = [{ title: "Nombre", dataIndex: "nombre" }];
  const [modalSelectOpen, setModalSelectOpen] = useState(false);
  useEffect(() => {
    if (pIdOS && pIdOS != -1) {
      onOSSelected(pIdOS);
    }
  }, []);

  const onOpen = () => {
    setLoading(true);
    fetch(get.lista_mutuales)
      .then((response) => response.json())
      .then((response) => {
        setObraSociales(
          response.data.map((r, index) => ({
            nombre: r.nombre,
            idmutual: r.idmutual,
            key: index,
          })),
        );
        setLoading(false);
      });
  };

  const show_details = () =>
    dataObraSocial == null ? (
      <Spin />
    ) : (
      <>
        <span style={{ fontWeight: "400", color: "#000000" }}>
          Obra Social:
        </span>{" "}
        <b>{dataObraSocial.nombre}</b>
        <Button
          style={{ color: "red" }}
          type="ghost"
          onClick={() => {
            setIdOS(-1);
            setDataObraSocial(null);
          }}
        >
          <CloseOutlined />
        </Button>
      </>
    );

  const onOSSelected = (id) => {
    //load details
    setIdOS(id);
    fetch(get.obtener_mutual + id)
      .then((response) => response.json())
      .then((response) => {
        setDataObraSocial({
          nombre: response.data[0].nombre,
        });
        if (typeof props.callback !== "undefined") {
          props.callback(id);
        }
      });
  };

  const onSearch = (value) => {
    setLoading(true);
    const url = get.buscar_mutual;
    const _value = encodeURIComponent(value);
    fetch(url + _value)
      .then((response) => response.json())
      .then((response) => {
        setObraSociales(
          response.data.map((r, index) => ({
            nombre: r.nombre,
            idmutual: r.idmutual,
            key: index,
          })),
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return idOS === -1 ? (
    <>
      <Button
        block
        size="large"
        style={{
          color: "#040430",
          fontWeight: "500",
          boxShadow: "0 4px 4px 0 rgba(0,0,0,0.2)",
          borderRadius: "16px",
          backgroundColor:"#f8f8f8"
        }}
        onClick={(_) => {
          onOpen();
          setModalSelectOpen(true);
        }}
      >
        Seleccionar Obra Social
      </Button>
      <Modal
        width={"100%"}
        footer={null}
        destroyOnClose
        title="Obra Social"
        onCancel={(_) => setModalSelectOpen(false)}
        open={modalSelectOpen}
      >
        <Input.Search onSearch={onSearch} size="large" />
        <CustomModal openButtonText="+ Agregar" title="Agregar">
          <ObraSocialForm callback={onOSSelected} />
        </CustomModal>
        <Table
          loading={loading}
          onRow={(record, index) => ({
            onClick: (e) => {
              onOSSelected(record.idmutual);
            },
          })}
          scroll={{ y: "500px" }}
          rowClassName={(record, index) =>
            index % 2 === 0 ? "table-row-light" : "table-row-dark"
          }
          columns={columns}
          dataSource={obrasociales}
        />
      </Modal>
    </>
  ) : (
    show_details()
  );
};

export default SelectObraSocialV2;
