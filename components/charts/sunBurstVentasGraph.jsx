import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { BoxLegendSvg } from "@nivo/legends";
import { ResponsiveSunburst } from "@nivo/sunburst";
import { Button, Card, Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const SunBurstVentasCategoriaPeriodo = ({ reload }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cantMeses, setCantMeses] = useState(1);
  const [cantMesesCurrent, setCantMesesCurrent] = useState(1);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [legendData, setLegendData] = useState([]);
  // Base seeded color by family
  function getSeededHue(seed) {
    return (seed * 137) % 360; // prime multiplier distributes hues
  }

  // Generate shade variations by depth
  function getColorByDepth(seed, depth) {
    const hue = getSeededHue(seed);
    const saturation = 70; // keep consistent saturation
    const baseLightness = 50;

    // Adjust lightness depending on depth (outer rings lighter)
    const lightness = baseLightness + depth * 10;
    return `hsl(${hue}, ${saturation}%, ${Math.min(lightness, 80)}%)`;
  }
  function buildTree(data) {
    const root = { name: "Global", color: "hsl(200, 70%, 50%)", children: [] };

    data.forEach((row) => {
      // Familia
      let familiaNode = root.children.find((n) => n.id === "f" + row.idfamilia);
      if (!familiaNode) {
        familiaNode = {
          id: "f" + row.idfamilia,
          name: row.nf,
          color: getColorByDepth(row.idfamilia, 0),
          children: [],
        };
        root.children.push(familiaNode);
      }

      // Subfamilia
      let subfamiliaNode = familiaNode.children.find(
        (n) => n.id === "sf" + row.idsubfamilia,
      );
      if (!subfamiliaNode) {
        subfamiliaNode = {
          id: "sf" + row.idsubfamilia,
          name: row.nsf,
          color: getColorByDepth(row.idfamilia, 1),
          children: [],
        };
        familiaNode.children.push(subfamiliaNode);
      }

      // Grupo
      let grupoNode = subfamiliaNode.children.find(
        (n) => n.id === "g" + row.idgrupo,
      );
      if (!grupoNode) {
        grupoNode = {
          id: "g" + row.idgrupo,
          name: row.ng,
          color: getColorByDepth(row.idfamilia, 2),
          children: [],
        };
        subfamiliaNode.children.push(grupoNode);
      }

      // Subgrupo
      let subgrupoNode = grupoNode.children.find(
        (n) => n.id === "sg" + row.idsubgrupo,
      );
      if (!subgrupoNode) {
        subgrupoNode = {
          id: "sg" + row.idsubgrupo,
          name: row.nsg,
          value: parseInt(row.qtty, 10),
          color: getColorByDepth(row.idfamilia, 3),
          //children: [],
        };
        grupoNode.children.push(subgrupoNode);
      }

      // Código (leaf)
      /*subgrupoNode.children.push({
        id: "c" + row.idcodigo,
        name: row.cod, // corrected from row.codigo
        value: parseInt(row.qtty, 10),
        color: getColorByDepth(row.idfamilia, 4),
      });*/
    });

    return root;
  }

  const load = () => {
    setLoading(true);
    post_method(
      post.total_ventas_categorias_periodo,
      { cantMeses },
      (response) => {
        setLoading(false);
        const array_final = buildTree(response.data);
        setData(array_final);
        const legendData = array_final.children.map((child) => ({
          id: child.name,
          label: child.name,
          color: child.color,
        }));
        setLegendData(legendData);
        
      },
    );
  };

  useEffect(() => {
    load();
  }, [reload]);

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
                  onChange={(e) => {
                    setCantMeses(parseInt(e.target.value) || 1);
                    setBtnDisabled(false);
                  }}
                  step={1}
                  min={1}
                  addonBefore="Periodo"
                  style={{ width: "300px" }}
                  addonAfter="Meses"
                />{" "}
                <Button
                  danger
                  type="dashed"
                  size="small"
                  onClick={(_) => {
                    load();
                    setBtnDisabled(true);
                    setCantMesesCurrent(cantMeses);
                  }}
                  disabled={btnDisabled}
                >
                  Aplicar
                </Button>{" "}
              </Col>
            </Row>

            <Row>
              <Col
                span={24}
                style={{ textAlign: "center", marginBottom: "10px" }}
              >
                <div style={{ height: "500px", width: "100%" }}>
                  <ResponsiveSunburst
                    data={data}
                    id="name"
                    value="value"
                    cornerRadius={2}
                    borderWidth={1}
                    borderColor="white"
                    colors={{ datum: "data.color" }}
                    childColor={{
                      from: "color",
                      modifiers: [["brighter", 0.1]],
                    }}
                    enableArcLabels={true}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{
                      from: "color",
                      modifiers: [["darker", 1.4]],
                    }}
                    // Custom Tooltip (Current Item Label and Quantity)
                    tooltip={({ id, value }) => (
                      <div
                        style={{
                          padding: "8px 12px",
                          background: "#fff",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                          fontFamily: "Arial, sans-serif",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        <strong>Item:</strong> {id} <br />
                        <strong>Cantidad:</strong> {value}
                      </div>
                    )}
                    layers={[
                      "arcs",
                      "arcLabels",
                      ({ width, height }) => (
                        <BoxLegendSvg
                          data={legendData}
                          containerWidth={width}
                          containerHeight={height}
                          anchor="bottom-left" // Positions legend in the bottom left
                          direction="column" // Stack legend keys vertically
                          justify={false}
                          translateX={20} // X offset positioning
                          translateY={-20} // Y offset positioning
                          itemWidth={100}
                          itemHeight={20}
                          itemsSpacing={5}
                          symbolSize={12}
                          symbolShape="square"
                        />
                      ),
                    ]}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col
                span={24}
                style={{
                  textAlign: "center",
                  marginBottom: "10px",
                  color: "#ff0000",
                  fontWeight: "bold",
                }}
              ></Col>
            </Row>
          </>
        )}
      </Card>
    </>
  );
};

export default SunBurstVentasCategoriaPeriodo;
