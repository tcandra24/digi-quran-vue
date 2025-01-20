<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";

import { useMemoryStore } from "@/stores/memoryStore";

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

const store = useMemoryStore();
const { save } = store;

const route = useRoute();
const id: string = route.params.id as string;

const surah = ref<Surah>();
const loading = ref<boolean>(false);

const scrollEnd = ref(null);
let observer: any = null;

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

const markAsRead = (ayat: number) => {
  console.log(ayat);
  save({
    surah: +id,
    ayat,
  });
};

onMounted(async () => {
  await getData(id);

  if (surah.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            const ayat: string = id.split("-")[1];
            markAsRead(+ayat);
          }
        });
      },
      { root: null, threshold: 0.1 }
    );

    surah.value.ayat.forEach((ayat: DetailSurah) => {
      const element = document.getElementById(`ayat-${ayat.nomorAyat}`);
      if (element) observer.observe(element);
    });

    if (scrollEnd.value) {
      observer.observe(scrollEnd.value);
    }
  }
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
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
        <VList lines="three">
          <VListItem
            v-for="ayat in surah?.ayat"
            :key="ayat.nomorAyat"
            class="text-right"
            :id="'ayat-' + ayat.nomorAyat"
          >
            <template v-slot:prepend>
              <h3 class="px-10">{{ ayat.nomorAyat }}</h3>
            </template>
            <template v-slot:title>
              <h1 class="my-5 arabic-font text-wrap line-height-normal">
                {{ ayat.teksArab }}
              </h1>
            </template>
            <template v-slot:subtitle class="custom-line">
              <p class="mb-2 font-weight-bold text-h5 text-justify">
                {{ ayat.teksLatin }}
              </p>
              <p class="mb-2 text-h5 text-justify">{{ ayat.teksIndonesia }}</p>
            </template>
          </VListItem>
          <div ref="scrollEnd" id="scroll-end"></div>
        </VList>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>
.line-height-normal {
  line-height: normal;
}

.custom-line {
  line-clamp: unset !important;
}
</style>
