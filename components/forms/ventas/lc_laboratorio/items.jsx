import { Col, Form, Row } from "antd";
import { useState } from "react";
import VentasInsumo from "../Insumo";
import LCLabItem from "./lc_lab_item";
import SelectCodeButton from "../selectCodeButton";
import { EditFilled } from "@ant-design/icons";

const LCLabItems = (props) => {
  const [items, setItems] = useState({
    od: null,
    oi: null,
    insumo: null,

    od_visible: false,
    oi_visible: false,
    insumo_visible: false,
  });

  const onChange = (index, value) => {
    setItems((__items) => {
      const _items = { ...__items, [index]: value };
      props?.callback?.(_items);
      return _items;
    });
  };

  const onVisibleChange = (field, value) => {
    setItems((_items_) => {
      const _values = { ..._items_, [field]: value };
      props?.callback(_values);
      return _values;
    });
  };

  const _style_label = {
    paddingTop: "1em",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: ".75em",
  };

  return (
    <>
      <Row className="table-row-light" style={{ padding: ".7em" }} gutter={[16,16]}>
        <Col style={_style_label} >
          OD
        </Col>
        <Col  style={{ padding: ".5em" }}>
          <LCLabItem
            buttonText={<SelectCodeButton />}
            onVisibleChange={(_value) => onVisibleChange("od_visible", _value)}
            tipo="OD"
            callback={(v) => {
              onChange("od", v);
            }}
            data={items.od}
          />
        </Col>
      </Row>
      <Row className="table-row-dark" style={{ padding: ".7em" }} gutter={[16,16]}>
        <Col style={_style_label} >
          OI
        </Col>
        <Col style={{ padding: ".5em" }}>
          <LCLabItem
            buttonText={<SelectCodeButton />}
            onVisibleChange={(_value) => onVisibleChange("oi_visible", _value)}
            tipo="OI"
            callback={(v) => {
              onChange("oi", v);
            }}
            data={items.oi}
          />
        </Col>
      </Row>
      <Row className="table-row-light" style={{ padding: ".7em" }} gutter={[16,16]}>
        <Col style={_style_label} >
          Insumo
        </Col>
        <Col  style={{ padding: ".5em" }}>
          <VentasInsumo
            buttonText={<><EditFilled /></>}
            onVisibleChange={(_value) =>
              onVisibleChange("insumo_visible", _value)
            }
            tipo="INSUMO"
            callback={(v) => {
              onChange("insumo", v);
            }}
            data={items.insumo}
          />
        </Col>
      </Row>
    </>
  );
};

export default LCLabItems;
