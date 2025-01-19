<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

interface DetailSurah {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: object;
}

interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audio: object;
  ayat: Array<DetailSurah>;
}

const route = useRoute();
const id: string = route.params.id as string;

const surah = ref<Surah>();
const loading = ref<boolean>(false);

const getData = async (id: string) => {
  try {
    loading.value = true;
    const response = await fetch(`https://equran.id/api/v2/surat/${id}`);
    const json = await response.json();

    surah.value = json.data;

    loading.value = false;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getData(id);
});
</script>

<template>
  <div v-if="loading">
    <VRow>
      <VCol cols="12">
        <VSkeletonLoader class="mx-auto border" type="card"></VSkeletonLoader>
      </VCol>
    </VRow>

    <VRow v-for="index in 8" :key="index">
      <VCol cols="12">
        <VSkeletonLoader
          class="mx-auto border"
          type="list-item-two-line"
        ></VSkeletonLoader>
      </VCol>
    </VRow>
  </div>
  <div v-else>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardItem>
            <VCardTitle>{{ surah?.namaLatin }}</VCardTitle>
            <VCardSubtitle>{{ surah?.arti }}</VCardSubtitle>
          </VCardItem>

          <VCardText>
            <p class="mb-0 text-justify" v-html="surah?.deskripsi"></p>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <VList lines="two">
          <VListItem
            v-for="ayat in surah?.ayat"
            :key="ayat.nomorAyat"
            class="text-right"
          >
            <template v-slot:title>
              <h1 class="my-5 arabic-font">{{ ayat.teksArab }}</h1>
            </template>
            <template v-slot:subtitle>
              <h2 class="mb-0 font-weight-bold">{{ ayat.teksLatin }}</h2>
              <h3 class="mb-0 text-h5">{{ ayat.teksIndonesia }}</h3>
            </template>
          </VListItem>
        </VList>
      </VCol>
    </VRow>
  </div>
</template>
