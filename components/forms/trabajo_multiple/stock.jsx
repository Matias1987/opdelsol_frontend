import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Modal, Row, Table } from "antd";
import { useState } from "react";
import StockItem from "./stock_item";

const VMCristalesStock = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const columns = [];

  const header = (_) => (
    <>
      <span style={{ fontWeight: "bold" }}>Productos</span>&nbsp;&nbsp;
      <Button size="small" type="link" onClick={(_) => setModalOpen(true)}>
        <PlusOutlined /> Agregar
      </Button>
    </>
  );

  return (
    <div style={{border:"1px solid #3A5C79", borderRadius:"16px", padding:"0px 16px 16px 16px"}}>
      <Row>
        <Col>
          <h3>Stock</h3>
        </Col>
      </Row>
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
      <Modal
        width={"400px"}
        footer={null}
        title="Agregar Elemento"
        onCancel={(_) => setModalOpen(false)}
        open={modalOpen}
        onClose={(_) => {
          setModalOpen(false);
        }}
      >
        <Row>
          <Col>
            <StockItem />
          </Col>
        </Row>
        
      </Modal>
    </div>
  );
};

export default VMCristalesStock;
