import { defineStore } from "pinia";
import { ref } from "vue";

export const useSurahStore = defineStore("surah", () => {
  const surah = ref();

  const get = () => {
    //
  };

  return {
    surah,
    get,
  };
});
