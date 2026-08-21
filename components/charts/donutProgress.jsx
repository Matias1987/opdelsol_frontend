import { Chart } from 'react-google-charts';

export default function ProgressDonutChart({ percentage = 75 }) {
  // 1. Calculate remaining progress dynamically
  const completed = Math.min(100, Math.max(0, percentage));
  const remaining = 100 - completed;

  // 2. Format data for the pie chart
  const data = [
    ["Task", "Progress"],
    ["Completado", completed],
    ["Faltante", remaining],
  ];

  // 3. Configure options to style it like a progress ring
  const options = {
    pieHole: 0.75, // Creates the donut hole in the center
    pieSliceText: "none", // Hides default text/labels inside the slices
    legend: "none", // Hides the external chart legend
    tooltip: { trigger: "hover" }, // Optional: shows data on hover
    slices: {
      0: { color: "#3498db" }, // Progress color (e.g., vibrant blue)
      1: { color: "#e0e0e0" }, // Background tracking ring color (light gray)
    },
    chartArea: {
      width: "90%",
      height: "90%",
    },
  };

  return (
    <div style={{ position: 'relative', width: '200px', height: '200px' }}>
      <Chart
        chartType="PieChart"
        width="100%"
        height="100%"
        data={data}
        options={options}
      />
      {/* 4. Optional: Overlay a text percentage exactly in the center hole */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#333',
          fontFamily: 'sans-serif',
        }}
      >
        {completed}%
      </div>
    </div>
  );
}
