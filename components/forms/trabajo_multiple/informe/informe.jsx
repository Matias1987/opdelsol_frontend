import PrinterWrapper from "@/components/PrinterWrapper";
import { formatFloat } from "@/src/helpers/formatters";
import { get } from "@/src/urls";
import { Input, Spin } from "antd";
import { useEffect, useState } from "react";

const Informe = ({ idventa }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const load = () => {
    setLoading(true);
    fetch(get.obtener_venta_tm + idventa)
      .then((r) => r.json())
      .then((response) => {
        setData(response.data);
        //alert(JSON.stringify(response.data))
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
            <td>Operaci&oacute;n N°: <span style={{fontWeight:"600"}}>{data?.idventa}</span></td>
            <td>Cliente ID: {data?.cliente_idcliente} | {data?.cliente}</td>
          </tr>
          <tr>
            <td>Fecha: {data?.fecha_f}</td>
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
            <th style={{ ...th_style, width: "70px", textAlign:"right" }}>Tipo</th>
            <th style={{ ...th_style, textAlign:"center"}}>Trabajo</th>
            <th style={{ ...th_style, textAlign: "right" }}>Esf</th>
            <th style={{ ...th_style, textAlign: "right" }}>Cil</th>
            <th style={{ ...th_style, textAlign: "right" }}>Eje</th>
            <th style={{ ...th_style, textAlign: "right" }}>Add</th>
            <th style={{ ...th_style, textAlign: "right" }}>Precio</th>
          </tr>
        </thead>
        <tbody>
          {data?.items?.map((i) => {
            return (
              <tr>
                <th style={{ ...td_style, width: "70px", textAlign:"right" }}>{i.tipo}</th>
                <td style={{ ...td_style, textAlign:"center"}}>{i.detalle_trabajo + ' | ' +  i.codigo}</td>
                <td style={{ ...td_style, textAlign: "right" }}>{i.esf}</td>
                <td style={{ ...td_style, textAlign: "right" }}>{i.cil}</td>
                <td style={{ ...td_style, textAlign: "right" }}>{i.eje}</td>
                <td style={{ ...td_style, textAlign: "right" }}>{i.add}</td>
                <td style={{ ...td_style, textAlign: "right" }}>$ {formatFloat(i.precio)}</td>
              </tr>
            );
          })}
          <tr>
            <th style={{ ...td_style, width: "70px", textAlign:"right" }}>Armaz&oacute;n</th>
            <td colSpan={8} style={td_style}>{data.comentarios}</td>
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
            <th style={{ ...th_style, width: "70px", textAlign:"right" }}>Tipo</th>
            <th style={{ ...th_style, textAlign:"center"}}>Cristal</th>
            <th style={{ ...th_style, textAlign: "right" }}>Eje</th>
            <th style={{ ...th_style, textAlign: "right" }}>Precio</th>
          </tr>
        </thead>
        <tbody>
          {data?.items?.map((i) => {
            return (
              <tr>
                <th style={{ ...td_style, width: "70px", textAlign:"right" }}>{i.tipo}</th>
                <td style={{ ...td_style, textAlign:"center"}}>{i.codigo}</td>
                <td style={{ ...td_style, textAlign: "right" }}>{i.eje}</td>
                <td style={{ ...td_style, textAlign: "right" }}>$ {formatFloat(i.precio)}</td>
              </tr>
            );
          })}
          <tr>
            <th style={{ ...td_style, width: "70px", textAlign:"right" }}>Armaz&oacute;n</th>
            <td colSpan={8} style={td_style}>{data.comentarios}</td>
          </tr>
        </tbody>
      </table>
      <br />
      </>
    );
  };

  const trabajo = (data) => {
    return data?.tipo != "laboratorio"
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
              <td style={{ padding: "4px" }}>$ {formatFloat(data?.subtotal)}</td>
            </tr>
            <tr>
              <td style={{ padding: "4px" }}>Descuento:</td>
              <td style={{ padding: "4px" }}>$ {formatFloat(data?.descuento)}</td>
            </tr>
            <tr>
              <td style={{ padding: "4px" }}>Total:</td>
              <td style={{ padding: "4px" }}>$ {formatFloat(data?.monto_total)}</td>
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
    {/*<div style={{overflow:"scroll", maxHeight:"400px", width:"400px"}}>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>*/}
      <PrinterWrapper>
        <div style={{ fontFamily: "Arial" }}>
          {header()}
          <br />
          {data?.trabajos?.map((t) => trabajo(t))}
          <br />
          <hr />
          {totales()}
        </div>
      </PrinterWrapper>
    </>
  );
};

export default Informe;
