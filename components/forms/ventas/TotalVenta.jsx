import { decimal_separator } from "@/src/config";
import { formatFloat } from "@/src/helpers/formatters";
import { Col, Input, InputNumber, Row } from "antd";
import { useEffect, useState } from "react";

const TotalesVenta = ({ callbackDescuento, callbackDescuentoMutual, subtotal }) => {
  const [descuento, setDescuento] = useState(0);
  const [descuentoMutual, setDescuentoMutual] = useState(0);
  const [total, setTotal] = useState(0);

  const onDescuentoChange = (v) => {
    const _n = (v ?? "").length < 1 ? 0 : v;

    setDescuento((_) => {
      return _n;
    });

    callbackDescuento?.(_n);
  };
  const onDescuentoMutualChange = (v) => {
    const _n = (v ?? "").length < 1 ? 0 : v;

    setDescuentoMutual((_) => {
      return _n;
    });

    callbackDescuentoMutual?.(_n);
  };

  useEffect(() => {
    setTotal(
      parseFloat(subtotal ?? 0) -
        parseFloat(descuento ?? 0) -
        parseFloat(descuentoMutual ?? 0),
    );
  }, [subtotal, descuento, descuentoMutual]);

  return (
    <>
      <Row gutter={[16, 16]} style={{ paddingTop: "4px" }}>
        <Col>
          <Input
            addonBefore={"SubTotal: $"}
            readOnly
            value={formatFloat(subtotal || 0)}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ paddingTop: "4px" }}>
        <Col>
          <InputNumber
            decimalSeparator={decimal_separator}
            style={{
              fontWeight: "600",
              fontSize: "1.2em",
              color: "darkblue",
              width: "300px",
            }}
            onClick={(e) => {
              e.target.select();
            }}
            addonBefore={"Descuento: $"}
            onChange={(v) => {
              onDescuentoChange(v);
            }}
            value={descuento}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ paddingTop: "4px" }}>
        <Col>
          <InputNumber
            decimalSeparator={decimal_separator}
            style={{
              fontWeight: "600",
              fontSize: "1.2em",
              color: "darkblue",
              width: "300px",
            }}
            onClick={(e) => {
              e.target.select();
            }}
            addonBefore={"Descuento Mutual: $"}
            onChange={(v) => {
              onDescuentoMutualChange(v);
            }}
            value={descuentoMutual}
          />
        </Col>
      </Row>
      <Row
        gutter={[16, 16]}
        style={{ paddingTop: "4px", paddingBottom: "4px" }}
      >
        {/*<Col span={14}><Input prefix={"Concepto Descuento: "} style={{backgroundColor:"rgba(49,140,231, 0.1)"}} ></Input></Col>*/}

        <Col>
          <Input
            addonBefore={"Total: $"}
            style={{ fontWeight: "bold" }}
            readOnly
            value={formatFloat(total)}
          />
        </Col>
      </Row>
    </>
  );
};

export default TotalesVenta;
