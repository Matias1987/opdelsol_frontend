import { parse_int_string } from "@/src/helpers/string_helper";
import { get, post } from "@/src/urls";

import { Row, Col, Input, Button, Divider, Select } from "antd";
import { useEffect, useState } from "react";
import VentasSucursales from "./ventas_sucursales";
import VentasVendedor from "./ventas_vendedor";

const InformeVentasTotales = () => {
  const [sucursales, setSucursales] = useState([]);
  const [actualizar, setActualizar] = useState(false);
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

  const aplicar_filtros = () => {setActualizar(!actualizar)};

  return (
    <>
      <Row>
        <Col span={24}>
          <h3>Totales de Ventas Mes</h3>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
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
        <Col span={8}>
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
        <Col span={8}>
          <div style={{ overflow: "hidden" }}>
            <Select
              prefix={
                <span style={{ fontWeight: "bold", overflow: "hidden" }}>
                  Sucursal:&nbsp;
                </span>
              }
              value={filtros.fksucursal}
              style={{ width: "200px" }}
              options={sucursales}
              onChange={(v) => {
                setFiltros((f) => ({ ...f, fksucursal: v }));
              }}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button type="primary" size="small" onClick={aplicar_filtros}>
            Aplicar Filtros
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ marginTop: "10px" }}>
          <VentasSucursales filtros={filtros} actualizar={actualizar} />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <VentasVendedor filtros={filtros} actualizar={actualizar} />
        </Col>
      </Row>
    </>
  );
};

export default InformeVentasTotales;
