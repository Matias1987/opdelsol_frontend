import { formatFloat } from "@/src/helpers/formatters";
import { useEffect, useState } from "react";
import { usePDF } from "react-to-pdf";
import PrinterWrapper from "../PrinterWrapper";

const ImpresionResumen = ({ cliente, operaciones }) => {
  const { id, nombre, apellido, dni, cuit, direccion, localidad, provincia } =
    cliente;
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [totalDebe, setTotalDebe] = useState(0);
  const [totalHaber, setTotalHaber] = useState(0);
  const [totalSaldo, setTotalSaldo] = useState(0);
  const td_style = {
    border: "1px solid black",
    padding: "8px",
  };

  useEffect(() => {
    const totalDebe = operaciones.reduce(
      (acc, op) => acc + parseFloat(op.debe ?? 0),
      0,
    );
    const totalHaber = operaciones.reduce(
      (acc, op) => acc + parseFloat(op.haber ?? 0),
      0,
    );
    const totalSaldo = totalDebe - totalHaber;

    setTotalDebe(totalDebe);
    setTotalHaber(totalHaber);
    setTotalSaldo(totalSaldo);
  }, [operaciones]);

  return (
    <>
    <PrinterWrapper>
      <button onClick={() => toPDF()}>Download PDF</button>
      <div className="impresion-resumen" ref={targetRef}>
        <h2>Resumen de Operaciones</h2>
        <p>
          <strong>Fecha:</strong> {new Date().toLocaleDateString()}
        </p>
        <p>
          <strong>Cliente:</strong> {nombre} {apellido}
        </p>
        <p>
          <strong>Dirección:</strong> {direccion}
        </p>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid black",
          }}
        >
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Detalle</th>
              <th>Debe</th>
              <th>Haber</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {operaciones.map((op) => (
              <tr key={op.id}>
                <td style={td_style}>{op.fecha_f}</td>
                <td style={td_style}>{op.detalle_m}</td>
                <td style={{ ...td_style, textAlign: "right" }}>
                  $ {formatFloat(op.debe)}
                </td>
                <td style={{ ...td_style, textAlign: "right" }}>
                  $ {formatFloat(op.haber)}
                </td>
                <td style={{ ...td_style, textAlign: "right" }}>
                  $ {formatFloat(op.saldo)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan="2"
                style={{ ...td_style, textAlign: "right", fontWeight: "bold" }}
              >
                Totales:
              </td>
              <td
                style={{ ...td_style, textAlign: "right", fontWeight: "bold" }}
              >
                $ {formatFloat(totalDebe)}
              </td>
              <td
                style={{ ...td_style, textAlign: "right", fontWeight: "bold" }}
              >
                $ {formatFloat(totalHaber)}
              </td>
              <td
                style={{ ...td_style, textAlign: "right", fontWeight: "bold" }}
              >
                $ {formatFloat(totalSaldo)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      </PrinterWrapper>
    </>
  );
};
export default ImpresionResumen;
