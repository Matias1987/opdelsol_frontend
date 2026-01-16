
import TotalesCobros from "@/components/admin/dashboard_components/totales_cobros";
import TotalesVentasMeses from "@/components/admin/graficos/totalesVentasMeses";
import TotalCobrosPeriodo from "@/components/admin/totales/totalCobrosPeriodo";
import TotalesGastosPorSucursal from "@/components/admin/totales/totalesGastosPorSucursal";
import LayoutAdmin from "@/components/layout/layout_admin";
import { Card, Col, Row } from "antd";

export default function test() {
  return (
    <div>
      <TotalesCobros />
      <TotalCobrosPeriodo />
      <TotalesGastosPorSucursal />
      <Card title="Cantidad de Ventas Ultimos 12 Meses Por Sucursal" style={{marginTop:"20px", marginBottom:"20px", padding:"10px"}}>
      <Row gutter={[16,16]}>

        <Col style={{width:"600px"}}><TotalesVentasMeses cantMeses={12} idsucursal={6} /></Col>
        <Col style={{width:"600px"}}><TotalesVentasMeses cantMeses={12} idsucursal={7} /></Col>
        <Col style={{width:"600px"}}><TotalesVentasMeses cantMeses={12} idsucursal={8} /></Col>
        <Col style={{width:"600px"}}><TotalesVentasMeses cantMeses={12} idsucursal={9} /></Col>
        <Col style={{width:"600px"}}><TotalesVentasMeses cantMeses={12} idsucursal={10} /></Col>
        <Col style={{width:"600px"}}><TotalesVentasMeses cantMeses={12} idsucursal={11} /></Col>
        <Col style={{width:"600px"}}><TotalesVentasMeses cantMeses={12} idsucursal={16} /></Col>
      </Row>
      </Card>
      <Row>
        
      </Row>
      
      
      {/*
      <CodeGridHTML idsubgrupo={1386} idsucursal={6} />
      <VentasFiltrosAdmin />

<InformeCantidadesPeriodo />
      <AgregarFacturaV3 />

      <CodeGridV3 />
      <DeudaDetalle />
      <ListaDeudas />
      <Divider />
      <InformeVentasFiltros />*/}
    
      {/*<ListadoCajasAdmin />

    <InformeTarjetas />  

    <Divider />
    <CobrosTarjetaDia />
    */}
    {/*<CuotasPendientesTarjetas />
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
      <Divider />*/}
      {/*Transferencia
      <Transferencia aFondoFijo={false} />
      Ingreso
      <Ingreso />*/}
      {/*<AgregarArmazon />*/}
    </div>
  )
}

test.PageLayout = LayoutAdmin;
