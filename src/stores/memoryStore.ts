import { defineStore } from "pinia";
import { ref } from "vue";

interface Memory {
  surah: number;
  ayat: number;
  done: boolean;
}

export const useMemoryStore = defineStore("memory", () => {
  const memory = ref<Memory[]>([]);

  const save = ({ surah, ayat }: { surah: number; ayat: number }) => {
    if (isObjectExists(memory.value, surah)) {
      const index = memory.value.findIndex(
        (element) => element.surah === surah
      );
      memory.value[index] = {
        surah,
        ayat,
        done: false,
      };
    } else {
      memory.value = [
        ...memory.value,
        {
          surah,
          ayat,
          done: false,
        },
      ];
    }
  };

  const isObjectExists = (array: Memory[], surah: number): boolean => {
    return !!array.find((element: Memory) => element.surah === surah);
  };

  return {
    memory,
    save,
  };
});
