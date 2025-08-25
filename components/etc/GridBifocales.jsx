import { useEffect, useState } from "react";

const GridBifocales = (props) => {
  const { codigosSrc } = props;

  const regexp = /^([A-Z_]+)(_)(\-|\+[0-9\.]+)(_)(L|R)(_ADD_)([0-9\.]+)/;

  const [codigos, setCodigos] = useState([]);

  const tableStyles = {
  container: {
    width: '100%',
    overflowX: 'auto',
    background: 'linear-gradient(to right, #e3f2fd, #ffffff)',
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
    backgroundColor: '#bbdefb',
    color: '#0d47a1',
    padding: '12px 16px',
    textAlign: 'left',
    borderBottom: '2px solid #90caf9',
    transition: 'background-color 0.3s ease',
  },
  td: {
    padding: '12px 16px',
    border: '1px solid #e0e0e0',
    transition: 'background-color 0.3s ease',
  },
  rowHover: {
    backgroundColor: '#f1f8ff',
  },
};


  const process = () => {
    alert(JSON.stringify(codigosSrc));
    const _codigos = [];
    codigosSrc.forEach((code) => {
      //console.log(`Processing code: ${code}`);
      const parts = regexp.exec(code);
      if (parts) {
        const code = {
          codig_base: parts[1],
          base: parts[3],
          side: parts[5],
          add: parts[7],
        };
        _codigos.push(code);
        console.log(JSON.stringify(code));
      } else {
        console.log("No match found");
      }
    });

    const codes_arr = [];

    let prev_base = "";

    for (let i = 0; i < _codigos.length - 1; i += 2) {
      if (prev_base != _codigos[i].base) {
        //new row
        codes_arr.push([]);
        console.log(`New row added for add: ${prev_base} new: ${_codigos[i].add}`);
      }

      codes_arr[codes_arr.length - 1].push({
        add: _codigos[i].add,
        base: _codigos[i].base,
        left: _codigos[i].cantidad,
        right: _codigos[i + 1].cantidad,
      });

      prev_base = _codigos[i].base;
    }

    alert(JSON.stringify(codes_arr));

    setCodigos(codes_arr);
  };

  const header = (_) => <>
    <tr>
        <th colSpan={codigos[0].length *2 +1} style={tableStyles.th}>
            GRILLA
        </th>
    </tr>
    <tr>
      <th style={tableStyles.th}></th>
      {
        codigos[0].map(() => (
            <th style={tableStyles.th} colSpan={2}>00</th>

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
        <tr><td style={tableStyles.td}>000</td>
        {
          row.map((cell,index) => (
            <><td style={tableStyles.td}>{0}</td><td style={tableStyles.td}>{0}</td></>
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
