import { useEffect, useState } from "react";

const GridMonof = (props) => {
  const { codigosSrc } = props;

  const regexp = /^([A-Z_0-9\.]+)(_)([0-9\.]+)($)/;

  const [codigos, setCodigos] = useState([]);
  const tableStyles = {
    container: {
      width: "100%",
      overflowX: "auto",
      background: "linear-gradient(to right, #e3f2fd, #ffffff)",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      padding: "1rem",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "Segoe UI, sans-serif",
      fontSize: "0.95rem",
      color: "#333",
    },
    th: {
      backgroundColor: "#bbdefb",
      color: "#0d47a1",
      padding: "12px 16px",
      textAlign: "left",
      borderBottom: "2px solid #90caf9",
      transition: "background-color 0.3s ease",
    },
    td: {
      padding: "12px 16px",
      border: "1px solid #e0e0e0",
      transition: "background-color 0.3s ease",
    },
    rowHover: {
      backgroundColor: "#f1f8ff",
    },
  };
  const process = (_) => {
    const _codigos = [];
    codigosSrc.forEach((code) => {
      //console.log(`Processing code: ${code}`);
      const parts = regexp.exec(code);
      if (parts) {
        const code = {
          codig_base: parts[1],
          add: parts[3],
        };
        _codigos.push(code);
        console.log(JSON.stringify(code));
      } else {
        console.log("No match found");
      }
    });
    setCodigos(_codigos);
  };

  useEffect(() => {
    process();
  }, []);

  const header = (_) => <><tr>
    <th style={tableStyles.th} colSpan={2}>GRID</th>
    </tr>
    <tr>
      <th style={tableStyles.th}>Base</th>
      <th style={tableStyles.th}>QTTY</th>
    </tr>
    </>;

  const body = (_) => (
    <>
      {codigos.map((codigo, index) => (
        <tr>
          <td style={tableStyles.td}>{codigo.base}</td>
          <td style={tableStyles.td}>{0}</td>
        </tr>
      ))}
    </>
  );
  const get_grid = (_) => (
    <>
      <table style={tableStyles.table}>
        <thead>{header()}</thead>
        <tbody>{body()}</tbody>
      </table>
    </>
  );
  useEffect(() => {
    process();
  }, []);

  return <div style={tableStyles.container}>{get_grid()}</div>;
};

export default GridMonof;