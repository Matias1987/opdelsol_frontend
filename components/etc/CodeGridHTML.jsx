import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import "@/styles/codeGrid.module.css";
import { DownOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Dropdown, Row, Space } from "antd";
import { useEffect, useState } from "react";
import DetalleSubgrupo from "../DetalleSubgrupo";

//old javascript...
/**
 *
 * @param idsubgrupo
 * @param idsucursal
 * @param onCellClick
 *
 *
 */
const CodeGridHTML = (props) => {
  const { idsubgrupo, idsucursal, onCellClick, reload } = props;
  const [dataPositive, setDataPositive] = useState([]);
  const [dataNegative, setDataNegative] = useState([]);
  const [codesDict, setCodesDict] = useState({});

  const load = (callback) => {
    post_method(
      post.obtener_grilla_stock,
      { idsubgrupo: idsubgrupo, idsucursal: idsucursal, eje: "-1" },
      (response) => {
        //alert(JSON.stringify(response));
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
        if (_min_esf > 1000 || _max_esf < -1000) return;
        if (_min_cil > 1000 || _max_cil < -1000) return;

        //alert(JSON.stringify({_min_esf, _max_esf, _min_cil, _max_cil}));
        setCodesDict(qtties);
        setDataPositive(
          prepare(Math.abs(0), Math.abs(_min_esf), Math.abs(_min_cil), "+", "-")
        );
        setDataNegative(
          prepare(Math.abs(0), Math.abs(_max_esf), Math.abs(_min_cil), "-", "-")
        );
      }
    );
  };

  //#region STYLE
  const base_table_style = {
    tableLayout: "fixed",
  };

  const base_border_style = {
    border: "1px solid #C1D4E7",
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

  const prepare = (start_from, max_esf, max_cil, sign_esf, sign_cil) => {
    const rowdata = [];
    for (let i = start_from; i <= max_esf; i += 0.25) {
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
                    <td style={{ ...base_border_style, ...td_style }}>
                      <div
                        style={
                          +(
                            codesDict[
                              `${parseFloat(cell.esf) * 100}${
                                parseFloat(cell.cil) * 100
                              }`
                            ]?.cantidad > 0 || "0"
                          )
                            ? {
                                ...cell_content,
                                backgroundColor: "#ffe4bbff",
                                fontWeight: "600",
                                color: "black",
                              }
                            : {
                                ...cell_content,
                                backgroundColor: "#F5F5F5",
                                color: "#567effff",
                              }
                        }
                      >
                        {
                          codesDict[
                            `${parseFloat(cell.esf) * 100}${
                              parseFloat(cell.cil) * 100
                            }`
                          ]?.cantidad
                        }
                        {"undefined" ===
                        typeof codesDict[
                          `${parseFloat(cell.esf) * 100}${
                            parseFloat(cell.cil) * 100
                          }`
                        ] ? (
                          <></>
                        ) : (
                          <Dropdown
                            menu={{
                              items: [
                                {
                                  key: "1",
                                  label: "Detalle",
                                },
                                {
                                  key: "2",
                                  label: "Editar Stock",
                                },
                              ],
                              onClick: ({ key }) => {
                                onCellClick(
                                  key,
                                  codesDict[
                                    `${parseFloat(cell.esf) * 100}${
                                      parseFloat(cell.cil) * 100
                                    }`
                                  ]?.idcodigo
                                );
                              },
                            }}
                          >
                            <Button type="link" size="small">
                              <Space>
                                <DownOutlined />
                              </Space>
                            </Button>
                          </Dropdown>
                        )}
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
    if (idsubgrupo < 1) {
      return;
    }
    load();
  }, [idsubgrupo, idsucursal, reload]);

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <>
      <Row style={{padding:"16px"}}>
        <Col span={24}>
          <DetalleSubgrupo idsubgrupo={idsubgrupo} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Collapse
            style={{ backgroundColor: "#C1D4E7" }}
            defaultActiveKey={["1"]}
            onChange={onChange}
            items={[
              {
                key: "1",
                label: <span style={{ fontWeight: "700" }}>Negativos</span>,
                children: <>{display_grid(dataNegative)}</>,
              },
              {
                key: "2",
                label: <span style={{ fontWeight: "700" }}>Positivos</span>,
                children: <>{display_grid(dataPositive)}</>,
              },
            ]}
          />
        </Col>
      </Row>
    </>
  );
};

export default CodeGridHTML;
