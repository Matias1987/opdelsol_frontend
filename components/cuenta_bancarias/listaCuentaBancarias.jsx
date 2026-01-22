import { Card, Col, Row, Table } from "antd";
import { useEffect, useState } from "react";

const ListaCuentaBancarias = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = [];

  const load = ()=>{}

  useEffect(()=>{load();},[])

  return (
    <>
      <Card title="Lista de Cuentas Bancarias">
        <Row>
          <Col span={24}>
            <Table
              dataSource={data}
              columns={columns}
              pagination={false}
              scroll={{ y: "600px" }}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ListaCuentaBancarias;
