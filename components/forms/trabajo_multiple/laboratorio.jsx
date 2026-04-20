import { Row, Col, Tabs } from "antd";
import { useEffect, useState } from "react";

import VentasTratamiento from "../ventas/Tratamiento";
import VMLabItem from "./laboratorio_item";
import SelectCodeButton from "../ventas/selectCodeButton";

const VMLaboratorioItems = (props) => {
  const [mlabitems, setItems] = useState({
    lejos_od: null,
    lejos_oi: null,
    lejos_armazon: null,
    lejos_tratamiento: null,

    cerca_od: null,
    cerca_oi: null,
    cerca_armazon: null,
    cerca_tratamiento: null,

    lejos_od_visible: null,
    lejos_oi_visible: null,
    lejos_armazon_visible: null,
    lejos_tratamiento_visible: null,

    cerca_od_visible: null,
    cerca_oi_visible: null,
    cerca_armazon_visible: null,
    cerca_tratamiento_visible: null,
  });

  const on_change = (field, value) => {
    setItems((_mlabitems) => {
      const _items = { ..._mlabitems, [field]: value };
      props?.callback(_items);
      return _items;
    });
  };

  const onVisibleChange = (field, value) => {
    //alert(`${field} : ${value}`)
    setItems((_mlabitems) => {
      const _values = { ..._mlabitems, [field]: value };
      props?.callback(_values);
      return _values;
    });
  };

  const row_style = {
    padding: ".7em",
  };
  const _style_label = {
    paddingTop: "1em",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: ".75em",
  };

  const tabs_items = [
    {
      key: "lejos",
      label: "Lejos",
      children: (
        <>
          <Row className="table-row-light" style={row_style}>
            <Col span={2} style={_style_label}>
              OD
            </Col>
            <Col span={22}>
              <VMLabItem
                onVisibleChange={(_value) =>
                  onVisibleChange("lejos_od_visible", _value)
                }
                tipo="LEJOS_OD"
                buttonText={<SelectCodeButton />}
                callback={(v) => {
                  on_change("lejos_od", v);
                }}
                data={mlabitems.lejos_od}
              />
            </Col>
          </Row>
          <Row className="table-row-dark" style={row_style}>
            <Col span={2} style={_style_label}>
              OI
            </Col>
            <Col span={22}>
              <VMLabItem
                onVisibleChange={(_value) =>
                  onVisibleChange("lejos_oi_visible", _value)
                }
                tipo="LEJOS_OI"
                buttonText={<SelectCodeButton />}
                callback={(v) => {
                  on_change("lejos_oi", v);
                }}
                data={mlabitems.lejos_oi}
              />
            </Col>
          </Row>
          <Row className="table-row-dark" style={row_style}>
            <Col span={2} style={_style_label}>
              TRATAMIENTO
            </Col>
            <Col span={22}>
              <VentasTratamiento
                onVisibleChange={(_value) =>
                  onVisibleChange("lejos_tratamiento_visible", _value)
                }
                tipo="LEJOS_TRATAMIENTO"
                buttonText={<SelectCodeButton />}
                callback={(v) => {
                  on_change("lejos_tratamiento", v);
                }}
                data={mlabitems.lejos_tratamiento}
              />
            </Col>
          </Row>
        </>
      ),
    },
    {
      key: "cerca",
      label: "Cerca",
      children: (
        <>
          <Row className="table-row-light" style={row_style}>
            <Col span={2} style={_style_label}>
              OD
            </Col>
            <Col span={22}>
              <VMLabItem
                onVisibleChange={(_value) =>
                  onVisibleChange("cerca_od_visible", _value)
                }
                tipo="CERCA_OD"
                buttonText={<SelectCodeButton />}
                callback={(v) => {
                  on_change("cerca_od", v);
                }}
                data={mlabitems.cerca_od}
              />
            </Col>
          </Row>
          <Row className="table-row-dark" style={row_style}>
            <Col span={2} style={_style_label}>
              OI
            </Col>
            <Col span={22}>
              <VMLabItem
                onVisibleChange={(_value) =>
                  onVisibleChange("cerca_oi_visible", _value)
                }
                tipo="CERCA_OI"
                buttonText={<SelectCodeButton />}
                callback={(v) => {
                  on_change("cerca_oi", v);
                }}
                data={mlabitems.cerca_oi}
              />
            </Col>
          </Row>
          <Row className="table-row-dark" style={row_style}>
            <Col span={2} style={_style_label}>
              TRATAMIENTO
            </Col>
            <Col span={22}>
              <VentasTratamiento
                onVisibleChange={(_value) =>
                  onVisibleChange("cerca_tratamiento_visible", _value)
                }
                tipo="CERCA_TRATAMIENTO"
                buttonText={<SelectCodeButton />}
                callback={(v) => {
                  on_change("cerca_tratamiento", v);
                }}
                data={mlabitems.cerca_tratamiento}
              />
            </Col>
          </Row>
        </>
      ),
    },
  ];

  return (
    <div style={{border:"1px solid #3A5C79", borderRadius:"16px", padding:"0px 16px 16px 16px"}}>
      <Row>
        <Col>
          <h3>Laboratorio</h3>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Tabs defaultActiveKey="lejos" items={tabs_items} size="large" />
        </Col>
      </Row>
    </div>
  );
};
export default VMLaboratorioItems;
