<script lang="ts">
  import ApexCharts from "apexcharts";
  import type { Dayjs } from "dayjs";
  import type { ChartSerie } from "../../lib/types";
  import { getSeriesData } from "../../lib/utils";
  import Divider from "../Divider.svelte";

  let { expenses, cutoff, groupBy } = $props();

  let divChart: HTMLDivElement;
  let apexChart = $state<ApexCharts>();

  const series = $derived(getSeriesData(expenses, cutoff, groupBy));
  const chartConfig = $derived({
    series,
    chart: { type: "bar", height: 320, toolbar: { show: false } },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "80%",
        borderRadius: 4,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    xaxis: { categories: getBarCategories(cutoff, series) },
    tooltip: {
      marker: { show: false },
      x: { show: false },
      y: { formatter: (v: number) => `S/ ${v}` },
    },
  });

  function total(series: ChartSerie[], month: number) {
    return series.reduce((acc, s) => acc + s.data[month], 0);
  }

  function getBarCategories(cutoff: Dayjs, series: ChartSerie[]) {
    return [
      `${cutoff.subtract(2, "M").format("MMM")} S/${total(series, 0)}`,
      `${cutoff.subtract(1, "M").format("MMM")} S/${total(series, 1)}`,
      `${cutoff.format("MMM")} S/${total(series, 2)}`,
    ];
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

<Divider>Last 3 months</Divider>
<div class="card">
  <div bind:this={divChart}></div>
</div>
