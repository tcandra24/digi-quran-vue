<script setup lang="ts">
import { useMemoryStore } from "@/stores/memoryStore";

const memoriesStore = useMemoryStore();

const { memories } = memoriesStore;
</script>

<template>
  <VRow>
    <VCol cols="6">
      <VList lines="three" v-if="memories.length > 0">
        <VListItem v-for="(memory, index) in memories" :key="memory.ayat">
          <template #prepend>
            <h3 class="px-5">{{ index + 1 }}</h3>
          </template>

          <VListItemTitle>
            <p class="mb-2 text-h4 text-justify">{{ memory.name }}</p>
          </VListItemTitle>
          <VListItemSubtitle>
            <p class="text-h6">{{ memory.ayat }} / {{ memory.total }}</p>
            <VProgressLinear
              :color="memory.done ? 'success' : 'primary'"
              :model-value="(memory.ayat / memory.total) * 100"
              :height="8"
            ></VProgressLinear>
          </VListItemSubtitle>

          <template #append>
            <VBtn
              v-if="!memory.done"
              :to="{ name: 'quran.show', params: { id: memory.surah } }"
              icon="ri-share-forward-line"
              variant="text"
              size="large"
            ></VBtn>
            <VBtn
              v-else
              icon="ri-check-double-line"
              color="success"
              variant="text"
              size="large"
            ></VBtn>
          </template>
        </VListItem>
      </VList>
      <VAlert
        v-else
        text="You have no memorize quran"
        title="Data Not Found"
        type="error"
      ></VAlert>
    </VCol>
  </VRow>
</template>
