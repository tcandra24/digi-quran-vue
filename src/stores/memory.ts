import { defineStore } from "pinia";
import { ref } from "vue";

interface Memory {
  surah: number;
  ayat: number;
  done: boolean;
}

export const useMemoryStore = defineStore("memory", () => {
  const memory = ref<Memory[]>([]);

  return {
    memory,
  };
});
