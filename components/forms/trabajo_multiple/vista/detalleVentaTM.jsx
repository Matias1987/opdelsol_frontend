import { post_method } from "@/src/helpers/post_helper";
import { Col, Row } from "antd";
import { useState } from "react";
import TrabajoDetalleTM from "./trabajo";

const DetalleVentaTM = ({ idTrabajo }) => {
  const [venta, setVenta] = useState({
    idventa: 69746,
    cliente_idcliente: 6715,
    sucursal_idsucursal: 6,
    caja_idcaja: 1,
    usuario_idusuario: 5,
    medico_idmedico: null,
    monto_total: "0",
    descuento: "0",
    debe: "0",
    haber: "0",
    saldo: "0",
    fecha: "2026-05-05T13:47:37.000Z",
    fecha_alta: "2026-05-05T13:47:37.000Z",
    fk_os: null,
    fecha_retiro: "2026-01-01T03:00:00.000Z",
    fk_destinatario: null,
    subtotal: "0.000000",
    comentarios: "",
    tipo: "MULTIPLE",
    estado: "",
    hora_retiro: "",
    en_laboratorio: 0,
    json_items: "",
    estado_taller: null,
    recarga: "0.000000",
    uid: "",
    recibe_premio: 1,
    trabajos: [
      {
        idtrabajo: 63,
        tipo: "cristales_laboratorio",
        nro: 1,
        items: [
          {
            idcodigo: 130,
            esf: "0",
            cil: "0",
            eje: "0",
            cantidad: 1,
            precio: "0.000000",
            total: "0.000000",
          },
          {
            idcodigo: 130,
            esf: "0",
            cil: "0",
            eje: "0",
            cantidad: 1,
            precio: "0.000000",
            total: "0.000000",
          },
        ],
      },
      {
        idtrabajo: 64,
        tipo: "cristales_stock",
        nro: 2,
        items: [
          {
            idcodigo: 130,
            esf: "0",
            cil: "0",
            eje: "0",
            cantidad: 1,
            precio: "0.000000",
            total: "0.000000",
          },
          {
            idcodigo: 130,
            esf: "0",
            cil: "0",
            eje: "0",
            cantidad: 1,
            precio: "0.000000",
            total: "0.000000",
          },
        ],
      },
    ],
  });

  const style_span_value = {
    fontWeight: "bold",
    fontSize:"1.2em",
  };
  const load = () => {
    const url = "";

    post_method(url, { idTrabajo }, (response) => {});
  };

  const detalle_venta = (_) => (
    <div style={{padding:"16px"}}>
      <Row gutter={[16, 16]}>
        <Col>
          Nro. Op.: <span style={style_span_value}>{venta.idventa}</span>
        </Col>
        <Col>
          Cliente:{" "}
          <span style={style_span_value}>{venta.cliente_idcliente}</span>
        </Col>
        <Col>
          Sucursal:{" "}
          <span style={style_span_value}>{venta.sucursal_idsucursal}</span>
        </Col>
        <Col>
          Fecha: <span style={style_span_value}>{venta.fecha}</span>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col>
          Subtotal:$&nbsp;<span style={style_span_value}>{venta.subtotal}</span>
        </Col>
        <Col>
          Descuento:&nbsp;
          $&nbsp;<span style={style_span_value}>{venta.descuento}</span>
        </Col>
        <Col>
          Total:&nbsp;
          $&nbsp;<span style={style_span_value}>{venta.monto_total}</span>
        </Col>
        <Col>
          Fecha Entrega: <span style={style_span_value}>{venta.fecha_retiro}</span>
        </Col>
      </Row>

    </div>
  );

  return (
    <>
      {detalle_venta()}
      {venta.trabajos.map((t) => (
        <TrabajoDetalleTM trabajo={t} />
      ))}
    </>
  );
};

export default DetalleVentaTM;
