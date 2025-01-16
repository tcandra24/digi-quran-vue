<script lang="ts" setup>
// import { useApi } from "@/composables/useApi";
import { ref, onMounted } from "vue";

import pages6 from "@images/pages/6.jpg";

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

// const { get } = useApi();
const surah = ref<Surah[]>([]);

const getData = async () => {
  try {
    const response = await fetch("https://equran.id/api/v2/surat");
    const json = await response.json();

    surah.value = json.data;
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
    <VCol lg="3" sm="4" cols="12" v-for="data of surah" :key="data.nomor">
      <VCard>
        <VImg :src="pages6" />

        <VCardItem>
          <VCardTitle>{{ data.namaLatin }}</VCardTitle>
          <VCardSubtitle>{{ data.arti }}</VCardSubtitle>
        </VCardItem>

        <VCardText>
          <p class="mb-0 text-truncate" v-html="data.deskripsi"></p>
        </VCardText>

        <VBtn block class="rounded-t-0"> Read </VBtn>
      </VCard>
    </VCol>
  </VRow>
</template>
