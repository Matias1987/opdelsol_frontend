import { get } from "@/src/urls";

import { Select, Row, Col } from "antd";
import { useState, useEffect } from "react";
/**
 *
 * @param idsucursal
 * @param callback
 * @param addNullOption
 * @returns
 */
const SucursalSelect = (props) => {
  const { idsucursal, callback, addNullOption } = props;
  const [sucursalData, setSucursalData] = useState([]);
  const sucursalUrl = get.sucursales;
  const [selectedSucursal, setSelectedSucursal] = useState("-1");
  const loadSucursales = () => {
    fetch(sucursalUrl)
      .then((response) => response.json())
      .then((response) => {
        if (addNullOption) {
          setSucursalData([
            ...[{ label: "-", value: "-1" }],
            ...response.data.map((r) => ({
              label: r.nombre,
              value: +r.idsucursal,
            })),
          ]);
        } else {
          setSucursalData(
            response.data.map((r) => ({
              label: r.nombre,
              value: +r.idsucursal,
            }))
          );
        }

        if (idsucursal) {
          setSelectedSucursal(idsucursal);
          callback?.(
            idsucursal,
            response.data.find((s) => +s.idsucursal == +idsucursal)?.nombre ||
              "-"
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    loadSucursales();
  }, []);

  const onSucursalChange = (value) => {
    setSelectedSucursal(value);
    callback?.(value, sucursalData.find((s) => s.value == value)?.label || "-");
  };
  return (
    <Row>
      <Col span={21}>
        <Select
          size={props.size || "middle"}
          prefix={
            <span style={{ color: "#0C5AA9" }}>
              <i>Sucursal: </i>
            </span>
          }
          options={sucursalData}
          style={{
            width: "320px",
            minWidth: "80px",
            maxWidth: "320px",
            overflow: "hidden",
          }}
          value={+selectedSucursal}
          onChange={(value) => {
            onSucursalChange(value);
          }}
        />
      </Col>
    </Row>
  );
};

export default SucursalSelect;
