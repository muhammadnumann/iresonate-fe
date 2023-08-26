import React from "react";
import { Bar } from "react-chartjs-2";

export interface BudgetBarDataProps {
  yAxisID?: string | number;
  type: string;
  label: string;
  borderColor: string;
  borderWidth: number;
  lineTension?: number;
  fill?: boolean | undefined;
  data: number[];
  backgroundColor?: undefined | string;
}
export interface tooltipItemProps {
  datasetIndex: number;
  index: number;
  label: string;
  value: string;
  x: number;
  xLabel: string;
  y: number;
  yLabel: number;
}
interface optionProps {
  maintainAspectRatio: boolean;
  scales: {
      xAxes: {
          maxBarThickness: string;
          barPercentage: number;
      }[];
      yAxes: {
          ticks: {
              beginAtZero: boolean;
          };
      }[];
  };
  tooltips?: {
      mode: string;
      intersect: boolean;
      callbacks: {
        label:(tooltipItem: tooltipItemProps) => string | any[];
      };
  };
}

interface BudgetBarChartProps {
  labels?: string[];
  data: BudgetBarDataProps[];
  options?: optionProps;
  height?: number;
}
const BarChart = ({ labels, data, options, height }: BudgetBarChartProps) => {
  const dataFinal = {
    labels: labels,
    datasets: data,
  };

  return <Bar height={height} data={dataFinal} options={options} />;
};

export default BarChart;
BarChart.defaultProps = {
  height: 60,
};
