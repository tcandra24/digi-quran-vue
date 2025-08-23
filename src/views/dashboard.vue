<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useMemoryStore } from "@/stores/memoryStore";
// import AnalyticsAward from "@/components/dashboard/AnalyticsAward.vue";
// import AnalyticsBarCharts from "@/components/dashboard/AnalyticsBarCharts.vue";
// import AnalyticsDepositWithdraw from "@/components/dashboard/AnalyticsDepositWithdraw.vue";
// import AnalyticsSalesByCountries from "@/components/dashboard/AnalyticsSalesByCountries.vue";
// import AnalyticsTotalEarning from "@/components/dashboard/AnalyticsTotalEarning.vue";
// import AnalyticsTotalProfitLineCharts from "@/components/dashboard/AnalyticsTotalProfitLineCharts.vue";
import AnalyticsTransactions from "@/components/dashboard/AnalyticsTransactions.vue";
// import AnalyticsUserTable from "@/components/dashboard/AnalyticsUserTable.vue";
// import AnalyticsWeeklyOverview from "@/components/dashboard/AnalyticsWeeklyOverview.vue";
// import CardStatisticsVertical from "@core/components/cards/CardStatisticsVertical.vue";

// const totalProfit = {
//   title: "Total Profit",
//   color: "secondary",
//   icon: "ri-pie-chart-2-line",
//   stats: "$25.6k",
//   change: 42,
//   subtitle: "Weekly Project",
// };

// const newProject = {
//   title: "New Project",
//   color: "primary",
//   icon: "ri-file-word-2-line",
//   stats: "862",
//   change: -18,
//   subtitle: "Yearly Project",
// };

const memoriesStore = useMemoryStore();
const { memories } = storeToRefs(memoriesStore);

const statistics = ref([
  {
    title: "Memories",
    stats: memories.value.length,
    icon: "ri-memories-line",
    color: "primary",
  },
  {
    title: "Done",
    stats: memories.value.filter((value) => value.done === true).length,
    icon: "ri-check-line",
    color: "success",
  },
  {
    title: "Not Done",
    stats: memories.value.filter((value) => value.done === false).length,
    icon: "ri-close-line",
    color: "error",
  },
  {
    title: "Surah",
    stats: 114,
    icon: "ri-file-list-line",
    color: "info",
  },
]);
</script>

<template>
  <VRow class="match-height">
    <VCol cols="12">
      <!-- <AnalyticsAward /> -->
      <VAlert text="Welcome to DigiQuran" title="Hello" type="info"></VAlert>
    </VCol>

    <VCol cols="12">
      <AnalyticsTransactions :data="statistics" />
    </VCol>

    <!-- <VCol cols="12" md="4">
      <AnalyticsWeeklyOverview />
    </VCol>

    <VCol cols="12" md="4">
      <AnalyticsTotalEarning />
    </VCol>

    <VCol cols="12" md="4">
      <VRow class="match-height">
        <VCol cols="12" sm="6">
          <AnalyticsTotalProfitLineCharts />
        </VCol>

        <VCol cols="12" sm="6">
          <CardStatisticsVertical v-bind="totalProfit" />
        </VCol>

        <VCol cols="12" sm="6">
          <CardStatisticsVertical v-bind="newProject" />
        </VCol>

        <VCol cols="12" sm="6">
          <AnalyticsBarCharts />
        </VCol>
      </VRow>
    </VCol>

    <VCol cols="12" md="4">
      <AnalyticsSalesByCountries />
    </VCol>

    <VCol cols="12" md="8">
      <AnalyticsDepositWithdraw />
    </VCol>

    <VCol cols="12">
      <AnalyticsUserTable />
    </VCol> -->
  </VRow>
</template>
