import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table } from "antd";
import { useState } from "react";

const VMLC = (props) => {
  const [dataSource, setDataSource] = useState([]);

  const columns = [];

  const header = (_) => (
    <>
      <span style={{ fontWeight: "bold" }}>Productos</span>&nbsp;&nbsp;
      <Button size="small" type="link">
        <PlusOutlined /> Agregar
      </Button>
    </>
  );

  return (
    <>
      <Row>
        <Col>
          <Table
            size="small"
            title={header}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            scroll={{ y: 400 }}
          />
        </Col>
      </Row>
    </>
  );
};

export default VMLC;
