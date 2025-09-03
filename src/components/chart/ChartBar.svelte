<script lang="ts">
  import ApexCharts from "apexcharts";
  import { ChartLine, ChartColumn } from "lucide-svelte";
  import Divider from "../Divider.svelte";
  import { ExpenseChartService } from "../../services";
  import Badge from "../badge/Badge.svelte";

  let { expenses, cutoff, groupBy } = $props();

  let barChart: HTMLDivElement;
  let lineChart: HTMLDivElement;

  let apexCharts = $state<Record<string, ApexCharts>>({});

  let chartType = $state<string>("line");
  // let numMonths = $state<number>(3);

  const chart = $derived(new ExpenseChartService(expenses, groupBy, cutoff));
  const chartSeries = $derived(chart.series);
  const chartConfig = $derived({
    series: chartSeries,
    chart: { type: chartType, height: 320, toolbar: { show: false } },
    plotOptions: {
      ...(chartType === "bar"
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
    dataLabels: { enabled: chartType === "line" },
    xaxis: { categories: chart.getBarCategories(cutoff) },
    tooltip: {
      marker: { show: false },
      x: { show: false },
      y: { formatter: (v: number) => `S/ ${v}` },
    },
  });

  $effect(() => {
    if (!apexCharts[chartType]) {
      apexCharts[chartType] = new ApexCharts(barChart, chartConfig);
      apexCharts[chartType].render();
    } else {
      apexCharts[chartType].updateOptions(chartConfig, false, false);
    }
  });
</script>

<Divider>Last months</Divider>
<div class="flex justify-between">
  <div class="flex items-start gap-2 flex-wrap">
    <Badge
      Icon={ChartLine}
      selected={chartType === "line"}
      onclick={() => (chartType = "line")}
    >
      Line
    </Badge>
    <Badge
      Icon={ChartColumn}
      selected={chartType === "bar"}
      onclick={() => (chartType = "bar")}
    >
      Bar
    </Badge>
  </div>
  <!-- <div class="flex items-start gap-2 flex-wrap">
    <Badge selected={numMonths === 3} onclick={() => (numMonths = 3)}>
      3 months
    </Badge>
    <Badge selected={numMonths === 6} onclick={() => (numMonths = 6)}>
      6 months
    </Badge>
  </div> -->
</div>
<div class="card">
  <div bind:this={barChart}></div>
  <div bind:this={lineChart}></div>
</div>
