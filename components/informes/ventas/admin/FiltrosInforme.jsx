import { parse_int_string } from "@/src/helpers/string_helper";
import { get } from "@/src/urls";
import { Button, Col, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";

const FiltrosInforme = (props) => {
  const { callback } = props;
  const [sucursales, setSucursales] = useState([]);
  const [filtros, setFiltros] = useState({
    mes: 1,
    anio: 2023,
    fkcliente: "-1",
    fksucursal: "-1",
  });

  useEffect(() => {
    const d = new Date();

    setFiltros({
      mes: d.getMonth() + 1,
      anio: d.getFullYear(),
      fkcliente: "-1",
      fksucursal: "-1",
    });

    fetch(get.sucursales)
      .then((r) => r.json())
      .then((r) => {
        if (((r || null)?.data || null) != null) {
          setSucursales([
            ...[{ label: "Todas las Sucursales", value: -1 }],
            ...r.data.map((s) => ({ label: s.nombre, value: s.idsucursal })),
          ]);
          setFiltros((f) => ({ ...f, fksucursal: -1 }));
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, []);

  return (
    <>
      <Row gutter={16} style={{ marginBottom: "10px" }}>
        <Col>
          <Input
            type="number"
            prefix="Año"
            min={2023}
            onChange={(e) => {
              setFiltros((f) => ({
                ...f,
                anio: parse_int_string(e.target.value),
              }));
            }}
            value={filtros.anio}
          />
        </Col>
        <Col>
          <Input
            type="number"
            prefix="Mes"
            min={1}
            max={12}
            onChange={(e) => {
              setFiltros((f) => ({
                ...f,
                mes: parse_int_string(e.target.value),
              }));
            }}
            value={filtros.mes}
          />
        </Col>
        <Col>
          <div style={{ overflow: "hidden" }}>
            <Select
              prefix={
                <span style={{ fontWeight: "bold", overflow: "hidden" }}>
                  Sucursal:&nbsp;
                </span>
              }
              value={filtros.fksucursal}
              style={{ width: "300px" }}
              options={sucursales}
              onChange={(v) => {
                setFiltros((f) => ({ ...f, fksucursal: v }));
              }}
            />
          </div>
        </Col>
        <Col>
        <Button onClick={() => callback?.(filtros)}>
          Aplicar
        </Button>
        </Col>
      </Row>
    </>
  );
};
export default FiltrosInforme;
