import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Card } from "antd";
import { useEffect, useState } from "react";
import Chart from "react-google-charts";

const DonutIngresoCategoria = ({ idsucursal, reload }) => {
  /*const dataIngresos = [
    ["Tipo", "Monto"],
    ["Ventas", 5000],
    ["Pagos clientes", 3000],
  ];*/

  const [dataIngresos, setDataIngresos] = useState([]);
  const load = () => {
    post_method(post.inf_monto_ing_cat, { idsucursal }, (response) => {
      setDataIngresos([
        [...["Tipo", "Monto"]],
        ...response.data.map((r) => [r.tipo, r.amnt]),
      ]);
    });
  };
  useEffect(() => {
    load();
  }, [reload]);
  return (
    <Card
      title={"Ingresos por tipo - Mes"}
      size="small"
      style={{
        borderRadius: "8px",
        boxShadow: "2px 2px 3px 0px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Chart
        chartType="PieChart"
        data={dataIngresos}
        options={{
          pieHole: 0.4,
          // colors: ["#0088FE", "#00C49F"],
        }}
        width={"360px"}
        height={"200px"}
      />
    </Card>
  );
};

export default DonutIngresoCategoria;
