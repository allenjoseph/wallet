<script lang="ts">
  import { onMount } from "svelte";
  import ApexCharts from "apexcharts";
  import type { Dayjs } from "dayjs";
  import type { ChartSerie } from "../../lib/types";
  import { getSeriesData } from "../../lib/utils";
  import Divider from "../Divider.svelte";

  let { expenses, cutoff } = $props();

  let chartBar = $state<ApexCharts>();

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

  onMount(() => {
    const series = getSeriesData(expenses, cutoff);
    chartBar = new ApexCharts(document.querySelector("#chart-bar"), {
      series,
      chart: { type: "bar", height: 320, toolbar: { show: false } },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "60%",
          borderRadius: 4,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 8, colors: ["transparent"] },
      xaxis: { categories: getBarCategories(cutoff, series) },
      tooltip: {
        marker: { show: false },
        x: { show: false },
        y: { formatter: (v: number) => `S/ ${v}` },
      },
    });
    chartBar.render();
  });
</script>

<Divider>Last 3 months</Divider>
<div id="chart-bar"></div>
