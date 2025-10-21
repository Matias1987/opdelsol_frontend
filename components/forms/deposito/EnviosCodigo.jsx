import CustomModal from "@/components/CustomModal";
import PrinterWrapper from "@/components/PrinterWrapper";
import InformeEnvio from "@/components/informes/InformeEnvio";
import { get } from "@/src/urls";
import { InfoOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Spin, Table } from "antd";
import { useEffect, useState } from "react";

const EnviosCodigos = (props) => {
  const [dataEnvios, setDataEnvios] = useState(null);
  const [loadingEnvios, setLoadingEnvios] = useState(true);
  const url_envios = get.obtener_envios_codigo; //idcodigo
  const [selectedCodigo, setSelectedCodigo] = useState(null);
  const [modalDetalleOpen, setModalDetalleOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    //get envios
    //alert(url_envios + props.idcodigo)
    fetch(url_envios + props.idcodigo)
      .then((response) => response.json())
      .then((response) => {
        setDataEnvios(
          response.data.map((r) => ({
            nro_envio: r.nroenvio,
            cantidad: r.cantidad,
            sucursal: r.sucursal,
          }))
        );
        setLoadingEnvios(false);
      });
  }, []);
  return loadingEnvios ? (
    <Spin />
  ) : (
    <>
      <div style={{ padding: ".1em", margin: "1em" }}>
        <Table
          rowClassName={(record, index) =>
            index % 2 === 0 ? "table-row-light" : "table-row-dark"
          }
          size="small"
          title={(_) => (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>Env&iacute;os</div>
              <div>
                <Input
                  allowClear
                  style={{ width: "200px" }}
                  size="small"
                  value={searchValue}
                  prefix={<>Nro.</>}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                />
              </div>
            </div>
          )}
          scroll={{ y: "300px" }}
          dataSource={
            (searchValue || "").length > 0 && !isNaN(searchValue || "")
              ? (dataEnvios || []).filter((_r) =>
                  _r.nro_envio.toString().includes(searchValue || "")
                )
              : dataEnvios
          }
          columns={[
            { title: "Nro.", dataIndex: "nro_envio", width: "50px" },
            { title: "Sucursal", dataIndex: "sucursal", width: "150px" },
            { title: "Cantidad", dataIndex: "cantidad", width: "50px" },
            {
              title: "",
              width: "50px",
              render: (_, record) => (
                <>
                  <Button
                    type="primary"
                    size="small"
                    onClick={(_) => {
                      setSelectedCodigo(record);
                      setModalDetalleOpen(true);
                    }}
                  >
                    <InfoOutlined /> Info
                  </Button>
                </>
              ),
            },
          ]}
        />
      </div>
      {selectedCodigo ? (
        <Modal
          destroyOnClose
          open={modalDetalleOpen}
          title="Detalle"
          footer={null}
          onCancel={(_) => {
            setModalDetalleOpen(false);
          }}
          width={"100%"}
        >
          <PrinterWrapper>
            <InformeEnvio idenvio={selectedCodigo.nro_envio} />
          </PrinterWrapper>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

export default EnviosCodigos;
