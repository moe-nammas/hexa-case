import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./PieChart.scss";

export default function PieChart({ labels, data }) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const dataSet = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: ["#235494", "#efa81b", "#58b84c"],
        borderColor: ["#235494", "#efa81b", "#58b84c"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { animateRotate: true, animateScale: true },
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  return (
    <div className="pie-chart-container">
      <Doughnut data={dataSet} options={options} />
    </div>
  );
}
