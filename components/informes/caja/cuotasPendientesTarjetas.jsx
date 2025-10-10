import { get, post } from "@/src/urls";
import {
  Button,
  Calendar,
  Card,
  Col,
  Flex,
  Modal,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import esES from "antd/locale/es_ES";
import ExportToExcel from "@/components/etc/ExportToExcel";
import { post_method } from "@/src/helpers/post_helper";
import PrinterWrapper from "@/components/PrinterWrapper";
import InformeX from "./InformeX";

const CuotasPendientesTarjetas = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filtros, setFiltros] = useState({ fecha: "" });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCobro, setSelectedCobro] = useState(null);
  const columns = [
    {
      title: "Operación",
      width: "20%",
      render: (_, record) => (
        <Button
          type="link"
          size="small"
          onClick={() => {
            setModalVisible(true);
            setSelectedCobro(record.idcobro);
          }}
        >
          {record.idcobro}
        </Button>
      ),
    },
    { title: "Fecha", dataIndex: "fecha_f", key: "fecha_f", width: "20%" },
    {
      title: "Cliente",
      dataIndex: "cliente",
      key: "cliente",
      width: "20%",
      hidden: true,
    },
    { title: "Tarjeta", dataIndex: "tarjeta", key: "tarjeta", width: "30%" },
    {
      title: "Cuotas",
      width: "20%",
      render: (_, record) => (
        <>
          <div style={{ textAlign: "left" }}>
            {record.diff2}/{record.cant_cuotas}
          </div>
        </>
      ),
    },
  ];
  const load = () => {
    setLoading(true);
    post_method(post.cuotas_pendientes_tarjetas, filtros, (response) => {
      //alert(JSON.stringify(response))
      setData(response.data);
      setLoading(false);
    });
  };

  const header = (_) => {
    return (
      <div style={{ textAlign: "right" }}>
        {/*<ExportToExcel />*/}
      </div>
    );
  };

  useEffect(() => {
    load();
  }, [filtros]);
  return (
    <>
      <Card
        size="small"
        title={"Cuotas de Tarjeta por Día"}
        style={{ marginBottom: "20px", borderRadius: "16px 16px 0 0" }}
        styles={{
          header: {
            backgroundColor: "#ffffed",
            background:
              "linear-gradient(281deg,rgba(255, 255, 255, 1) 62%, rgba(233, 233, 233, 1) 95%)",

            borderRadius: "16px 16px 0 0",
          },
        }}
      >
        <Row gutter={16}>
          <Col style={{ width: "25%", minWidth: "300px" }}>
            <Calendar
              onSelect={(value) => {
                //alert(value.format("YYYY-MM-DD"));
                setFiltros((f) => ({
                  ...f,
                  fecha: value.format("YYYY-MM-DD"),
                }));
              }}
              style={{
                backgroundColor: "#f3f2f2ff",
                padding: "10px",
                borderRadius: "8px",
              }}
              fullscreen={false}
              headerRender={({ value, type, onChange, onTypeChange }) => {
                const year = value.year();
                const month = value.month();
                const yearOptions = Array.from({ length: 20 }, (_, i) => {
                  const label = year - 10 + i;
                  return { label, value: label };
                });
                const monthOptions = value
                  .localeData()
                  .monthsShort()
                  .map((label, index) => ({
                    label,
                    value: index,
                  }));
                return (
                  <div style={{ paddingLeft: "8px" }}>
                    <Typography.Title level={5}>
                      Seleccionar Fecha
                    </Typography.Title>
                    <Flex gap={8}>
                      <Select
                        size="small"
                        popupMatchSelectWidth={false}
                        value={year}
                        options={yearOptions}
                        onChange={(newYear) => {
                          const now = value.clone().year(newYear);
                          onChange(now);
                        }}
                      />
                      <Select
                        size="small"
                        popupMatchSelectWidth={false}
                        value={month}
                        options={monthOptions}
                        onChange={(newMonth) => {
                          const now = value.clone().month(newMonth);
                          onChange(now);
                        }}
                      />
                    </Flex>
                  </div>
                );
              }}
              locale={esES}
            />
          </Col>
          <Col style={{ width: "70%", minWidth: "600px" }}>
            <Table
              rowClassName={(record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
              loading={loading}
             
              size="small"
              columns={columns}
              dataSource={data}
              scroll={{ y: "600px" }}
              pagination={false}
            />
          </Col>
        </Row>
      </Card>
      <Modal
        title="Detalle Cobro"
        open={modalVisible}
        onCancel={(_) => setModalVisible(false)}
        footer={false}
        width={"1000px"}
        destroyOnClose
      >
        <PrinterWrapper>
          <InformeX idcobro={selectedCobro} />
        </PrinterWrapper>
      </Modal>
    </>
  );
};

export default CuotasPendientesTarjetas;
