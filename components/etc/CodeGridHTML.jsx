import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import "@/styles/codeGrid.module.css";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";

//old javascript...

const CodeGridHTML = (props) => {
  const { idsubgrupo, idsucursal, onCellClick } = props;
  const [dataPositive, setDataPositive] = useState([]);
  const [dataNegative, setDataNegative] = useState([]);
  const [codesDict, setCodesDict] = useState({});

  const load = (callback) => {
    post_method(
      post.obtener_grilla_stock,
      { idsubgrupo: 66668, idsucursal: 6, eje: "-1" },
      (response) => {
        alert(JSON.stringify(response));
        let t_ejes = {};
        let _ejes = [];
        let _min_esf = 9999;
        let _max_esf = -99999;
        let _min_cil = 99999;
        let _max_cil = -99999;
        let qtties = {};
        response.data.forEach((c) => {
          _max_esf =
            parseFloat(c.esf) > _max_esf ? parseFloat(c.esf) : _max_esf;
          _min_esf =
            parseFloat(c.esf) < _min_esf ? parseFloat(c.esf) : _min_esf;

          _min_cil =
            parseFloat(c.cil) < _min_cil ? parseFloat(c.cil) : _min_cil;
          _max_cil =
            parseFloat(c.cil) > _max_cil ? parseFloat(c.cil) : _max_cil;

          qtties[`${parseFloat(c.esf) * 100}${parseFloat(c.cil) * 100}`] = {
            cantidad: c.cantidad,
            codigo: c.codigo,
            idcodigo: c.idcodigo,
          };
        });

        //alert(JSON.stringify(qtties))
        setCodesDict(qtties);
        setDataPositive(
          prepare(Math.abs(_min_esf), Math.abs(_min_cil), "+", "-")
        );
        setDataNegative(
          prepare(Math.abs(_max_esf), Math.abs(_min_cil), "-", "-")
        );
      }
    );
  };

  //#region STYLE
  const base_table_style = {
    tableLayout: "fixed",
  };

  const base_border_style = {
    border: "1px solid blue",
    borderCollapse: "collapse",
    padding: "2px",
  };

  const td_style = {
    width: "64px",
    position: "relative",
  };

  const title_cell = {
    fontWeight: "700",
    color: "red",
    backgroundColor: "lightyellow",
  };

  const cell_content = {
    aspectRatio: "1 / 1",
    display: "flex" /* For centering content within the square */,
    justifyContent: "center",
    alignItems: "center",
  };

  const cell_button_style = {
    aspectRatio: "1 / 1",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0)",
    border: "0",
  };

  const sticky_head = {
    position: "sticky" /* Make the header sticky */,
    top: "0" /* Stick to the top of the scrollable area */,
    zIndex: "1" /* Ensure the header stays above scrolling content */,
    background: "white",
  };

  const sticky_first_row_td = {
    position: "sticky",
    left: "0",
    background: "white",
    zIndex: "2",
  };

  const sticky_column = {
    position: "sticky",
    left: "0",
    background: "white",
    zIndex: "1",
  };

  const container = {
    width: "100%",
    height: "500px",
    overflow: "auto",
    /* overflowY: "scroll",
    overflowX: "scroll",*/
  };

  //#endregion

  const prepare = (max_esf, max_cil, sign_esf, sign_cil) => {
    const rowdata = [];
    for (let i = 0; i <= max_esf; i += 0.25) {
      const row = [];
      for (let j = 0; j <= max_cil; j += 0.25) {
        row.push({
          esf: `${sign_esf}${i.toFixed(2)}`,
          cil: `${sign_cil}${j.toFixed(2)}`,
          val: 0,
        });
      }
      rowdata.push(row);
    }
    return rowdata;
  };

  const display_grid = (src) =>
    src.length < 1 ? (
      <></>
    ) : (
      <div style={container}>
        <table style={{ ...base_table_style, ...base_border_style }}>
          <thead>
            <tr>
              {src[0].map((cell, idx) => (
                <>
                  {idx != 0 ? (
                    <></>
                  ) : (
                    <th
                      style={{
                        ...title_cell,
                        ...td_style,
                        ...sticky_first_row_td,
                        ...base_border_style,
                      }}
                    >
                      <div style={cell_content}></div>
                    </th>
                  )}
                  <th
                    style={{
                      ...title_cell,
                      ...td_style,
                      ...sticky_head,
                      ...base_border_style,
                    }}
                  >
                    <div style={cell_content}>{cell.cil}</div>
                  </th>
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {src.map((row, idx1) => (
              <tr>
                {row.map((cell, idx) => (
                  <>
                    {idx != 0 ? (
                      <></>
                    ) : (
                      <td
                        style={{
                          ...base_border_style,
                          ...title_cell,
                          ...td_style,
                          ...sticky_column,
                        }}
                      >
                        <div style={cell_content}>{cell.esf}</div>
                      </td>
                    )}
                    <td
                      style={{ ...base_border_style, ...td_style }}
                      onClick={(_) => {
                        const key = `${parseFloat(cell.esf) * 100}${parseFloat(cell.cil) * 100}`
                        if (codesDict[key]) {
                          alert(JSON.stringify(codesDict[key]));
                          onCellClick?.();
                        }
                      }}
                    >
                      <div style={cell_content}>
                        {codesDict[
                          `${parseFloat(cell.esf) * 100}${
                            parseFloat(cell.cil) * 100
                          }`
                        ]?.cantidad || "-"}
                      </div>
                    </td>
                  </>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  useEffect(() => {
    load();
  }, [idsubgrupo, idsucursal]);

  return (
    <>
      <Row>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <h3>Negativos</h3>
            </Col>
          </Row>
          <Row>
            <Col span={24}>{display_grid(dataNegative)}</Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row>
            <Col span={24}>
              <h3>Positivos</h3>
            </Col>
          </Row>
          <Row>
            <Col span={24}>{display_grid(dataPositive)}</Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default CodeGridHTML;
