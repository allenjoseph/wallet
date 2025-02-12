<script lang="ts">
  import { onMount } from "svelte";
  import ApexCharts from "apexcharts";
  import { getSeriesData } from "../../lib/utils";
  import Divider from "../Divider.svelte";

  let { expenses, cutoff } = $props();

  let chartDonut = $state<ApexCharts>();

  function apexTotal(w: any) {
    return w.globals.seriesTotals.reduce(
      (acc: number, v: number) => (acc += v),
      0
    );
  }

  onMount(() => {
    const series = getSeriesData(expenses, cutoff);
    const indexRangeLastMonth = 2;

    chartDonut = new ApexCharts(document.querySelector("#chart-donut"), {
      series: series.map((s) => s.data[indexRangeLastMonth]),
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
    chartDonut.render();
  });
</script>

<Divider>Last month</Divider>
<div id="chart-donut"></div>
