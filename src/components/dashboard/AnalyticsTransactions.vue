<script setup lang="ts">
const statistics = [
  {
    title: "Memories",
    stats: "0",
    icon: "ri-pie-chart-2-line",
    color: "primary",
  },
  {
    title: "Surah",
    stats: "114",
    icon: "ri-group-line",
    color: "success",
  },
];

interface Statistic {
  title: string;
  stats: number;
  icon: string;
  color: string;
}

interface Props {
  data: Statistic[];
}

const props = defineProps<Props>();
</script>

<template>
  <VCard title="Transactions">
    <template #subtitle>
      <p class="text-body-1 mb-0">Your Progress</p>
    </template>
    <VCardText class="pt-1">
      <VRow>
        <VCol
          v-for="item in props.data"
          :key="item.title"
          cols="12"
          sm="6"
          md="3"
        >
          <div class="d-flex align-center gap-x-3">
            <VAvatar :color="item.color" rounded size="40" class="elevation-2">
              <VIcon size="24" :icon="item.icon" />
            </VAvatar>

            <div class="d-flex flex-column">
              <div class="text-body-1">
                {{ item.title }}
              </div>
              <h5 class="text-h5">
                {{ item.stats }}
              </h5>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
