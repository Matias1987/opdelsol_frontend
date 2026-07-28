import ListaCobros from "@/components/forms/caja/ListaCobros";
import { Spin } from "antd";
import VentaDirectaItems from "./VentaDirectaItems";
import RecStockItems from "./RecStockItems";
import LCLabItems from "./LCLabItems";
import LCStockItems from "./LCStockItems";
import MultifLabItems from "./MultifLabItems";
import MonofLabItems from "./MonofLabItems";
import FechaEntregaInf from "./common/FechaRetiroInf";
import MontosTotalesInf from "./common/MontosTotales";
import ModoPagoInf from "./common/ModoPago";
import DestinatarioInf from "./common/Destinatario";
import ResponsableInf from "./common/Responsable";

const InformeVentaMinV2 = (props) => {
  const productos = () => {
    //alert(data.tipo)
    switch (+props.data.tipo) {
      case 1:
        return <VentaDirectaItems idventa={props.data.idventa} />;
      case 2:
        return <RecStockItems idventa={props.data.idventa} />;
      case 6:
        return <LCLabItems idventa={props.data.idventa} />;
      case 3:
        return <LCStockItems idventa={props.data.idventa} />;
      case 5:
        return <MultifLabItems idventa={props.data.idventa} />;
      case 4:
        return <MonofLabItems idventa={props.data.idventa} />;
    }
  };
  const tipo_venta = (tipo) => {
    switch (+tipo) {
      case 1:
        return "VENTA DIRECTA";
      case 2:
        return "RECETA STOCK";
      case 3:
        return "LENTES DE CONTACTO STOCK";
      case 4:
        return "MONOFOCALES LABORATORIO";
      case 5:
        return "MULTIFOCALES LABORATORIO";
      case 6:
        return "LENTES DE CONTACTO LABORATORIO";
    }
  };
  return props.data === null ? (
    <Spin />
  ) : (
    <>
      <div
        style={{
          width: "90%",
          paddingLeft: "12px",
          paddingRight: "12px",
          paddingTop: "20px",
        }}
      >
        <table
          style={{
            height: "78px",
            width: "96%",
            border: "1",
            cellspacing: "0",
            cellpadding: "0",
            fontSize: "1em",
            padding: "0",
          }}
        >
          <tbody>
            <tr>
              <td>
                <table
                  style={{
                    height: "21px",
                    width: "100%",
                    border: "1",
                    cellspacing: "0",
                    cellpadding: "0",
                  }}
                >
                  <tbody>
                    <tr>
                      <td width="250px" colSpan={2}>
                        <b>{tipo_venta(props.data.tipo)}</b>
                        <br />
                        Vendedor: <b>{props.data.usuario_nombre}</b>
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <FechaEntregaInf data={props.data} />
                      </td>
                      <td>
                        <b>Montos Totales:</b>
                        <MontosTotalesInf data={props.data} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table style={{ height: "21px", width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>
                        <ResponsableInf id={props.data.cliente_idcliente} />
                        <DestinatarioInf id={props.data.fk_destinatario} />
                        <hr />
                        {props.data.obra_social != ""
                          ? "Obra Social: " + props.data.obra_social
                          : ""}
                        <br />{" "}
                        {props.data.medico != ""
                          ? "Medico: " + props.data.medico
                          : ""}{" "}
                        <br />
                        Fecha de Entrega:{" "}
                        {props.data.fecha_entrega_formated +
                          "  " +
                          (props.data.hora_retiro == "null"
                            ? "-"
                            : props.data.hora_retiro)}
                      </td>
                      <td width="250px"></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "0" }}>
                {
                  //<Barcode value={data.idventa}  displayValue={false} width={2} height={6}/>
                }
              </td>
            </tr>
            <tr>
              <td>{productos()}</td>
            </tr>
            <tr>
              <td>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td>
                        <ModoPagoInf idventa={props.data.idventa} />
                      </td>
                      <td>&nbsp;&nbsp;</td>
                      <td width="250px"></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>{props.data.comentarios}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
      <h3>Lista de Cobros</h3>
      <ListaCobros idventa={props.data.idventa} readOnly={true} />
    </>
  );
};

export default InformeVentaMinV2;
