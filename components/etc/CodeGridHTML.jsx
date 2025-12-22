import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import "@/styles/codeGrid.module.css";
import { DownOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Collapse, Dropdown, Row, Space } from "antd";
import { useEffect, useState } from "react";
import DetalleSubgrupo from "../DetalleSubgrupo";
import ExportToExcel2 from "./ExportToExcel2";

//old javascript...
/**
 *
 * @param gridType stock | ideal | pedido | critico | uso
 * @param idsubgrupo
 * @param idsucursal
 * @param onCellClick
 *
 *
 */
const CodeGridHTML = (props) => {
  const {
    idsubgrupo,
    idsucursal,
    onCellClick,
    reload,
    gridType,
    mes,
    anio,
    editarDisabled,
  } = props;
  const [dataPositive, setDataPositive] = useState([]);
  const [dataNegative, setDataNegative] = useState([]);
  const [modoSeleccionMultiple, setModoSeleccionMultiple] = useState(false);
  const [codesDict, setCodesDict] = useState({});

  const alertColors = [
    "#DC2626", // 16 - Red (Danger)
    "#DF2730", // 15
    "#E7352F", // 14
    "#EF4444", // 13 - Orange-Red
    "#F34121", // 12
    "#F65A1B", // 11
    "#F97316", // 10 - Orange
    "#F59E1E", // 9
    "#F7B51A", // 8
    "#FACC15", // 7 - Yellow
    "#E6E12A", // 6
    "#C9E92A", // 5
    "#A3E635", // 4 - Yellow-Green
    "#7DE262", // 3
    "#55D86A", // 2
    "#2ECC71", // 1 - Green (OK)
  ];

  const get_color = (data) => {
   
    if(!data)
    {
      return;
    }

    if(typeof data.cantidad === 'undefined')
    {
      //alert(JSON.stringify(data))
      return;
    }

    const { cantidad, stock_ideal, stock_critico } = data;

    if (gridType == "pedido") {
      return cantidad > 0
        ? "#ff5c33ff"
        : cantidad < 0
        ? "#ffffffff"
        : "#fcd3d3ff";
    }
    const qtty =
      gridType === "ideal"
        ? +stock_ideal
        : gridType === "critico"
        ? +stock_critico
        : +cantidad;

    if (gridType == "critico" || gridType == "ideal") {
      return qtty > 0 ? "#57aeffff" : "#ffffff";
    }

    let _stock_ideal = stock_ideal;

    let _stock_critico = stock_critico;

    if (gridType == "stock") {
      _stock_ideal =
        stock_ideal <= stock_critico
          ? stock_critico + alertColors.length
          : stock_ideal;
    }

    const q1 =
      qtty - _stock_critico > _stock_ideal - _stock_critico
        ? _stock_ideal - _stock_critico
        : qtty - _stock_critico < 1
        ? 0
        : qtty - _stock_critico;

    const idx = parseInt(
      q1 * (alertColors.length / (_stock_ideal - _stock_critico))
    );

    if (idx > alertColors.length - 1) {
      return alertColors[alertColors.length - 1];
    }

    return alertColors[idx];
  };

  const load = (callback) => {
    let endpoint =
      gridType === "uso" ? post.obtener_grilla_uso : post.obtener_grilla_stock;
    //alert(endpoint)
    //alert(JSON.stringify({ idsubgrupo: idsubgrupo, idsucursal: idsucursal, eje: "-1", mes: mes||"-1", anio: anio||"-1" }))
    post_method(
      endpoint,
      {
        idsubgrupo: idsubgrupo,
        idsucursal: idsucursal,
        eje: "-1",
        mes: mes || "-1",
        anio: anio || "-1",
      },
      (response) => {
        //alert(JSON.stringify(response));
        let t_ejes = {};
        let _ejes = [];

        let _min_esf_neg = 9999;
        let _max_esf_neg = -99999;
        let _min_esf_pos = 9999;
        let _max_esf_pos = -99999;

        let _min_cil_neg = 99999;
        let _max_cil_neg = -99999;
        let _min_cil_pos = 99999;
        let _max_cil_pos = -99999;

        let qtties = {};
        response.data.forEach((c) => {
          if(c.esf<0)
            {
              _max_esf_neg =
                parseFloat(c.esf) > _max_esf_neg ? parseFloat(c.esf) : _max_esf_neg;
              _min_esf_neg =
                parseFloat(c.esf) < _min_esf_neg ? parseFloat(c.esf) : _min_esf_neg;

              _min_cil_neg =
                parseFloat(c.cil) < _min_cil_neg ? parseFloat(c.cil) : _min_cil_neg;
              _max_cil_neg =
                parseFloat(c.cil) > _max_cil_neg ? parseFloat(c.cil) : _max_cil_neg;
            } 
          else{
              _max_esf_pos =
              parseFloat(c.esf) > _max_esf_pos ? parseFloat(c.esf) : _max_esf_pos;
              _min_esf_pos =
              parseFloat(c.esf) < _min_esf_pos ? parseFloat(c.esf) : _min_esf_pos;

              _min_cil_pos =
              parseFloat(c.cil) < _min_cil_pos ? parseFloat(c.cil) : _min_cil_pos;
              _max_cil_pos =
              parseFloat(c.cil) > _max_cil_pos ? parseFloat(c.cil) : _max_cil_pos;
          }

            

          qtties[`${parseFloat(c.esf) * 100}${parseFloat(c.cil) * 100}`] = {
            cantidad:
              gridType === "ideal"
                ? c.stock_ideal
                : gridType === "critico"
                ? c.stock_critico
                : gridType === "pedido"
                ? +c.stock_ideal - +c.cantidad
                : c.cantidad,
            codigo: c.codigo,
            idcodigo: c.idcodigo,
            stock_ideal: +c.stock_ideal,
            stock_critico: +c.stock_critico,
            checked: false,
          };
        });
        if (_min_esf_neg > 1000 || _max_esf_neg < -1000) return;
        if (_min_cil_neg > 1000 || _max_cil_neg < -1000) return;

       // alert(JSON.stringify({_min_esf: _min_esf_neg, _max_esf: _max_esf_neg, _min_cil: _min_cil_neg, _max_cil: _max_cil_neg}));
        setCodesDict(qtties);
        setDataPositive(
          prepare(Math.abs(_min_esf_pos), Math.abs(_max_esf_pos),  Math.abs(_max_cil_pos) ,Math.abs(_min_cil_pos), "+", "-")
        );

        setDataNegative(
          prepare(Math.abs(_max_esf_neg), Math.abs(_min_esf_neg),  Math.abs(_max_cil_neg) ,Math.abs(_min_cil_neg), "-", "-")
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
    padding: "0px",
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

  const prepare = (start_from_esf, max_esf, start_from_cil ,max_cil, sign_esf, sign_cil) => {
    const rowdata = [];
    for (let i = start_from_esf; i <= max_esf; i += 0.25) {
      const row = [];
      for (let j = start_from_cil; j <= max_cil; j += 0.25) {
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
                      <div style={cell_content}>ESF\CIL</div>
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
                        style={{
                          ...cell_content,
                          backgroundColor: get_color(
                            codesDict[
                              `${parseFloat(cell.esf) * 100}${
                                parseFloat(cell.cil) * 100
                              }`
                            ]
                          ),
                          fontWeight: "600",
                          color: "black",
                        }}
                      >
                        {"undefined" ===
                        typeof codesDict[
                          `${parseFloat(cell.esf) * 100}${
                            parseFloat(cell.cil) * 100
                          }`
                        ] ? (
                          <></>
                        ) : modoSeleccionMultiple ? (
                          <>
                            <Checkbox
                              onChange={(e) => {
                                const __idx = `${parseFloat(cell.esf) * 100}${
                                  parseFloat(cell.cil) * 100
                                }`;
                                const o1 = {
                                  ...codesDict[__idx],
                                  checked: e.target.checked,
                                };
                                setCodesDict((_cd) => ({
                                  ..._cd,
                                  [__idx]: o1,
                                }));
                              }}
                            >
                              {
                                codesDict[
                                  `${parseFloat(cell.esf) * 100}${
                                    parseFloat(cell.cil) * 100
                                  }`
                                ]?.cantidad
                              }
                            </Checkbox>
                          </>
                        ) : (
                          <>
                            {
                              codesDict[
                                `${parseFloat(cell.esf) * 100}${
                                  parseFloat(cell.cil) * 100
                                }`
                              ]?.cantidad
                            }
                            <Dropdown
                              menu={{
                                items: [
                                  {
                                    key: "1",
                                    label: "Detalle",
                                  },
                                  {
                                    key: "2",
                                    label: "Editar",
                                    disabled: editarDisabled ?? false,
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
                          </>
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

  const prepareCSV = () => {
    const data = [];
    const row0 = [];
    src[0].forEach((_) => {
      row0.push();
    });
    data.push(row0);

    src.forEach((row) => {
      const row1 = [];
      //push esf
      row1.push();
      row.forEach((cell) => {
        //push
        row1.push();
      });
      data.push(row1);
    });
  };

  return (
    <div
      style={{
        border: "1px solid #c0c0c0ff",
        borderRadius: "8px",
        padding: "4px",
        backgroundColor: "#e2e2e2ff",
      }}
    >
      <Row style={{ padding: "16px" }} gutter={16}>
        <Col>
          <DetalleSubgrupo idsubgrupo={idsubgrupo} />
        </Col>
        <Col>
          <Checkbox
            disabled
            onChange={(_) => {
              setModoSeleccionMultiple(!modoSeleccionMultiple);
            }}
            value={modoSeleccionMultiple}
          >
            Modo Selecci&oacute;n
          </Checkbox>
        </Col>
        <Col>
          <ExportToExcel2
            disabled
            buttonSize={"small"}
            buttonType="link"
            buttonStyle={{ color: "#008132ff", fontWeight: "bolder" }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Collapse
            size="small"
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
    </div>
  );
};

export default CodeGridHTML;
