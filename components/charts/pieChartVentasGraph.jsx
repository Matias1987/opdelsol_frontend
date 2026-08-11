import { useEffect, useState, useRef } from "react";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import {
  Input,
  Breadcrumb,
  Alert,
  Card,
  Col,
  Button,
  Row,
  Flex,
  Table,
} from "antd"; // Added Alert to handle leaf nodes gracefully
import Chart from "react-google-charts";
import TablaVentasPorProducto from "../etc/tablaVentasPorProducto";

const PieChartVentasGraph = () => {
  const [currentParentCat, setCurrentParentCat] = useState(null);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [cantMeses, setCantMeses] = useState(1);
  const [cantMesesCurrent, setCantMesesCurrent] = useState(1);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [chartId, setChartId] = useState(1);
  const currentParentCatRef = useRef(null);

  useEffect(() => {
    currentParentCatRef.current = currentParentCat;
  }, [currentParentCat]);

  const get_array = (src) =>
    src.map((r) => [{ v: r.id, f: r.label }, r.cantidad]);

  const headers = [
    { type: "string", label: "Label" },
    { type: "number", label: "Quantity" },
  ];

  const prepare = (src) => {
    let result = { children: [], parent: null, label: "Inicio", id: -1 };
    src.forEach((row) => {
      let f = result.children.find((r) => +r.id == +row.idfamilia);

      if (f) {
        f.cantidad = +f.cantidad + +row.qtty;
      } else {
        f = {
          cantidad: parseInt(row.qtty),
          label: row.nf,
          id: row.idfamilia,
          children: [],
          parent: result,
        };
        result.children.push(f);
      }

      let sf = f.children.find((r) => +r.id == +row.idsubfamilia);

      if (sf) {
        sf.cantidad = +sf.cantidad + +row.qtty;
      } else {
        sf = {
          cantidad: parseInt(row.qtty),
          label: row.nsf,
          id: row.idsubfamilia,
          children: [],
          parent: f,
        };
        f.children.push(sf);
      }

      let g = sf.children.find((r) => +r.id == +row.idgrupo);

      if (g) {
        g.cantidad = +g.cantidad + +row.qtty;
      } else {
        g = {
          cantidad: parseInt(row.qtty),
          label: row.ng,
          id: row.idgrupo,
          children: [],
          parent: sf,
        };
        sf.children.push(g);
      }

      let sg = g.children.find((r) => +r.id == +row.idsubgrupo);

      if (sg) {
        sg.cantidad = +sg.cantidad + +row.qtty;
      } else {
        sg = {
          cantidad: parseInt(row.qtty),
          label: row.nsg,
          id: row.idsubgrupo,
          children: [],
          parent: g,
        };
        g.children.push(sg);
      }

      let c = sg.children.find((r) => +r.id == +row.idcodigo);

      if (c) {
        c.cantidad = +c.cantidad + +row.qtty;
      } else {
        c = {
          cantidad: parseInt(row.qtty),
          label: row.cod,
          id: row.idcodigo,
          // Explicitly giving leaf nodes an empty array or undefined for checking
          children: null,
          parent: sg,
        };
        sg.children.push(c);
      }
    });

    return result;
  };

  const onChange = (dir, child_id, _data) => {
    const activeParent = currentParentCatRef.current;

    let src = [];
    let obj = null;

    if ("UP" === dir) {
      obj = activeParent ? activeParent.parent : activeParent;
    } else {
      obj = activeParent
        ? activeParent.children.find((r) => r.id == child_id)
        : _data;
    }

    if (obj) {
      // 1. Safety Guard: Check if the selected node has nested items to display
      if (obj.children && obj.children.length > 0) {
        src = [headers, ...get_array(obj.children)];
        setCurrentParentCat({ ...obj });
        setCurrentData(src);
      } else {
        // 2. Leaf Node fallback: Keep the current view intact but track the final item info
        // contextually if you need to display details about this final category level.
        setCurrentParentCat({ ...obj });
      }
    }
  };

  const handleBreadcrumbClick = (targetNode) => {
    if (targetNode.id === -1) {
      // ✅ Correctly reset back to the absolute root level (Inicio)
      const src = [headers, ...get_array(data.children)];
      setCurrentParentCat({ ...data });
      setCurrentData(src);
    } else {
      // Create data array from targetNode children
      const src = [headers, ...get_array(targetNode.children)];
      setCurrentParentCat({ ...targetNode });
      setCurrentData(src);
    }
  };

  const getBreadcrumbs = () => {
    const trail = [];
    let current = currentParentCat;

    while (current) {
      trail.push(current);
      current = current.parent;
    }

    return trail.reverse();
  };

  useEffect(() => {
    setCurrentParentCat(null);
    setCurrentData(null);

    post_method(
      post.total_ventas_categorias_periodo,
      { cantMeses: cantMesesCurrent },
      (response) => {
        const _data = prepare(response.data);
        setData(_data);
        onChange("D", -1, _data);
        setBtnDisabled(false);
        setChartId(chartId + 1);
      },
    );
  }, [cantMesesCurrent]);

  const onCategoryClick = ({ chartWrapper }) => {
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();
    if (selection.length === 0) return;
    const row = selection[0].row;
    if (row == null) return;
    const dataTable = chartWrapper.getDataTable();
    const id = dataTable.getValue(row, 0);
    onChange("D", id, data);
  };

  const breadcrumbItems = getBreadcrumbs();

  // 3. Determine if we are parked on a deep endpoint item
  const isLeafNode =
    currentParentCat &&
    (!currentParentCat.children || currentParentCat.children.length === 0);

  const options = {
    title: "Ventas por categoria",
    pieHole: 0.4, // Creates a Donut Chart. Does not do anything when is3D is enabled
    is3D: true, // Enables 3D view
    // slices: {
    //   1: { offset: 0.2 }, // Explodes the second slice
    // },
    pieStartAngle: 0, // Rotates the chart
    sliceVisibilityThreshold: 0.02, // Hides slices smaller than 2%
    legend: {
      position: "right",
      alignment: "center",
      textStyle: {
        color: "#233238",
        fontSize: 14,
      },
    },
    //colors: ["#8AD1C2", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A"],
  };

  return currentData ? (
    <Card
      title={
        <>
          Ventas por categoría durante los &uacute;ltimos {cantMesesCurrent}{" "}
          meses. &nbsp;
        </>
      }
      extra={
        <Input
          size="small"
          type="number"
          value={cantMeses}
          onChange={(e) => {
            setCantMeses(parseInt(e.target.value) || 1);
            setBtnDisabled(false);
          }}
          step={1}
          min={1}
          style={{ width: "200px" }}
          addonAfter={
            <>
              Meses{" "}
              <Button
                danger
                type="dashed"
                size="small"
                onClick={(_) => {
                  setBtnDisabled(true);
                  setCantMesesCurrent(cantMeses);
                }}
                disabled={btnDisabled}
              >
                Aplicar
              </Button>
            </>
          }
        />
      }
      size="small"
      style={{ boxShadow: "0px 5px 15px #888888", width: "620px" }}
    >
      <Row style={{ padding: "8px", backgroundColor: "#f3f3f3" }}>
        <Col span={24}>
          <Breadcrumb style={{ fontSize: "14px" }}>
            {breadcrumbItems.map((node, index) => {
              const isLast = index === breadcrumbItems.length - 1;
              return (
                <Breadcrumb.Item key={node.id}>
                  {isLast ? (
                    <strong style={{ color: "#1890ff" }}>{node.label}</strong>
                  ) : (
                    <span
                      style={{
                        cursor: "pointer",
                        color: "rgba(0, 0, 0, 0.45)",
                      }}
                      onClick={() => handleBreadcrumbClick(node)}
                    >
                      {node.label}
                    </span>
                  )}
                </Breadcrumb.Item>
              );
            })}
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {/* 4. Display a friendly message if the user reaches the absolute bottom layer */}
          {isLeafNode ? (
            <div style={{ margin: "20px 0" }}>
              <Alert
                message={`Ventas para: ${currentParentCat.label}`}
                description={`Cantidad: ${currentParentCat.cantidad}`}
                type="info"
                showIcon
              />
              <TablaVentasPorProducto
                idproducto={currentParentCat.id}
                meses={cantMesesCurrent}
              />
            </div>
          ) : (
            <Chart
              chartType="PieChart"
              width="600px"
              height="400px"
              data={currentData}
              options={options}
              chartEvents={[
                {
                  eventName: "select",
                  callback: onCategoryClick,
                },
              ]}
            />
          )}
        </Col>
      </Row>
    </Card>
  ) : (
    <>&#9203; Cargando...</>
  );
};

export default PieChartVentasGraph;
