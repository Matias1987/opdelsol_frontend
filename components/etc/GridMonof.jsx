import globals from "@/src/globals";
import { DownOutlined, EditOutlined, InfoOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import { useEffect, useState } from "react";

const GridMonof = (props) => {
  const { codigosSrc, onMenuOptionSelected } = props;

  const regexp = /^([A-Z_0-9\.]+)(_)([0-9\.]+)($)/;

  const [codigos, setCodigos] = useState([]);

  const items = [
    {
      label: "Detalle",
      key: "1",
      icon: <InfoOutlined />,
    },
    {
      label: "Editar Stock",
      key: "2",
      icon: <EditOutlined />,
      disabled: !globals.esUsuarioDeposito(),
    },
  ];

  const tableStyles = {
    container: {
      width: "100%",
      overflowX: "auto",
      background: "linear-gradient(to right, #ECECED, #ffffff)",
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
      backgroundColor: "#E3E3E4",
      color: "#663F4C",
      padding: "12px 16px",
      textAlign: "center",
      border: "1px solid #663F4C",
      borderBottom: "2px solid #4d2e38ff",
      transition: "background-color 0.3s ease",
    },
    td: {
      padding: "12px 16px",
      border: "1px solid #663F4C",
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
      const parts = regexp.exec(code.codigo);
      if (parts) {
        const _code = {
          codig_base: parts[1],
          base: parts[3],
          cantidad: code.cantidad,
          idcodigo: code.idcodigo,
        };
        _codigos.push(_code);
        console.log(JSON.stringify(_code));
      } else {
        console.log("No match found");
      }
    });
    //alert(JSON.stringify(_codigos));
    setCodigos(_codigos);
  };

  useEffect(() => {
    process();
  }, []);

  const cell_content = (data) => (
    <>
      <Dropdown
        menu={{
          items,
          onClick: ({ key }) => {
            onMenuOptionSelected?.(key, data.idcodigo);
          },
        }}
      >
        <Button type="link" size="small">
          <Space>
            {data.cantidad}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </>
  );

  const header = (_) => (
    <>
      <tr>
        <th style={tableStyles.th} colSpan={2}>
          {(codigos[0] || {}).codig_base}
        </th>
      </tr>
      <tr>
        <th style={tableStyles.th}>Base</th>
        <th style={tableStyles.th}>Cantidad</th>
      </tr>
    </>
  );

  const body = (_) => (
    <>
      {codigos.map((codigo, index) => (
        <tr>
          <td style={{...tableStyles.td, ...{fontWeight: 'bold'}}}>{codigo.base}</td>
          <td style={tableStyles.td}>{cell_content(codigo)}</td>
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
