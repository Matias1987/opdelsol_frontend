import { useEffect, useState } from "react";
import { Table, Card, Row, Col } from "antd";
import fetchConRetryYTimeout from "@/src/helpers/get_helper";
import { get } from "@/src/urls";

const DetallePedido = ({ idpedido }) => {
  const [detallePedido, setDetallePedido] = useState(null);
  const [pedido, setPedido] = useState(null);

  const columns = [

    {title:"Codigo", dataIndex:"codigo_idcodigo"},
    {title:"Cant", dataIndex:"cant_pedida"},

  ]

  const load_detalle_pedido = async () => {
    const result = await fetchConRetryYTimeout(get.detalle_pedido + idpedido);

    if (!result || result.length === 0) {
      alert("No se pudo cargar el detalle del pedido.");
      return;
    }

    //get first row to get pedido info
    setPedido(result[0]);
    setPedido((_) => ({
      ..._,
      sucursal_origen: result[0].sucursal_origen,
      proveedor_idproveedor: result[0].proveedor_idproveedor,
      sucursal_pedido: result[0].sucursal_pedido,
      tipo: result[0].tipo,
      fecha: result[0].fecha,
    }));

    setDetallePedido((_) =>
      result.map((p) => ({
        idcodigo: p.codigo_idcodigo,
        sucursal_origen: p.sucursal_origen,
        sucursal_pedido: p.sucursal_pedido,
        cantidad: +p.cant_pedida,
      })),
    );
  };

  useEffect(() => {
    load_detalle_pedido();
  }, [idpedido]);

  return !pedido ? <>Espere...</> :  (
    <>
      <Card size="small">
        <Row>
          <Col span={24}>Nro.{pedido?.id || "N/A"}</Col>
        </Row>
        <Row>
          <Col span={24}>
            Sucursal de Origen: {pedido?.sucursal_origen || "N/A"}
          </Col>
        </Row>
        {pedido.tipo === "compra" && (
          <Row>
            <Col span={24}>
              Proveedor: {pedido?.proveedor_idproveedor || "N/A"}
            </Col>
          </Row>
        )}
        {pedido.tipo === "interno" && (
          <Row>
            <Col span={24}>
              Sucursal de Pedido: {pedido?.sucursal_pedido || "N/A"}
            </Col>
          </Row>
        )}
        <Row>
          <Col span={24}>Tipo: {pedido?.tipo || "N/A"}</Col>
        </Row>
        <Row>
          <Col span={24}>Fecha: {pedido?.fecha || "N/A"}</Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              size="small"
              dataSource={detallePedido}
              columns={columns}
              rowKey="id"
              pagination={false}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default DetallePedido;
