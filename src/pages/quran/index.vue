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
      v-for="index in 8"
      :key="index"
      v-if="loading"
    >
      <VSkeletonLoader
        class="mx-auto border"
        max-width="300"
        type="image, article"
      ></VSkeletonLoader>
    </VCol>

    <VCol
      lg="3"
      sm="4"
      cols="12"
      v-for="(data, index) of surah"
      :key="data.nomor"
      v-else
    >
      <VCard>
        <VImg
          :lazy-src="`https://picsum.photos/10/6?image=${index + 1 * 5 + 10}`"
          :src="`https://picsum.photos/700/300?image=${index + 1 * 5 + 10}`"
        >
          <template v-slot:placeholder>
            <VRow align="center" class="fill-height ma-0" justify="center">
              <VProgressCircular
                color="grey-lighten-5"
                indeterminate
              ></VProgressCircular>
            </VRow>
          </template>
        </VImg>

        <VCardItem>
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
