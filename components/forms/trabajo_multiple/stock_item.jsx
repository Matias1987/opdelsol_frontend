import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Input, Row, Select } from "antd";
import { useState } from "react";

const StockItem = (data) => {
  const [item, setItem] = useState({
    esf: "",
    cil: "",
    eje: "",
    block: "",
    trabajo: "",
    precio: "",
  });

  const cst_validator = value => /[\+\-][0-9]{1,2}\.[0-9]{1,2}/.test(value)

  const onChange = (index, value, validator) => {
    if (validator && !validator?.(index, value)) return false;
    setItem((i) => ({ ...i, [index]: value }));
  };

  const row_style = { padding: "8px" };

  return (
    <>
      <Row style={row_style} gutter={[8, 8]}>
        <Col>Esf: </Col>
        <Col>
          <Input
            value={item.esf}
            onChange={(e) => {
              onChange("esf",e.target.value);
            }}
            style={{ minWidth: "200px" }}
          />
        </Col>
      </Row>
      <Row style={row_style} gutter={[8, 8]}>
        <Col>Cil: </Col>
        <Col>
          <Input
            value={item.cil}
            onChange={(e) => {
              onChange("cil",e.target.value);
            }}
            style={{ minWidth: "200px" }}
          />{" "}
        </Col>
      </Row>
      <Row style={row_style} gutter={[8, 8]}>
        <Col>Eje: </Col>
        <Col>
          <Input
            value={item.eje}
            onChange={(e) => {
              onChange("eje",e.target.value);
            }}
            style={{ minWidth: "200px" }}
          />{" "}
        </Col>
      </Row>
      <Row style={row_style} gutter={[8, 8]}>
        <Col>Block: </Col>
        <Col>
          <Input
            onChange={(e) => {
              onChange("block",e.target.value);
            }}
            style={{ minWidth: "300px" }}
          />{" "}
        </Col>
      </Row>
      <Row style={row_style} gutter={[8, 8]}>
        <Col>Trabajo: </Col>
        <Col>
          <Select
            onChange={(v) => {
              onChange("trabajo",v);
            }}
            style={{ minWidth: "300px" }}
          />{" "}
        </Col>
      </Row>
      <Row style={row_style} gutter={[8, 8]}>
        <Col>Precio: </Col>
        <Col>
          <Input
            onChange={(e) => {
              onChange("precio",e.target.value);
            }}
            style={{ minWidth: "300px" }}
          />{" "}
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col style={{ minWidth: "200px" }}>
          <Button
            block
            type="primary"
            onClick={(_) => {
                if(item.esf.length<1)
                {
                    alert("campo esf no valido")
                    return
                }
                if(item.cil.length<1)
                {
                    alert("campo cil no valido")
                    return
                }
                if(item.eje.length<1)
                {
                    alert("campo eje no valido")
                    return
                }
              callback?.(item);
            }}
          >
            <PlusOutlined /> Agregar
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default StockItem;
