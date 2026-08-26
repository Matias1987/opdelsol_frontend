import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Card } from "antd";
import { useEffect, useState } from "react";
import Chart from "react-google-charts";

const DonutEgresoCategoria = ({ idsucursal, reload }) => {
  const [dataEgresos, setDataEgresos] = useState([]);
  const load = () => {
    post_method(post.inf_monto_eg_cat, { idsucursal }, (response) => {
      setDataEgresos([
        [
          ...[
            { type: "string", label: "Tipo" },
            { type: "number", label: "Monto" },
          ],
        ],
        ...response.data.map((r) => [
          { v: r.tipo, f: r.nombre },
          parseFloat(r.amnt),
        ]),
      ]);
    });
  };
  useEffect(() => {
    load();
  }, [reload]);
  return (
    <Card
      size="small"
      title="Egresos por categoría - Mes"
      style={{
        borderRadius: "8px",
        boxShadow: "2px 2px 3px 0px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Chart
        chartType="PieChart"
        data={dataEgresos}
        options={{
          pieHole: 0.4,

          //colors: ["#FF8042", "#ff4f42"],
        }}
        width={"360px"}
        height={"200px"}
      />
    </Card>
  );
};

export default DonutEgresoCategoria;
