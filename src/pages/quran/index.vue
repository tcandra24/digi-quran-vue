<script lang="ts" setup>
import { ref, onMounted } from "vue";

interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audio: object;
}

const surah = ref<Surah[]>([]);
const loading = ref<boolean>(false);

const getData = async () => {
  try {
    loading.value = true;
    const response = await fetch("https://equran.id/api/v2/surat");
    const json = await response.json();

    surah.value = json.data;

    loading.value = false;
  } catch (error) {
    console.log(error);
  }
};

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
      v-for="data of surah"
      :key="data.nomor"
      v-else
    >
      <VCard>
        <VCardItem>
          <template v-slot:append>
            <p class="text-h4 title-arabic-font">{{ data.nama }}</p>
          </template>
          <VCardTitle>{{ data.namaLatin }}</VCardTitle>
          <VCardSubtitle>
            <VBadge color="secondary" :content="data.arti" inline></VBadge>
          </VCardSubtitle>
        </VCardItem>

        <VCardText>
          <p class="mb-0">{{ data.tempatTurun }}</p>
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
