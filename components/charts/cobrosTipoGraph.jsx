import Chart from "react-google-charts";

const CobrosTipoGraph = props =>{

    const data = [
        ["Sucursal", "Efectivo", "Tarjeta", "Cta. Cte.", "Transferencia", "Mutual","Cheque"],
        ["Alberdi", 50000, 124000,0,100000,2000,0],
        ["Colon", 37000, 36900,100000,0,0,0],
        ["Barranqueras", 26950, 20000,2000000,0,0,0],
        ["Richard", 0, 1953000,0,0,0,0],
        ["Corrientes", 0, 1517000,100000,0,0,10000],
      ];
    
      const options = {
        title: "Cobros Por Tipo y Sucursal",
        chartArea: { width: "50%" },
        isStacked: true,
        hAxis: {
          title: "Monto",
          minValue: 0,
        },
        vAxis: {
          title: "Sucursal",
        },
      };
    
      return (
        <>
          <Chart
            chartType="BarChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
          />
          
        </>
      );
}

export default CobrosTipoGraph;