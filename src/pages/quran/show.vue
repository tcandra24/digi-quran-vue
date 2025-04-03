<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, shallowRef } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";

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
const router = useRouter();
// const id: string = route.params.id as string;
const id = ref<string | null>(null);

const surah = ref<Surah>();
const loading = ref<boolean>(false);

const open = shallowRef(false);

// const scrollEnd = ref(null);
// let observer: any = null;
let observer: IntersectionObserver | null = null;

const getData = async (id: string) => {
  loading.value = true;

  try {
    const response = await fetch(`https://equran.id/api/v2/surat/${id}`);
    if (!response.ok) throw new Error("Failed to fetch surah data.");

    const json = await response.json();
    if (!json.data) {
      throw new Error("Invalid response format");
    }

    surah.value = json.data;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const markAsRead = (ayat: number, name: string, total: number) => {
  if (id.value) {
    save({
      surah: +id.value,
      name,
      ayat,
      total,
    });
  }
};

const setupObserver = () => {
  if (observer) observer.disconnect(); // Cleanup sebelum membuat observer baru

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const name = target.dataset.name ?? "";
          const total = Number(target.dataset.total) ?? 0;
          const id = target.id;
          const ayat = id.split("-")[1];

          markAsRead(+ayat, name, total);
        }
      });
    },
    { root: null, threshold: 0.1 }
  );

  surah.value?.ayat.forEach((ayat) => {
    const element = document.getElementById(`ayat-${ayat.nomorAyat}`);
    if (element && observer) observer.observe(element);
  });
};

const onLoadContent = async (id: string) => {
  await getData(id);

  if (surah.value) {
    const activeSurah = store.memories.find(
      (element) => surah.value && element.surah === surah.value.nomor
    );
    const surahSaved = surah.value.ayat.find(
      (element) => element.nomorAyat === activeSurah?.ayat
    );

    const surahId = surahSaved ? `#ayat-${surahSaved.nomorAyat}` : "#top-page";
    const element = document.querySelector(surahId);
    element?.scrollIntoView({
      behavior: "smooth",
    });

    setupObserver();
  }
};

onMounted(() => {
  if (typeof route.params.id === "string") {
    id.value = route.params.id;
    onLoadContent(id.value);
  }
});

onBeforeRouteUpdate((to) => {
  if (typeof to.params.id === "string") {
    id.value = to.params.id;
    onLoadContent(id.value);
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
    <VRow id="top-page">
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
        <VList>
          <VListItem
            v-for="ayat in surah?.ayat"
            :key="ayat.nomorAyat"
            class="text-right"
            :id="`ayat-${ayat.nomorAyat}`"
            :data-total="surah?.jumlahAyat"
            :data-name="surah?.namaLatin"
          >
            <template v-slot:prepend>
              <h3 class="px-10">{{ ayat.nomorAyat }}</h3>
            </template>
            <VListItemTitle>
              <h1 class="my-5 arabic-font text-wrap line-height-normal">
                {{ ayat.teksArab }}
              </h1>
            </VListItemTitle>
            <VListItemSubtitle class="custom-line">
              <p class="mb-2 font-weight-bold text-h5 text-justify">
                {{ ayat.teksLatin }}
              </p>
              <p class="mb-2 text-h5 text-justify">
                {{ ayat.teksIndonesia }}
              </p>
            </VListItemSubtitle>
          </VListItem>
          <!-- <div ref="scrollEnd" id="scroll-end"></div> -->
        </VList>
      </VCol>
    </VRow>
    <VFab color="primary" app location="bottom right" size="x-large" icon>
      <VIcon>{{ open ? "ri-close-large-line" : "ri-menu-line" }}</VIcon>
      <VSpeedDial
        v-model="open"
        location="left center"
        transition="slide-y-reverse-transition"
        activator="parent"
      >
        <VBtn
          key="2"
          color="secondary"
          append-icon="ri-arrow-right-line"
          rounded="xl"
          v-if="id && +id < 114"
          :to="{ name: 'quran.show', params: { id: +id + 1 } }"
        >
          Next
        </VBtn>
        <VBtn
          key="2"
          color="secondary"
          rounded="xl"
          icon="ri-book-line"
          :to="{ name: 'quran' }"
        >
        </VBtn>
        <VBtn
          key="1"
          color="secondary"
          prepend-icon="ri-arrow-left-line"
          rounded="xl"
          v-if="id && +id > 1"
          :to="{ name: 'quran.show', params: { id: +id - 1 } }"
        >
          Previous
        </VBtn>
      </VSpeedDial>
    </VFab>
  </div>
</template>

<style scoped>
.line-height-normal {
  line-height: 2.4;
}

.custom-line {
  line-clamp: unset !important;
  -webkit-line-clamp: unset !important;
  white-space: normal;
  overflow: visible;
}
</style>
