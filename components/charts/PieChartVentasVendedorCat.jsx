import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { useEffect, useState } from "react";
import Chart from "react-google-charts";

const PieChartVentasVendedorCat = ({ idvendedor, reload }) => {
    const [data, setData] = useState(null);

    const headers = [
    { type: "string", label: "Label" },
    { type: "number", label: "Quantity" },
  ];
  const load = () => {
    //alert(post.obtener_cant_vtas_vendedor_cat)
    post_method(
      post.obtener_cant_vtas_vendedor_cat,
      { idvendedor },
      (response) => {
        const _d = [...[headers], ...response.data.map(r=>([{v:r.idfamilia, f:r.f_name},+r.qtty_f]))];
        //alert(JSON.stringify(_d));
        setData(_d);
      },
    );
  };

  useEffect(()=>{load()},[idvendedor, reload])
  /*const data = [
    ["Task", "Hours per Day"],
    ["Work", 9],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];*/

  const options = {
    legend: {
      position: "left",
      alignment: "center",
      textStyle: {
        color: "#233238",
        fontSize: 14,
      },
    },
  };
  return null===data ? <></> : (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"350px"}
      height={"200px"}
    />
  );
};

export default PieChartVentasVendedorCat;
