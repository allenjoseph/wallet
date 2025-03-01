<script lang="ts">
  import ApexCharts from "apexcharts";
  import { getSeriesData } from "../../lib/utils";
  import Divider from "../Divider.svelte";

  let { expenses, cutoff, groupBy } = $props();

  let divChart: HTMLDivElement;
  let apexChart = $state<ApexCharts>();

  const series = $derived(getSeriesData(expenses, cutoff, groupBy));
  const chartConfig = $derived({
    series: series.map((s) => s.data[2]), // last month
    chart: { type: "donut", height: 320, toolbar: { show: false } },
    labels: series.map((s) => s.name),
    dataLabels: {
      enabled: true,
      formatter: (v: number) => `${Math.trunc(v)} %`,
      style: { fontSize: "18px" },
    },
    tooltip: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            value: {
              show: true,
              fontSize: "20px",
              formatter: (w: any) => `S/ ${Math.trunc(w)}`,
            },
            total: {
              show: true,
              fontWeight: 600,
              fontSize: "20px",
              formatter: (w: any) => `S/ ${Math.trunc(apexTotal(w))}`,
            },
          },
        },
      },
    },
    legend: { show: true, position: "top" },
  });

  function apexTotal(w: any) {
    return w.globals.seriesTotals.reduce(
      (acc: number, v: number) => (acc += v),
      0
    );
  }

  $effect(() => {
    if (!apexChart) {
      apexChart = new ApexCharts(divChart, chartConfig);
      apexChart.render();
    } else {
      apexChart.updateOptions(chartConfig);
    }
  });
</script>

<Divider>Last month</Divider>
<div class="card">
  <div bind:this={divChart}></div>
</div>
