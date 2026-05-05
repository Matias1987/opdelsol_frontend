import { get } from "@/src/urls";
import { InfoCircleFilled } from "@ant-design/icons";
import { Button, Card, Col, Row, Table } from "antd";
import { useEffect, useState } from "react";

const ListadoVentasTM = (_) => {
  const [data, setData] = useState([]);
  const columns = [
    { render: (_, record) => <><Button><InfoCircleFilled /></Button></>, width: "50px", title:"info"},
    { dataIndex: "idventa",  width: "80px", title:"idventa"},
    { dataIndex: "cliente",  width: "80px", title:"cliente"},
    { dataIndex: "fecha_f",  width: "80px", title:"fecha"},
    { dataIndex: "subtotal",  width: "80px", title:"subtotal"},
    { dataIndex: "descuento",  width: "80px", title:"descuento"},
    { dataIndex: "total",  width: "80px", title:"total"},

  ];
  const load = () => {
    fetch(get.obtener_ventas_tm)
      .then((response) => response.json())
      .then((response) => {
        setData(response.data);
    });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Card>
        <Row>
          <Col>
            <Table columns={columns} dataSource={data} scroll={{ y: "300" }} />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ListadoVentasTM;
