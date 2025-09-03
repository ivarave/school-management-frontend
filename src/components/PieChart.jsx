import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../styles/PieChart.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ genderData }) => {
  const data = {
    labels: ["Male", "Female", "Other"],
    datasets: [
      {
        label: "Gender Ratio",
        data: [genderData.male, genderData.female, genderData.other],
        backgroundColor: ["blue", "red", "yellow"],
        borderColor: ["blue", "red", "yellow"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  return (
    <div className="pie-chart-container">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
