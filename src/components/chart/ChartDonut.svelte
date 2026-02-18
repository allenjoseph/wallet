<script lang="ts">
  import ApexCharts from "apexcharts";
  import type { ExpenseChart } from "../../helpers";

  let { chart }: { chart: ExpenseChart } = $props();

  let divChart: HTMLDivElement;
  let apexChart = $state<ApexCharts>();

  const chartSeries = $derived(chart.series);
  const chartConfig = $derived({
    series: chartSeries.map((s) => s.data[s.data.length - 1]), // last month
    chart: { type: "donut", height: 320, toolbar: { show: false } },
    labels: chart.labels,
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
    legend: {
      show: true,
      position: "right",
      fontSize: "18px",
      itemMargin: { horizontal: 0, vertical: 4 },
    },
    colors: chart.colors,
  });

  function apexTotal(w: any) {
    return w.globals.seriesTotals.reduce(
      (acc: number, v: number) => (acc += v),
      0,
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

<div class="card">
  <div bind:this={divChart}></div>
</div>
