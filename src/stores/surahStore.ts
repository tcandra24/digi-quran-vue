import { defineStore } from "pinia";
import { ref } from "vue";
import { useApi } from "@/composables/external/useApi";

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

const { get } = useApi();

const BASE_URL = import.meta.env.VITE_EXERNAL_API_URL;

export const useSurahStore = defineStore("surah", () => {
  const allSurah = ref<Surah[]>([]);
  const surah = ref<Surah | null>(null);
  const loading = ref<boolean>(false);

  const getData = async () => {
    try {
      loading.value = true;
      const response = await get(`${BASE_URL}/surat`);

      if (response.code === 200) {
        allSurah.value = response.data;
      }

      loading.value = false;
    } catch (error) {
      console.log(error);
    }
  };

  const showData = async (id: string) => {
    try {
      loading.value = true;
      const response = await get(`${BASE_URL}/surat/${id}`);

      if (response.code === 200) {
        surah.value = response.data;
      }

      loading.value = false;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    surah,
    allSurah,
    loading,
    getData,
    showData,
  };
});
