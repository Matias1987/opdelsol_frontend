import { Button, Col, Input, Modal, Row, Space, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import CloseOutlined from "@ant-design/icons/CloseOutlined";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import ReloadOutlined from "@ant-design/icons/ReloadOutlined";

import { get } from "@/src/urls";
import QrcodeOutlined from "@ant-design/icons/QrcodeOutlined";
import DniScanner from "@/components/etc/DNIScanner";
import { useDniLookup } from "@/src/hooks/useDniLookup";
import ClienteFormV3 from "@/components/cliente/ClienteFormV3";

const SelectClienteV3 = ({
  minVersion,
  pIdcliente,
  icon,
  destinatario,
  callback,
}) => {
  const [idCliente, setIdCliente] = useState(-1);
  const [loadingDetalles, setLoadingDetalles] = useState(false);
  const [clientes, setClientes] = useState(null);
  const [clienteData, setClienteData] = useState(null);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popupAddOpen, setPopupAddOpen] = useState(false);
  const [popupSeleccionarOpen, setPopupSeleccionarOpen] = useState(false);
  const [popupQROpen, setPopupQROpen] = useState(false);
  const [newClientDniData, setNewClientDniData] = useState(null);

  const { processScannedDni, isSearching } = useDniLookup({
    onClientFound: (client) => {
      download_cliente_details(client.idcliente);
      setClienteData(client);
      //setIsScannerOpen(false);
    },
    onClientNotFound: (scannedData) => {
      //alert("Cliente no encontrado. Por favor, agregue el cliente.");
      //alert(JSON.stringify(scannedData));
      setNewClientDniData(scannedData);
      setPopupAddOpen(true);
    },
  });

  const onSearch = (value) => {
    if ((value || "").trim().length < 3) return;

    const params = encodeURIComponent(value);
    setLoading(true);
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
          })),
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const download_cliente_details = (id) => {
    setLoadingDetalles(true);

    setIdCliente((_id) => {
      callback?.(id);
      return id;
    });

    fetch(get.cliente_por_id + id)
      .then((response) => response.json())
      .then((response) => {
        setClienteData({
          nombre: response.data[0].nombre_completo,

          dni: response.data[0].dni,

          telefono1: response.data[0].telefono1,

          direccion: response.data[0].direccion,
        });

        setLoadingDetalles(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (
      typeof pIdcliente !== "undefined" &&
      pIdcliente != null &&
      pIdcliente != -1
    ) {
      download_cliente_details(pIdcliente);
    }
  }, [reload]);

  const columns = [
    {
      width: "100px",
      dataIndex: "apellido",
      title: "Apellido",
      key: "apellido",
    },
    { width: "100px", dataIndex: "nombre", title: "Nombre", key: "nombre" },
    { width: "100px", dataIndex: "dni", title: "DNI", key: "dni" },
    /*{ width:"100px", dataIndex: "direccion", title: "Direccion", key: "direccion" },*/
  ];
  const show_details = (_) =>
    loadingDetalles ? (
      <Spin />
    ) : (
      <>
        {typeof destinatario === "undefined" ? (
          <span style={{ fontWeight: "bolder", color: "#001646" }}>
            Cliente{" "}
          </span>
        ) : (
          <span style={{ fontWeight: "400", color: "#000000" }}>
            Destinatario{" "}
          </span>
        )}
        :{" "}
        <>
          <b>{clienteData.nombre} </b>
          {typeof destinatario === "undefined" ? (
            <>
              &nbsp;&nbsp; DNI: <b>{clienteData.dni}</b>&nbsp;
              {typeof minVersion === "undefined" ? (
                <>
                  Tel&eacute;fono: {clienteData.telefono1}&nbsp;
                  Direcci&oacute;n: {clienteData.direccion}&nbsp;
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </>
        <Button
          type="ghost"
          style={{ color: "red" }}
          onClick={() => {
            callback?.(null);
            setIdCliente(-1);
          }}
        >
          <CloseOutlined />
        </Button>
      </>
    );

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

  return idCliente == -1 ? (
    <>
      <Space.Compact block>
        <Button
          size="large"
          style={{
            width: "60%",
            color: "#040430",
            fontWeight: "500",
            boxShadow: "0 4px 4px 0 rgba(0,0,0,0.2)",
            borderRadius: "16px 0 0 16px",
            backgroundColor: "#f8f8f8",
          }}
          onClick={(_) => {
            load();
            setPopupSeleccionarOpen(true);
          }}
          icon={icon ?? null}
        >
          {destinatario ? <>Elegir Destinatario</> : <>Elegir Cliente</>}
        </Button>

        <Button
          size="large"
          style={{
            width: "40%",
            color: "#da4035",
            fontWeight: "500",
            boxShadow: "0 4px 4px 0 rgba(0,0,0,0.2)",
            borderRadius: "0 16px 16px 0",
            backgroundColor: "#f8f8f8",
          }}
          icon={<QrcodeOutlined />}
          onClick={(_) => setPopupQROpen(true)}
        ></Button>
      </Space.Compact>
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
        <ClienteFormV3
          callback={(id) => {
            setReload(!reload);
            download_cliente_details(id);
          }}
          data={newClientDniData}
        />
      </Modal>
      <Modal
        open={popupSeleccionarOpen}
        onCancel={(_) => setPopupSeleccionarOpen(false)}
        destroyOnClose={true}
        width={"100%"}
        title="Seleccione Cliente"
        footer={null}
      >
        <Table
          onRow={(record, index) => ({
            onClick: (e) => {
              if (+record.bloqueado == 1) {
                alert("Cliente bloqueado");
                return;
              }

              download_cliente_details(record.idcliente);
              setClienteData(record);
            },
          })}
          title={(_) => (
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Input.Search
                  size="small"
                  addonBefore="Buscar: "
                  style={{ width: "100%" }}
                  onSearch={onSearch}
                />
              </Col>

              <Col span={24}>
                <Space.Compact block>
                  <Button
                    style={{ width: "60%" }}
                    type="default"
                    size="middle"
                    danger
                    onClick={(_) => {
                      setPopupAddOpen(true);
                    }}
                  >
                    <PlusOutlined /> Agregar Cliente
                  </Button>
                  &nbsp;
                  <Button
                    size="middle"
                    style={{ width: "40%" }}
                    onClick={() => {
                      setReload(!reload);
                    }}
                    type="default"
                  >
                    <ReloadOutlined />
                  </Button>
                </Space.Compact>
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
      </Modal>
      <Modal
        open={popupQROpen}
        onCancel={(_) => setPopupQROpen(false)}
        destroyOnClose={true}
        width={"100%"}
        title="Escanear QR..."
        footer={null}
      >
        <DniScanner
          onDniScanned={(dni) => {
            setPopupQROpen(false);
            processScannedDni(dni);
          }}
        />
      </Modal>
    </>
  ) : (
    show_details()
  );
};

export default SelectClienteV3;
