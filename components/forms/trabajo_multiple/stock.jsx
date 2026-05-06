import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Input, Modal, Row, Select, Table } from "antd";
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
    <Card size="small" title="Stock" style={{ boxShadow: "-1px 1px 1px 1px #9e9c9c" }}>
 
      <Row>
        <Col span={24}>
          <Row>
            <Col span={3}></Col>
            <Col span={8}>Cristal</Col>
            <Col span={6}>Eje</Col>
            <Col span={6}>Precio</Col>
          </Row>
          <Row>
            <Col span={3}>OD</Col>
            <Col span={8}><Select style={{width:"100%"}}/></Col>
            <Col span={6}><Input /></Col>
            <Col span={6}><Input /></Col>
          </Row>
          <Row>
            <Col span={3}>OI</Col>
            <Col span={8}><Select style={{width:"100%"}}/></Col>
            <Col span={6}><Input /></Col>
            <Col span={6}><Input /></Col>
          </Row>
          <Row>
            <Col span={3}>Tratamiento</Col>
            
            <Col span={8}><Select style={{width:"100%"}}/></Col>
            <Col span={6}></Col>
            <Col span={6}><Input /></Col>
          </Row>
   
        </Col>
      </Row>
      
    </Card>
  );
};

export default VMCristalesStock;
