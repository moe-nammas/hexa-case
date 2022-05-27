import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./PieChart.scss";

export default function PieChart({ dataSet }) {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const options = {
    responsive: true,
    animation: { animateRotate: true, animateScale: true },
    legend: {
      display: true,
      position: "left",
    },
  };

  return (
    <div className="pie-chart-container">
      <Doughnut data={dataSet} options={options} />
    </div>
  );
}
