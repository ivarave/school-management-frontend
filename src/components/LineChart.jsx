import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/LineChart.css"

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LineChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Users Joined",
        data: [5, 10, 8, 15, 20, 25],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.3)",
        tension: 0.3,   
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
    },
  };

  return (
    <div className="line-chart-container" >
        <Line data={data} options={options} />
    </div>
  
  );
};

export default LineChart;
