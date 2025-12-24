
import LayoutAdmin from "@/components/layout/layout_admin";

import CodeGridHTMLTipos from "@/components/etc/CodeGridHTMLTipos";
export default function test() {
  return (
    <div>
      <CodeGridHTMLTipos idsubgrupo={1386} idsucursal={6} />
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
