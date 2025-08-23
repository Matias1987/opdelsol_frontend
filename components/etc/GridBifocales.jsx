import { useEffect, useState } from "react";

const GridBifocales = (props) => {
  const { codigosSrc } = props;

  const regexp = /^([A-Z_]+)(_)(\-|\+[0-9\.]+)(_)(L|R)(_ADD_)([0-9\.]+)/;

  const [codigos, setCodigos] = useState([]);

  const process = () => {
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
      }

      codes_arr[codes_arr.length - 1].push({
        add: _codigos[i].add,
        base: _codigos[i].base,
        left: _codigos[i].cantidad,
        right: _codigos[i + 1].cantidad,
      });

      prev_base = _codigos[i].base;
    }

    setCodigos(codes_arr);
  };

  const header = (_) => <>
    <tr>
        <th colSpan={codigos.length *2 +1}>
            GRILLA
        </th>
    </tr>
    {
      codigos.map((codigo, index) => (
        <tr key={index}>
          {index === 0 ? <th></th> : <></>}
          <th colSpan={2}></th>
        </tr>
      ))
    }
    {
      codigos.map((codigo, index) => (
        <tr key={index}>
          {index === 0 ? <th></th> : <></>}
          <th>L</th><th>R</th>
        </tr>
      ))
    }
  </>;
  const body = (_) => (
    <>
      {codigos.map((codigo) => (
        <tr>
            {index === 0 ? <td>{codigo.base}</td>:<></>}
            <td>{0}</td><td>{0}</td>
        </tr>
      ))}
    </>
  );
  const get_grid = (_) => (
    <>
      <table>
        <thead>{header()}</thead>
        <tbody>{body()}</tbody>
      </table>
    </>
  );
  useEffect(() => {
    process();
  }, []);

  return get_grid()
  
};

export default GridBifocales;
