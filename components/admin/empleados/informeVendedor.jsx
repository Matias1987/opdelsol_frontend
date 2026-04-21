import { Col, Rate, Row, Table } from "antd";
import { useState } from "react";

const InformeVendedor = (props) => {
  const row_style = { padding: "16px" };
  const [ventasDia, setVentasDia] = useState([]);
  const columns = [{ title: "Nro." }, { title: "Monto" }];
  return (
    <>
      <Row style={row_style} gutter={[16, 16]}>
        <Col>Nombre: </Col>

        <Col>Usuario </Col>
      </Row>
      <Row style={row_style} gutter={[16, 16]}>
        <Col>Calificación: </Col>

        <Rate allowHalf defaultValue={3.5} />
      </Row>
      <Row>
        <Col span={24}>
          <Table
            size="small"
            dataSource={ventasDia}
            columns={columns}
            title={(_) => <>Ventas hoy: (total {0}) </>}
            summary={(data) => {
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell>Total</Table.Summary.Cell>
              <Table.Summary.Cell>0</Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
          />
        </Col>
      </Row>
    </>
  );
};

export default InformeVendedor;
