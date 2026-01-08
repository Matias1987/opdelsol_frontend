import { decimal_separator } from "@/src/config";
import { formatFloat } from "@/src/helpers/formatters";
import { Col, Input, InputNumber, Row } from "antd";
import { useEffect, useState } from "react";

const TotalesVenta = (props) => {
  const [descuento, setDescuento] = useState(0);
  const [total, setTotal] = useState(0);

  const onDescuentoChange = (v) => {
    setDescuento((descuento) => {
      const _n = (v??"").length < 1 ? 0 : v;
      props?.callback?.(_n);
      setTotal(_n);
      return _n;
    });
  };

  useEffect(() => {
    setTotal((props?.subtotal || 0) - descuento);
  });

  return (
    <>
      <Row>
        <Col span={6}>
          <Input prefix={"SubTotal: $"} readOnly value={ formatFloat( props.subtotal || 0)} />
        </Col>
      </Row>
      <Row>
        {/*<Col span={6}><Input style={{fontWeight:"600", fontSize:"1.2em", color:"darkblue"}} type="number" onClick={(e)=>{e.target.select()}}  prefix={"Descuento: $"} onChange={(e)=>{onDescuentoChange(e.target.value)}} value={descuento} /></Col>*/}
        <InputNumber
          decimalSeparator={decimal_separator}
          style={{ fontWeight: "600", fontSize: "1.2em", color: "darkblue", width:"300px" }}
          onClick={(e) => {
            e.target.select();
          }}
          prefix={"Descuento: $"}
          onChange={(v) => {
            onDescuentoChange(v);
          }}
          value={descuento}
        />
      </Row>
      <Row>
        {/*<Col span={14}><Input prefix={"Concepto Descuento: "} style={{backgroundColor:"rgba(49,140,231, 0.1)"}} ></Input></Col>*/}

        <Col span={6}>
          <Input
            prefix={"Total: $"}
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
