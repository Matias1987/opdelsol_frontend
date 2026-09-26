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
const CobrosTarjetaDia = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filtros, setFiltros] = useState({ fecha: "" });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCobro, setSelectedCobro] = useState(null);
  const columns = [
    {
      title: "Cobro",
      width: "20%",
      render: (_, record) => (
        <Button
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
    { title: "Cliente", dataIndex: "cliente", key: "cliente", width: "20%" },
    { title: "Monto", dataIndex: "monto", key: "monto", width: "30%" },
    { title: "Tarjeta", dataIndex: "tarjeta", key: "tarjeta", width: "30%" },
    {
      title: "Cuotas",
      dataIndex: "cant_cuotas",
      key: "cant_cuotas",
      width: "20%",
    },
  ];
  const load = () => {
    setLoading(true);
    post_method(post.cobros_tarjeta_dia, filtros, (response) => {
      setData(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    load();
  }, [filtros]);
  return (
    <>
      <Card
        size="small"
        title={"Cobros con Tarjeta del Día"}
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
          <Col style={{ width: "30%" }}>
            <Calendar
              onSelect={(value) => {
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
          <Col style={{ width: "70%" }}>
            <Table
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

export default CobrosTarjetaDia;
