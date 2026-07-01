import globals from "@/src/globals";
import { get } from "@/src/urls";
import { DownOutlined, EditOutlined, InfoOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Space } from "antd";
import { useEffect, useState } from "react";

const GridBifocales = (props) => {
  const { codigosSrc, onCellClick, reload, gridType } = props;

  const regexp = /^([A-Z_]+)(_)(\-|\+[0-9\.]+)(_)(L|R)(_ADD_)([0-9\.]+)/;

  const regex_add = /(_ADD_)([\.0-9]+)/;
  const regex_base = /_((\+|\-)?[0-9\.]+)_(L|R)/;
  const regex_side = /_(L|R)_/;
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
      disabled: !globals.esUsuarioDeposito() && !globals.esUsuarioLaboratorio(),
    },
  ];

  const tableStyles = {
    container: {
      height: "600px",
      overflowY: "auto",
      maxWidth: "1200px",
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
      backgroundColor: "rgb(227, 227, 228, .5)",
      color: "#000000",
      padding: "4px 4px",
      textAlign: "center",
      border: "1px solid #A6A5A5",
      //borderBottom: '2px solid rgb(12, 12, 12)',
      transition: "background-color 0.3s ease",
    },
    td: {
      padding: "16px 4px",
      border: "1px solid #A6A5A5",
      transition: "background-color 0.3s ease",
    },
    rowHover: {
      backgroundColor: "#f1f8ff",
    },
    sticky_head: {
      position: "sticky" /* Make the header sticky */,
      top: "0" /* Stick to the top of the scrollable area */,
      zIndex: "1" /* Ensure the header stays above scrolling content */,
    },

    sticky_first_row_td: {
      position: "sticky",
      left: "0",
      background: "white",
      zIndex: "2",
    },

    sticky_column: {
      position: "sticky",
      left: "0",
      background: "rgba(255,255,255,.5)",
      color: "red",
      zIndex: "1",
      fontWeight: "bolder",
    },
  };

  const get_add = (_code) => {
    const result = _code.match(regex_add);
    //example: [ '_ADD_1.00', '_ADD_', '1.00', index: 30, input: '1.499_FLAPTOP_ORG_70MM_-4.00_L_ADD_1.00', groups: undefined ]
    return result[2];
  };

  const get_base = (_code) => {
    const result = _code.match(regex_base);
    //example: [ '_-4.00_L', '-4.00', '-', 'L', index: 22, input: '1.499_FLAPTOP_ORG_70MM_-4.00_L_ADD_1.00', groups: undefined ]
    return result[1];
  };

  const get_side = (_code) => {
    const result = _code.match(regex_base);
    //example: [ '_L_', 'L', index: 28, input: '1.499_FLAPTOP_ORG_70MM_-4.00_L_ADD_1.00', groups: undefined ]
    return result[1];
  };

  const getCantidad = (c) =>
    gridType === "ideal"
      ? c.stock_ideal
      : gridType === "critico"
        ? c.stock_critico
        : gridType === "pedido"
          ? +c.stock_ideal - +c.cantidad
          : c.cantidad;
  const process = (codes = codigosSrc) => {
    const _codigos = [];

    codes.forEach((code) => {
      const add = get_add(code.codigo);
      const base = get_base(code.codigo);
      const side = get_side(code.codigo);
      const weight =
        parseFloat(base) * 1000000 +
        parseFloat(add) * 100 +
        (side === "R" ? 1 : 0);

      _codigos.push({
        codig_base: code.codigo,
        base,
        side,
        add,
        cantidad: getCantidad(code),
        idcodigo: code.idcodigo,
        weight,
      });
    });

    //sort by weight
    let cont = true;
    while (cont) {
      cont = false;
      for (let i = 0; i < _codigos.length - 1; i++) {
        let _a = _codigos[i];
        let _b = _codigos[i + 1];
        if (+_a.weight > +_b.weight) {
          cont = true;
          _codigos[i] = _b;
          _codigos[i + 1] = _a;
        }
      }
    }

    const codes_arr = [];
    let prev_base = "";

    for (let i = 0; i < _codigos.length - 1; i += 2) {
      if (prev_base !== _codigos[i].base) {
        codes_arr.push([]);
      }

      codes_arr[codes_arr.length - 1].push({
        codig_left: _codigos[i].codig_base,
        codig_right: _codigos[i + 1].codig_base,

        add: _codigos[i].add,
        base: _codigos[i].base,
        left: _codigos[i].cantidad,
        right: _codigos[i + 1].cantidad,
        id_left: _codigos[i].idcodigo,
        id_right: _codigos[i + 1].idcodigo,
        weight: _codigos[i + 1].weight,
      });

      prev_base = _codigos[i].base;
    }
    setCodigos(codes_arr);
  };

  const cell_content = (data) => (
    <>
      <Dropdown
        menu={{
          items,
          onClick: ({ key }) => {
            onCellClick?.(key, data.idcodigo);
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
  /**
 * 
 * <tr>
        <th colSpan={codigos[0].length *2 +1} style={tableStyles.th}>
            {codigos[0][0].codig_base}
        </th>
    </tr>
 */
  const header = (_) => (
    <>
      <tr style={tableStyles.sticky_head}>
        <th style={tableStyles.th}></th>
        {codigos[0].map((r) => (
          <th style={tableStyles.th} colSpan={2}>
            {r.add}
          </th>
        ))}
      </tr>
      <tr>
        <th style={tableStyles.th}></th>
        {codigos[0].map(() => (
          <>
            <th style={tableStyles.th}>L</th>
            <th style={tableStyles.th}>R</th>
          </>
        ))}
      </tr>
    </>
  );
  const body = (_) => (
    <>
      {codigos.map((row) => (
        <tr>
          <td
            style={{ ...tableStyles.sticky_column, ...{ fontWeight: "bold" } }}
          >
            {row[0].base}
          </td>
          {row.map((cell, index) => (
            <>
              <td
                className="gid-table-td"
                style={{
                  ...tableStyles.td,
                  ...{
                    backgroundColor: cell.left > 0 ? "#d1f7d1ff" : "#F5F5F5",
                  },
                }}
              >
                {cell_content({ cantidad: cell.left, idcodigo: cell.id_left })}
              </td>
              <td
                className="gid-table-td"
                style={{
                  ...tableStyles.td,
                  ...{
                    backgroundColor: cell.right > 0 ? "#d1f7d1ff" : "#F5F5F5",
                  },
                }}
              >
                {cell_content({
                  cantidad: cell.right,
                  idcodigo: cell.id_right,
                })}
              </td>
            </>
          ))}
        </tr>
      ))}
    </>
  );
  const get_grid = (_) => (
    <div style={tableStyles.container}>
      <table style={tableStyles.table}>
        <thead>{header()}</thead>
        <tbody>{body()}</tbody>
      </table>
    </div>
  );

  useEffect(() => {
    process();
  }, []);

  return codigos.length < 1 ? (
    <></>
  ) : (
    <>
      <div style={{ textAlign: "center" }}>
        <h4>{codigos.length > 0 ? codigos[0][0].codig_base : ""}</h4>
      </div>
      {get_grid()}
      <Input value={JSON.stringify(codigosSrc)} />
      <Input value={JSON.stringify(codigos)} />
    </>
  );
};

export default GridBifocales;
