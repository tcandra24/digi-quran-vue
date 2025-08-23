<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useSurahStore } from "@stores/surahStore";

const store = useSurahStore();
const { allSurah, loading } = storeToRefs(store);
const { getData } = store;

onMounted(() => {
  getData();
});
</script>

<template>
  <VRow>
    <VCol
      lg="3"
      sm="4"
      cols="12"
      v-for="index in 16"
      :key="index"
      v-if="loading"
    >
      <VSkeletonLoader
        class="mx-auto border"
        max-width="300"
        type="article"
      ></VSkeletonLoader>
    </VCol>

    <VCol
      lg="3"
      sm="4"
      cols="12"
      v-for="(data, index) of allSurah"
      :key="data.nomor"
      v-else
    >
      <VCard>
        <VImg
          height="200px"
          :lazy-src="`https://picsum.photos/10/6?image=${index * 5 + 10}`"
          :src="`https://picsum.photos/600/500?image=${index * 5 + 10}`"
          cover
        >
          <VRow>
            <VCol cols="12">
              <VChip class="ma-3"> {{ data.tempatTurun }} </VChip>
            </VCol>
          </VRow>
        </VImg>
        <VCardItem>
          <template v-slot:append>
            <p class="text-h4 title-arabic-font">{{ data.nama }}</p>
          </template>
          <VCardTitle>{{ data.namaLatin }}</VCardTitle>
          <VCardSubtitle class="my-2">
            <VChip color="primary" class="m-3"> {{ data.arti }} </VChip>
          </VCardSubtitle>
        </VCardItem>

        <VCardText>
          <p class="mb-0">{{ `Ayat : ${data.jumlahAyat}` }}</p>
        </VCardText>

        <VBtn
          block
          class="rounded-t-0"
          :to="{ name: 'quran.show', params: { id: data.nomor } }"
        >
          Read
        </VBtn>
      </VCard>
    </VCol>
  </VRow>
</template>
