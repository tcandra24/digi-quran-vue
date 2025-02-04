import { defineStore } from "pinia";
import { ref } from "vue";
import { useDebounceFn } from "@vueuse/core";

interface Memory {
  surah: number;
  name: string;
  ayat: number;
  total: number;
  done: boolean;
}

export const useMemoryStore = defineStore("memory", () => {
  const memories = ref<Memory[]>([]);

  const saveImmediate = ({
    surah,
    name,
    ayat,
    total,
  }: {
    surah: number;
    name: string;
    ayat: number;
    total: number;
  }) => {
    // const token = localStorage.getItem("token");
    // fetch('', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + token
    //   }
    // })

    memories.value = [
      ...memories.value,
      {
        surah,
        name,
        ayat,
        total,
        done: ayat === total ? true : false,
      },
    ];
  };

  const save = useDebounceFn(saveImmediate, 1000);

  return {
    memories,
    save,
  };
});
