import LayoutAdmin from "@/components/layout/layout_admin";
import globals from "@/src/globals";
import { get } from "@/src/urls";
import { Card, Col, Row } from "antd";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const TotalesProveedores = dynamic(
  () => import("@/components/admin/dashboard_components/totales_proveedores"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>&#9203;</div>,
  },
);
const TotalesCobros = dynamic(
  () => import("@/components/admin/dashboard_components/totales_cobros"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>&#9203;</div>,
  },
);
const PieChartVentasGraph = dynamic(
  () => import("@/components/charts/pieChartVentasGraph"),
  {
    ssr: false,
    loading: () => <div style={{ height: "300px" }}>&#9203;</div>,
  },
);

export default function dashboard_admin() {
  const [sucursales, setSucursales] = useState([]);
  const [idcaja, setIdCaja] = useState(-1);
  const [open, setOpen] = useState(false);
  const [esUsuarioAdminMin, setEsUsuarioAdminMin] = useState(true);


  const row_style = {
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    margin: "8px",
    padding: "8px",
  }
  var col = 0;
  useEffect(() => {
    setEsUsuarioAdminMin(globals.esUsuarioAdminMin());
    fetch(get.sucursales)
      .then((response) => response.json())
      .then((response) => {
        setSucursales(
          response.data.map((r) => ({
            nombre: r.nombre,
            idsucursal: r.idsucursal,
          })),
        );
      });
  }, []);
  return esUsuarioAdminMin ? (
    <>
      <span style={{ fontStyle: "italic" }}>Bienvenido</span>{" "}
    </>
  ) : (
    <>
    <Card size="small" title="Dashboard" style={{ borderRadius: "8px", boxShadow: "2px 2px 3px 0px rgba(0, 0, 0, 0.5)" }}>
      <Row style={row_style} gutter={[16, 16]}>
        <Col>
          <TotalesCobros />
        </Col>
        <Col>
          <TotalesProveedores />
        </Col>
      </Row>
      <Row style={row_style} gutter={[16, 16]}>
        <Col>
          <PieChartVentasGraph />
        </Col>
      </Row>
      </Card>
    </>
  );
}

dashboard_admin.PageLayout = LayoutAdmin;
