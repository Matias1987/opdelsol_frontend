import { useEffect } from "react";
import Chart from "react-google-charts";

const PieChartVentasCategoria = ({ data, onSubcategoriaClick }) => {
  const onCategoryClick = ({ chartWrapper }) => {
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();
    if (selection.length === 0) return;
    const row = selection[0].row;
    if (row == null) return;
    const dataTable = chartWrapper.getDataTable();
    const id = dataTable.getValue(row, 0);
    onSubcategoriaClick(id);
  };

  const topOptions = {
    title: "Top-level Categories",
    pieHole: 0.4,
  };

  return (
    <>
      <Chart
        chartType="PieChart"
        width="600px"
        height="400px"
        data={data}
        // chartEvents lets us capture clicks
        chartEvents={[
          {
            eventName: "select",
            callback: onCategoryClick,
          },
        ]}
      />
    </>
  );
};

export default PieChartVentasCategoria;
