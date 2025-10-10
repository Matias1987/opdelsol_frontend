import CajaMaster from "@/components/caja_master/caja_master";
import Egreso from "@/components/caja_master/egreso";
import Ingreso from "@/components/caja_master/ingreso";
import ListaFondoFijos from "@/components/caja_master/lista_ff";
import ListadoCajaSucursales from "@/components/caja_master/listado_caja_sucursales";
import ModifIngresoCaja from "@/components/caja_master/modificacion_ingreso_caja";
import Transferencia from "@/components/caja_master/transferencia";
import FondoFijoForm from "@/components/fondo_fijo/fondo_fijo_form";
import LayoutAdmin from "@/components/layout/layout_admin";
import { Col, Divider, Row } from "antd";
import DetalleFondoFijo from "../../../components/caja_master/detalle_ff";
import InformeTarjetas from "@/components/informes/cobros/informeTarjetas";
import ListadoCajasAdmin from "@/components/admin/caja/ListadoCajasAdmin";
import VentasTipoGraph from "@/components/charts/ventasTipoGraph";
import CobrosTipoGraph from "@/components/charts/cobrosTipoGraph";
import Proveedores from "@/components/admin/dashboard_components/proveedores";
import DataCard from "@/components/etc/DataCard";
import CobrosTarjetaDia from "@/components/informes/caja/cobrosTarjetaDia";
import CuotasPendientesTarjetas from "@/components/informes/caja/cuotasPendientesTarjetas";
export default function test() {
  return (
    <div>
    
      {/*<ListadoCajasAdmin />

    <InformeTarjetas />  

    <Divider />
    <CobrosTarjetaDia />
    */}
    <CuotasPendientesTarjetas />
    <Row>
      <Col span={12}>
        <Proveedores />
      </Col>
    </Row>
    <br />
      <Row gutter={16}>
        <Col span={8}>
          <VentasTipoGraph />
        </Col>
        <Col span={12}>
          <CobrosTipoGraph />
        </Col>
      </Row>
      Fondos
      <ListaFondoFijos />
      <Divider />
      <ListadoCajaSucursales />
      <Divider />
      <CajaMaster />
      <Divider />
      Transferencia
      <Transferencia aFondoFijo={false} />
      Ingreso
      <Ingreso />
    </div>
  );
}

test.PageLayout = LayoutAdmin;
