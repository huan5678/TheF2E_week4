import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Pie, Bar, Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ChartComponent({ data }) {
  switch (data.type) {
    case "line":
      return <Line data={data.data} />;
    case "pie":
      return <Pie data={data.data} />;
    case "bar":
      return <Bar data={data.data} />;
    case "multi":
      return <Chart data={data.data} />;
  }
}

export default ChartComponent;
