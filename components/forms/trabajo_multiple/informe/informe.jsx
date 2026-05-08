import PrinterWrapper from "@/components/PrinterWrapper";
import { get } from "@/src/urls";
import { Spin } from "antd";
import { useEffect, useState } from "react";

const Informe = ({ idventa }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    idventa: 69747,
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
    fecha: "2026-05-07T15:17:56.000Z",
    fecha_alta: "2026-05-07T15:17:56.000Z",
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
        idtrabajo: 65,
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
        idtrabajo: 66,
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

  const load = () => {
    setLoading(true);
    fetch(get.obtener_ventas_tm + idventa)
      .then((r) => r.json())
      .then((response) => {
        setData(response.data);
        setLoading(false);
      });
  };

  const td_style = {
    borderBottom: "1px solid #ddd",
    padding: "4px",
  };

  const th_style = {
    borderBottom: "1px solid #ddd",
    padding: "4px",
    fontWeight: "600",
  };

  useEffect(() => {
    load();
  }, []);

  const header = () => {
    return (
      <>
        <table>
          <tr>
            <td style={{ padding: "16px", fontWeight: "600", fontSize:"1.1em", textDecoration:"underline" }}>Universal Lens</td>
            <td style={{ padding: "4px" }}></td>
          </tr>
          <tr>
            <td>Operaci&oacute;n N°: <span style={{fontWeight:"600"}}>{data.idventa}</span></td>
            <td>Cliente ID: {data.cliente_idcliente}</td>
          </tr>
          <tr>
            <td>Fecha: 00/00/0000</td>
            <td></td>
          </tr>
        </table>
      </>
    );
  };

  const laboratorio = (data) => {
    return (
      <>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          borderRadius: "14px",
          fontFamily: "Arial",
          border:"1px solid  #ddd"
        }}
      >
        <thead>
          <tr>
            <th colSpan={9} style={{...th_style, textAlign:"left", fontWeight:"400"}}>
              Cristal Laboratorio
            </th>
          </tr>
          <tr>
            <th style={{ ...th_style, width: "70px" }}>Tipo</th>
            <th style={th_style}>Trabajo</th>
            <th style={{ ...th_style, textAlign: "right" }}>Esf</th>
            <th style={{ ...th_style, textAlign: "right" }}>Cil</th>
            <th style={{ ...th_style, textAlign: "right" }}>Eje</th>
            <th style={{ ...th_style, textAlign: "right" }}>Add</th>
            <th style={{ ...th_style, textAlign: "right" }}>Precio</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((i) => {
            return (
              <tr>
                <th style={td_style}>{i.tipo}</th>
                <td style={td_style}>{""}</td>
                <td style={{ ...td_style, textAlign: "right" }}>{i.esf}</td>
                <td style={{ ...td_style, textAlign: "right" }}>{i.cil}</td>
                <td style={{ ...td_style, textAlign: "right" }}>{i.eje}</td>
                <td style={{ ...td_style, textAlign: "right" }}>{i.add}</td>
                <td style={{ ...td_style, textAlign: "right" }}>{i.precio}</td>
              </tr>
            );
          })}
          <tr>
            <th style={td_style}>Armaz&oacute;n</th>
            <td colSpan={8} style={td_style}></td>
          </tr>
        </tbody>
      </table>
      <br />
      </>
    );
  };

  const stock = (data) => {
    return (
      <>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          borderRadius: "14px",
          fontFamily: "Arial",
          border:"1px solid  #ddd"
        }}
      >
        <thead>
          <tr>
            <th colSpan={9} style={{...th_style, textAlign:"left",fontWeight:"400"}}>
              Cristal Stock
            </th>
          </tr>
          <tr>
            <th style={{ ...th_style, width: "70px" }}>Tipo</th>
            <th style={th_style}>Cristal</th>
            <th style={{ ...th_style, textAlign: "right" }}>Eje</th>
            <th style={{ ...th_style, textAlign: "right" }}>Precio</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((i) => {
            return (
              <tr>
                <th style={td_style}>{i.tipo}</th>
                <td style={td_style}>{i.idcodigo}</td>
                <td style={{ ...td_style, textAlign: "right" }}>{i.eje}</td>
                <td style={{ ...td_style, textAlign: "right" }}>{i.precio}</td>
              </tr>
            );
          })}
          <tr>
            <th style={td_style}>Armaz&oacute;n</th>
            <td colSpan={8} style={td_style}></td>
          </tr>
        </tbody>
      </table>
      <br />
      </>
    );
  };

  const trabajo = (data) => {
    return data.tipo != "cristales_laboratorio"
      ? stock(data)
      : laboratorio(data);
  };
  const totales = () => {
    return (
      <>
        <table>
          <tbody>
            <tr>
              <td style={{ padding: "4px" }}>Subtotal:</td>
              <td style={{ padding: "4px" }}>$ 00000.00</td>
            </tr>
            <tr>
              <td style={{ padding: "4px" }}>Descuento:</td>
              <td style={{ padding: "4px" }}>$ 00000.00</td>
            </tr>
            <tr>
              <td style={{ padding: "4px" }}>Total:</td>
              <td style={{ padding: "4px" }}>$ 00000.00</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  };

  return loading ? (
    <Spin />
  ) : (
    <>
      <PrinterWrapper>
        <div style={{ fontFamily: "Arial" }}>
          {header()}
          <br />
          {data.trabajos.map((t) => trabajo(t))}
          <br />
          <hr />
          {totales()}
        </div>
      </PrinterWrapper>
    </>
  );
};

export default Informe;
