<script lang="ts">
import ApexCharts from "apexcharts";
import type { ExpenseChart } from "../../helpers";

interface Props {
  type: "bar" | "line";
  data: ExpenseChart;
}

let { data, type }: Props = $props();

let chartRef: Record<string, HTMLDivElement> = {};
let apexCharts = $state<Record<string, ApexCharts>>({});

const chartSeries = $derived(data.series);
const chartConfig = $derived({
  series: chartSeries,
  chart: {
    type: type,
    height: 320,
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  plotOptions: {
    ...(type === "bar"
      ? {
          bar: {
            horizontal: false,
            columnWidth: "80%",
            borderRadius: 4,
            borderRadiusApplication: "end",
          },
        }
      : {}),
  },
  dataLabels: {
    enabled: type === "line",
    style: {
      fontSize: "16px",
      fontWeight: "lighter",
    },
  },
  xaxis: { categories: data.categories },
  tooltip: {
    marker: { show: false },
    x: { show: false },
    y: { formatter: (v: number) => `S/ ${v}` },
  },
  colors: data.colors,
  legend: {
    show: true,
    position: "top",
    fontSize: "18px",
    itemMargin: { horizontal: 4, vertical: 4 },
  },
});

$effect(() => {
  if (!apexCharts[type]) {
    apexCharts[type] = new ApexCharts(chartRef[type], chartConfig);
    apexCharts[type].render();
  } else {
    apexCharts[type].updateOptions(chartConfig, false, false);
  }
});
</script>

<div class="card">
  <div class={[type === "bar" ? "block" : "hidden"]}>
    <div bind:this={chartRef.bar}></div>
  </div>
  <div class={[type === "line" ? "block" : "hidden"]}>
    <div bind:this={chartRef.line}></div>
  </div>
</div>
