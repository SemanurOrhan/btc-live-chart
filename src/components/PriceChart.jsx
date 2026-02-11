import ReactApexChart from "react-apexcharts";
import { useMemo } from "react";

const BASE_OPTIONS = {
  chart: {
    type: "area",
    toolbar: { show: false },
    zoom: { enabled: false },
    animations: {
      enabled: false,
      dynamicAnimation: { enabled: false },
    },
    background: "transparent",
  },
  stroke: {
    curve: "straight",
    width: 2,
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.35,
      opacityTo: 0.05,
      stops: [0, 90, 100],
    },
  },
  grid: {
    borderColor: "#1f2937",
    strokeDashArray: 3,
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  },
  xaxis: {
    type: "datetime",
    range: 60000,
    tickAmount: 6,
    labels: {
      style: { colors: "#6b7280", fontSize: "11px" },
      datetimeFormatter: { second: "HH:mm:ss" },
    },
    axisBorder: { show: false },
    axisTicks: { show: false },
    tooltip: { enabled: false },
  },
  yaxis: {
    min: (min) => min - 5,
    max: (max) => max + 5,
    tickAmount: 5,
    labels: {
      minWidth: 80,
      maxWidth: 80,
      style: { colors: "#9ca3af", fontSize: "11px" },
      formatter: (val) => (val != null ? `$${Number(val).toFixed(2)}` : ""),
    },
    opposite: true,
  },
  tooltip: {
    theme: "dark",
    x: { format: "HH:mm:ss" },
    y: {
      formatter: (val) => (val != null ? `$${Number(val).toFixed(2)}` : ""),
    },
  },
  dataLabels: { enabled: false },
  markers: { size: 0 },
};

const COLOR_UP = "#00E396";
const COLOR_DOWN = "#FF4560";
const COLOR_NEUTRAL = "#6b7280";

export default function PriceChart({ chartData, priceChange }) {
  const lineColor =
    priceChange === "up"
      ? COLOR_UP
      : priceChange === "down"
        ? COLOR_DOWN
        : COLOR_NEUTRAL;

  const options = useMemo(
    () => ({ ...BASE_OPTIONS, colors: [lineColor] }),
    [lineColor],
  );

  const series = useMemo(
    () => [{ name: "BTC/USDT", data: chartData }],
    [chartData],
  );

  return (
    <div className="w-full h-full">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height="100%"
      />
    </div>
  );
}
