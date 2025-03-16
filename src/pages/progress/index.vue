<script setup lang="ts">
import { ref } from "vue";
import { useMemoryStore } from "@/stores/memoryStore";

const memoriesStore = useMemoryStore();

const { memories, deleteData } = memoriesStore;

const dialog = ref(false);
const selectedId = ref("");

const deleteSurah = () => {
  deleteData(selectedId.value);

  dialog.value = false;
};

const openDialog = (id: string) => {
  dialog.value = true;
  selectedId.value = id;
};
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
            <VBtn
              @click="openDialog(memory._id)"
              icon="ri-delete-bin-line"
              color="error"
              variant="text"
              size="large"
              class="ml-2"
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

      <VDialog v-model="dialog" max-width="400" persistent>
        <VCard
          prepend-icon="ri-questionnaire-line"
          text="Delete Surah From Memories"
          title="Are you sure delete this surah?"
        >
          <template #actions>
            <VSpacer></VSpacer>

            <VBtn @click="deleteSurah"> Yes </VBtn>

            <VBtn @click="dialog = false"> No </VBtn>
          </template>
        </VCard>
      </VDialog>
    </VCol>
  </VRow>
</template>
