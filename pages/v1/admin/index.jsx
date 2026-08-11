import LayoutAdmin from "@/components/layout/layout_admin";
import globals from "@/src/globals";
import { get } from "@/src/urls";
import { Col, Row } from "antd";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

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

  const styles = {
    darkRow: "#F0C2A5",
    lightRow: "#F4DD76",
  };
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
      <Row gutter={[16, 16]}>
        <Col>
          <TotalesCobros />
        </Col>

        <Col>
          <PieChartVentasGraph />
        </Col>
      </Row>
    </>
  );
}

dashboard_admin.PageLayout = LayoutAdmin;
