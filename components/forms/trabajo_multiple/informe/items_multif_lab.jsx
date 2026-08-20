import { formatFloat } from "@/src/helpers/formatters";
const InfItemsMultiLab = (data) => {
  const td_style = {
    borderBottom: "1px solid #ddd",
    padding: "4px",
  };

  const th_style = {
    borderBottom: "1px solid #ddd",
    padding: "4px",
    fontWeight: "600",
  };

  return (
    <>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          borderRadius: "14px",
          fontFamily: "Arial",
          border: "1px solid  #ddd",
        }}
      >
        <thead>
          <tr>
            <th
              colSpan={9}
              style={{ ...th_style, textAlign: "left", fontWeight: "400" }}
            >
              Multifocales Laboratorio
            </th>
          </tr>
          <tr>
            <th style={{ ...th_style, width: "70px", textAlign: "right" }}>
              Tipo
            </th>
            <th style={{ ...th_style, textAlign: "center" }}>Cristal</th>
            <th style={{ ...th_style, textAlign: "right" }}>Eje</th>
            <th style={{ ...th_style, textAlign: "right" }}>Precio</th>
          </tr>
        </thead>
        <tbody>
          {data?.items?.map((i) => {
            return (
              <tr>
                <th style={{ ...td_style, width: "70px", textAlign: "right" }}>
                  {i.tipo}
                </th>
                <td style={{ ...td_style, textAlign: "center" }}>
                  {i.codigo.toUpperCase().replace(/_/g, " ")}
                </td>
                <td style={{ ...td_style, textAlign: "right" }}>{i.eje}</td>
                <td style={{ ...td_style, textAlign: "right" }}>
                  $ {formatFloat(i.precio)}
                </td>
              </tr>
            );
          })}
          <tr>
            <th style={{ ...td_style, width: "70px", textAlign: "right" }}>
              Armaz&oacute;n
            </th>
            <td colSpan={8} style={td_style}>
              {data.comentarios}
            </td>
          </tr>
        </tbody>
      </table>
      <br />
    </>
  );
};

export default InfItemsMultiLab;
