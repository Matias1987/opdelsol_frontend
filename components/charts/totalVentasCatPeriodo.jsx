import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Card, Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const TreeMapVentasCategoriaPeriodo = ({ reload }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cantMeses, setCantMeses] = useState(1);
  const [cantMesesCurrent, setCantMesesCurrent] = useState(1);
  const [btnDisabled, setBtnDisabled] = useState(true);
  function cap(value) {
    return Math.min(value, 20); // anything above 10k treated as 10k
  }

  const creation_fnt = (
    src,
    compare_method,
    get_array_method,
    shouldAdd = false,
  ) => {
    let result_array = [];

    src.forEach((row) => {
      const e_row = result_array.find((__r) => compare_method(__r, row));
      if (e_row) {
        //update
        if (shouldAdd) {
          result_array = result_array.map((_r) =>
            compare_method(_r, row)
              ? [_r[0], _r[1], _r[2] + +row.qtty, cap(_r[2] + +row.qtty)]
              : _r,
          );
        }
        return;
      }

      result_array.push(get_array_method(row));
    });
    return result_array;
  };


  const obtener_array_final = (src) => {
    const header = [
      "Location",
      "Parent",
      "Market trade volume (size)",
      "Color",
    ];
    const root = [{ v: "root", f: "Todos" }, null, 0, 0];

    const familia_part = creation_fnt(
      src,
      (rc, rw) => rc[0].v === "f" + rw.idfamilia,
      (rw) => [{ v: "f" + rw.idfamilia.toString(), f: rw.nf }, "root", 0, 0],
    );

    const subfamilia_part = creation_fnt(
      src,
      (rc, rw) => rc[0].v === "sf" + rw.idsubfamilia,
      (rw) => [
        { v: "sf" + rw.idsubfamilia.toString(), f: rw.nsf },
        "f" + rw.familia_idfamilia.toString(),
        0,
        0,
      ],
    );

    const grupo_part = creation_fnt(
      src,
      (rc, rw) => rc[0].v === "g" + rw.idgrupo,
      (rw) => [
        { v: "g" + rw.idgrupo.toString(), f: rw.ng },
        "sf" + rw.subfamilia_idsubfamilia.toString(),
        0,
        0,
      ],
    );
    const subgrupo_part = creation_fnt(
      src,
      (rc, rw) => rc[0].v === "sg" + rw.idsubgrupo,
      (rw) => [
        { v: "sg" + rw.idsubgrupo.toString(), f: rw.nsg },
        "g" + rw.grupo_idgrupo.toString(),
        0,
        0,
      ],
    );
    const codigo_part = creation_fnt(
      src,
      (rc, rw) => {
        return rc[0].v === "c" + rw.idcodigo.toString();
      },
      (rw) => [
        { v: "c" + rw.idcodigo.toString(), f: rw.cod },
        "sg" + rw.subgrupo_idsubgrupo.toString(),
        +rw.qtty,
        cap(+rw.qtty),
      ],
      true,
    );

    return [
      ...[header],
      ...[root],
      ...familia_part,
      ...subfamilia_part,
      ...grupo_part,
      ...subgrupo_part,
      ...codigo_part,
    ];
  };

  const load = () => {
    setLoading(true);
    post_method(
      post.total_ventas_categorias_periodo,
      { cantMeses },
      (response) => {
         alert(JSON.stringify(response))
        const array_final = obtener_array_final(response.data);
        //const qtties = obtener_array_totales(response.data);
        //alert(JSON.stringify(array_final));
        setData(array_final);
        setLoading(false);
      },
    );
  };

  useEffect(() => {
    load();
  }, [reload]);

  const options = {
    minHighlightColor: "#EB2315",
    midHighlightColor: "#F4CA16",
    maxHighlightColor: "#50C878",
    minColor: "#EB2315",
    midColor: "#F4E293",
    maxColor: "#66FF99",
    minValue: 1,
    maxValue: 20,
    headerHeight: 25,
    fontColor: "black",
    showScale: true,
    useWeightedAverageForAggregation: true,
    highlightOnMouseOver: true,
    maxDepth: 1,
    maxPostDepth: 2,
    allowHtml: true,
    generateTooltip: (row, size, value) => {
      const label = data[row + 1][0].f;
      return `<div style="padding:10px; background-color:white;">
      <b>${label}</b><br />
              Cantidad: ${size}
            </div>`;
    },
  };
  return (
    <>
      <Card
        title={`Ventas por categoría durante los ultimos ${cantMesesCurrent} meses.`}
        style={{ width: "100%", boxShadow: "0px 5px 15px #888888" }}
        size="small"
      >
        {loading ? (
          <>&#9203;</>
        ) : (
          <>
            <Row>
              <Col span={24}>
                <Input
                  type="number"
                  value={cantMeses}
                  onChange={(e) => {setCantMeses(parseInt(e.target.value) || 1); setBtnDisabled(false);}}
                  step={1}
                  min={1}
                  addonBefore="Periodo"
                  style={{ width: "300px" }}
                  addonAfter="Meses"
                />{" "}
                <Button danger type="dashed" size="small" onClick={_=>{load(); setBtnDisabled(true); setCantMesesCurrent(cantMeses);}} disabled={btnDisabled}>
                  Aplicar
                </Button>{" "}
              </Col>
            </Row>

            <Row>
              <Col
                span={24}
                style={{ textAlign: "center", marginBottom: "10px" }}
              >
                <Chart
                  key={loading}
                  chartType="OrgChart"
                  width="100%"
                  height="400px"
                  data={data}
                  options={options}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: "center", marginBottom: "10px", color:"#ff0000", fontWeight:"bold" }}>
                <i>Volver a categoría superior: Click Bot&oacute;n derecho.</i>
              </Col>
            </Row>
          </>
        )}
      </Card>
    </>
  );
};

export default TreeMapVentasCategoriaPeriodo;
