<script lang="ts">
  import { onMount } from "svelte";
  import ApexCharts from "apexcharts";
  import Divider from "../components/Divider.svelte";
  import View from "../components/View.svelte";
  import { wallet } from "../lib/state.svelte";
  import ExpenseMonthlyPeriodDay from "../components/expense/ExpenseMonthlyPeriodDay.svelte";
  import type { Expense } from "../lib/types";
  import { getExpenses } from "../lib/backend";
  import dayjs from "dayjs";
  import isBetween from "dayjs/plugin/isBetween";
  dayjs.extend(isBetween);

  type Serie = { name: string; data: number[] };

  let chart = $state<ApexCharts>();

  let cutoff = $state(wallet.monthlyPeriodDay.clone());

  function initSeries(expenses: Expense[]) {
    const categories = expenses.reduce(
      (acc, e) => acc.add(e.category.name),
      new Set<string>()
    );
    return [...categories].map<Serie>((name) => ({ name, data: [0, 0, 0] }));
  }

  function addExpenseInSerie(series: Serie[], expense: Expense, month: number) {
    const serie = series.find((s) => s.name === expense.category.name);
    if (serie) {
      serie.data[month] += Math.trunc(expense.amount);
    }
  }

  function getSeriesData(expenses: Expense[], cutoff: dayjs.Dayjs) {
    const range1 = cutoff.subtract(2, "M");
    const range2 = cutoff.subtract(1, "M");
    const range3 = cutoff;
    const range4 = cutoff.add(1, "M");

    const series = expenses.reduce((acc, e) => {
      const date = dayjs(e.datetime);
      if (date.isBetween(range1, range2, "day", "[)")) {
        addExpenseInSerie(acc, e, 0);
      } else if (date.isBetween(range2, range3, "day", "[)")) {
        addExpenseInSerie(acc, e, 1);
      } else if (date.isBetween(range3, range4, "day", "[)")) {
        addExpenseInSerie(acc, e, 2);
      }
      return acc;
    }, initSeries(expenses));

    return series;
  }

  function total(series: Serie[], month: number) {
    return series.reduce((acc, s) => acc + s.data[month], 0);
  }

  onMount(() => {
    getExpenses(cutoff).then((expenses) => {
      const series = getSeriesData(expenses, cutoff);
      chart = new ApexCharts(document.querySelector("#chart"), {
        series,
        chart: {
          type: "bar",
          height: 320,
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "60%",
            borderRadius: 4,
            borderRadiusApplication: "end",
          },
        },
        dataLabels: { enabled: false },
        stroke: {
          show: true,
          width: 8,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            `${cutoff.subtract(2, "M").format("MMM")} S/${total(series, 0)}`,
            `${cutoff.subtract(1, "M").format("MMM")} S/${total(series, 1)}`,
            `${cutoff.format("MMM")} S/${total(series, 2)}`,
          ],
        },
        tooltip: {
          marker: { show: false },
          x: { show: false },
          y: { formatter: (val: number) => `S/${val}` },
        },
      });
      chart.render();
    });
  });
</script>

<View>
  <Divider>
    <ExpenseMonthlyPeriodDay bind:day={cutoff} />
  </Divider>
  <div id="chart"></div>
</View>
