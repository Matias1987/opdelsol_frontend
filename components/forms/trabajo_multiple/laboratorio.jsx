import { Card, Col, Input, Row, Select } from "antd";

const LaboratorioForm = () => {
  const row_style = {
    padding:"4px"
  }
  return (
    <>
      <Card title="Laboratorio" size="small">
        <Row style={row_style}>
          <Col span={24}>
            <Select
              style={{width:"300px"}}
              prefix="Ojos: "
              options={[
                { label: "Ambos", value: "ambos" },
                { label: "Derecho", value: "od" },
                { label: "Izquierdo", value: "oi" },
              ]}
            />
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            style={{
              border: "1px solid #DFE9FF",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <Row style={row_style}>
              <Col span={2}>OD</Col>
              <Col span={6}>
                <Select prefix="Tipo" style={{ width: "100%" }} />
              </Col>
              <Col span={6}>
                <Select prefix="Diseño" style={{ width: "100%" }} />
              </Col>
              <Col span={6}>
                <Input prefix="Precio" style={{ width: "100%" }} />{" "}
              </Col>
            </Row>
            <Row style={row_style}>
              <Col span={2}>OI</Col>
              <Col span={6}>
                <Select prefix="Tipo" style={{ width: "100%" }} />
              </Col>
              <Col span={6}>
                <Select prefix="Diseño" style={{ width: "100%" }} />
              </Col>
              <Col span={6}>
                <Input prefix="Precio" style={{ width: "100%" }} />{" "}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card title="Prescripción" size="small">
              <Row>
                <Col
                  span={24}
                >
                  <Row style={row_style}>
                    <Col span={4}>OD</Col>
                    <Col span={4}>
                      <Select prefix="Base" style={{ width: "100%" }} />
                    </Col>
                    <Col span={4}>
                      <Input prefix="Esf" style={{ width: "100%" }} />
                    </Col>
                    <Col span={4}>
                      <Input prefix="Cil" style={{ width: "100%" }} />
                    </Col>
                    <Col span={4}>
                      <Input prefix="Eje" style={{ width: "100%" }} />
                    </Col>
                    <Col span={4}>
                      <Input prefix="Add" style={{ width: "100%" }} />
                    </Col>
                  </Row>
                  <Row style={row_style}>
                    <Col span={4}>OI</Col>
                    <Col span={4}>
                      <Select prefix="Base" style={{ width: "100%" }} />
                    </Col>
                    <Col span={4}>
                      <Input prefix="Esf" style={{ width: "100%" }} />
                    </Col>
                    <Col span={4}>
                      <Input prefix="Cil" style={{ width: "100%" }} />
                    </Col>
                    <Col span={4}>
                      <Input prefix="Eje" style={{ width: "100%" }} />
                    </Col>
                    <Col span={4}>
                      <Input prefix="Add" style={{ width: "100%" }} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
};


export default LaboratorioForm;