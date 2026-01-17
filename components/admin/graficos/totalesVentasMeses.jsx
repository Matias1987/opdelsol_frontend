import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Card } from "antd";
/*
const data = [
  [
    "MES",
    "ALBERDI",
    "COLON",
    "BARRANQUERAS",
    "CORRIENTES",
    "RICHARD",
    "FONTANA",
    "PARANA",
    "DIST",
    "EDISON"
  ],
  [
    "2025-10",
    166207454,
    24337700,
    37466400,
    24150442,
    27491674,
    12798100,
    1010,
    305370,
    15123780
  ],
  [
    "2025-11",
    122688767,
    21474607,
    34507900,
    21770000,
    27454800,
    10940100,
    0,
    387370,
    13089400
  ],
  [
    "2025-12",
    144926751,
    27386200,
    34246700,
    17227191,
    24926000,
    10534400,
    0,
    111000,
    13662650
  ]
];

const data = [
  ["Year", "Sales", "Expenses"],
  ["2013", 1000, 400],
  ["2014", 1170, 460],
  ["2015", 660, 1120],
  ["2016", 1030, 540],
];*/

function TotalesVentasMeses({ idsucursal, cantMeses = 3 }) {
  const [graphData, setGraphData] = useState([])

  const options = {
    title: `Cantidad de Ventas Ultimos ${cantMeses} Meses`,
    vAxis: { title: "Total" },
    hAxis: { title: "Mes" },
    legend: { position: "top", maxLines: 9, alignment:'start'  },
    
  };

  const process_data = (raw_data) => {
    const chart_data = [];
    let prev_mes = "";
    let mes_data = [];
    raw_data.forEach((record) => {
      if (chart_data.length < 1) {
        chart_data.push([]);
        chart_data[0].push("MES");
      }
      
      if (!chart_data[0].find((h) => h == record.nombre)) {
        chart_data[0].push(record.nombre);
      }

      if (prev_mes != record.mes) {
        if (mes_data.length > 0) {
          chart_data.push(mes_data);
        }

        prev_mes = record.mes;

        mes_data = [record.mes];
      }
      mes_data.push(record.monto);
    });
    chart_data.push(mes_data);
    return chart_data;
  };

  useEffect(()=>{load()}, []);

  const load = () => {
    const url = post.total_ventas_periodo_sucursal;
    post_method(url, { idsucursal: idsucursal, cantMeses: cantMeses }, (response) => {
      setGraphData(process_data(response.data));
    });
  };
  return (
    <Card style={{border:"1px solid #AEB6C7", borderRadius:"8px", boxShadow:"0px 5px 15px #888888"}}>
    <Chart
      chartType="Line"
      width="100%"
      height="200px"
      data={graphData}
      options={options}

    />
    </Card>
  );
}

export default TotalesVentasMeses;
