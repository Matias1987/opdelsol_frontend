import globals from "@/src/globals";
import { DownOutlined, EditOutlined, InfoOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import { useEffect, useState } from "react";

const GridBifocales = (props) => {
  const { codigosSrc, onMenuOptionSelected } = props;

  const regexp = /^([A-Z_]+)(_)(\-|\+[0-9\.]+)(_)(L|R)(_ADD_)([0-9\.]+)/;

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
    overflowY:"auto",
     maxWidth: "1200px", 
    width: '100%',
    overflowX: 'auto',
    background: 'linear-gradient(to right, #ECECED, #ffffff)',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '1rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: 'Segoe UI, sans-serif',
    fontSize: '0.95rem',
    color: '#333',
  },
  th: {
    backgroundColor: 'rgb(227, 227, 228, .5)',
    color: '#1826a5',
    padding: '8px 8px',
    textAlign: 'center',
     border: '1px solid #663F4C',
    borderBottom: '2px solid #4d2e38ff',
    transition: 'background-color 0.3s ease',
  },
  td: {
    padding: '8px 8px',
    border: '1px solid #663F4C',
    transition: 'background-color 0.3s ease',
  },
  rowHover: {
    backgroundColor: '#f1f8ff',
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
    fontWeight:"bolder"
  },
};


  const process = () => {
    
    const _codigos = [];
    codigosSrc.forEach((code) => {
      //console.log(`Processing code: ${code}`);
      const parts = regexp.exec(code.codigo);
      if (parts) {
        const _code = {
          codig_base: parts[1],
          base: parts[3],
          side: parts[5],
          add: parts[7],
          cantidad: code.cantidad,
          idcodigo: code.idcodigo,
          weight: (+parts[3] * 1000000) + (+parts[7] * 100) + (parts[5]=='R' ? 1 : 0).toString()
        };
        _codigos.push(_code);
        //console.log(JSON.stringify(_code));
      } else {
        console.log("No match found");
      }
    });

    let cont = true;
    while (cont) {
      cont=false;
      for (let i = 0; i < _codigos.length - 1; i++) {
        let _a = _codigos[i];
        let _b = _codigos[i + 1];
        if (+_a.weight > +_b.weight) {
          cont=true;
          //swap
          _codigos[i] = _b;
          _codigos[i + 1] = _a;
        }
      }
    }

    const codes_arr = [];

    let prev_base = "";

    for (let i = 0; i < _codigos.length - 1; i += 2) {
      if (prev_base != _codigos[i].base) {
        //new row
        codes_arr.push([]);
        console.log(`New row added for add: ${prev_base} new: ${_codigos[i].add}`);
      }

      codes_arr[codes_arr.length - 1].push({
        codig_base: _codigos[i].codig_base,
        add: _codigos[i].add,
        base: _codigos[i].base,
        left: _codigos[i].cantidad,
        right: _codigos[i + 1].cantidad,
        id_left: _codigos[i].idcodigo,
        id_right: _codigos[i + 1].idcodigo,
      });

      prev_base = _codigos[i].base;
    }

    //alert(JSON.stringify(codes_arr));
    //console.log(JSON.stringify(codes_arr))
    setCodigos(codes_arr);
  };

  const cell_content = (data) => <>
            <Dropdown
            menu={{
              items,
              onClick: ({ key }) => {
                onMenuOptionSelected?.(key, data.idcodigo)
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

  const header = (_) => <>
    <tr>
        <th colSpan={codigos[0].length *2 +1} style={tableStyles.th}>
            {codigos[0][0].codig_base}
        </th>
    </tr>
    <tr  style={tableStyles.sticky_head}>
      <th style={tableStyles.th}></th>
      {
        codigos[0].map((r) => (
            <th style={tableStyles.th} colSpan={2}>{r.add}</th>
        ))
      }
    </tr>
    <tr>
      <th style={tableStyles.th}></th>
    {
      codigos[0].map(() => (
          <><th style={tableStyles.th}>L</th><th style={tableStyles.th}>R</th></>
      ))
    }
    </tr>
  </>;
  const body = (_) => (
    <>
      {codigos.map((row) => (
        <tr><td style={{...tableStyles.sticky_column, ...{fontWeight: 'bold'}}}>{row[0].base}</td>
        {
          row.map((cell,index) => (
            <>
            <td className="gid-table-td" style={{...tableStyles.td, ...{backgroundColor: cell.left>0 ? "#d1f7d1ff" : "#F5F5F5"}}}>
              {cell_content({cantidad: cell.left, idcodigo: cell.id_left})}
            </td>
            <td className="gid-table-td" style={{...tableStyles.td, ...{backgroundColor: cell.right>0 ? "#d1f7d1ff" : "#F5F5F5"}}}>
              {cell_content({cantidad: cell.right, idcodigo: cell.id_right})}
              </td>
            </>
          ))
        }
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

  return codigos.length<1 ? <></> : get_grid()
  
};

export default GridBifocales;
