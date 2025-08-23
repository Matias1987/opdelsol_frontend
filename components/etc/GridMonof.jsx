const GridMonof = (props) => {
  const { codigosSrc } = props;

  const regexp = /^([A-Z_0-9\.]+)(_)([0-9\.]+)($)/;

  const [codigos, setCodigos] = useState([]);

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

  const header = (_) => <></>;

  const body = (_) => (
    <>
      {codigos.map((codigo, index) => (
        <tr>
            {index === 0 ? <td>{codigo.base}</td>:<></>}
            <td>{0}</td>
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

  return get_grid();
};
