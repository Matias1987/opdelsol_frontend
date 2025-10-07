import { get } from "@/src/urls";
import {
  Calendar,
  Card,
  Col,
  Flex,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import esES from "antd/locale/es_ES";
import ExportToExcel from "@/components/etc/ExportToExcel";
const CobrosTarjetaDia = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const columns = [
    { title: "Nro Venta", dataIndex: "idventa", key: "idventa", width: "20%" },
    { title: "Importe", dataIndex: "importe", key: "importe", width: "30%" },
    { title: "Tarjeta", dataIndex: "tarjeta", key: "tarjeta", width: "30%" },
    { title: "Cuotas", dataIndex: "cuotas", key: "cuotas", width: "20%" },
  ];
  const load = () => {
    setLoading(true);
    fetch(get.cobros_tarjeta_dia)
      .then((response) => response.json())
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  };

  const header = (_) => {
    return (
      <div style={{ textAlign: "right" }}>
        <ExportToExcel />
      </div>
    );
  };

  useEffect(() => {
    //load()
  }, []);
  if (loading) return <></>;
  if (error) return <></>;
  return (
    <>
      <Card
        size="small"
        title={"Cobros con Tarjeta del Día"}
        style={{ marginBottom: "20px" }}
      >
        <Row gutter={16}>
          <Col style={{ width: "30%" }}>
            <Calendar
              style={{ backgroundColor:"#f3f2f2ff" , padding:"10px", borderRadius:"8px" }}
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
              title={header}
              size="small"
              columns={columns}
              data={data}
              scroll={{ y: "600px" }}
              pagination={false}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default CobrosTarjetaDia;
