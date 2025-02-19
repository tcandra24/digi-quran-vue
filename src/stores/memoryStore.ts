import { defineStore } from "pinia";
import { ref } from "vue";
import { useDebounceFn } from "@vueuse/core";

interface Memory {
  id: string;
  surah: number;
  name: string;
  ayat: number;
  total: number;
  done: boolean;
}

export const useMemoryStore = defineStore("memory", () => {
  const memories = ref<Memory[]>([]);

  const getData = async () => {
    try {
      const token = localStorage.getItem("token");

      const send = await fetch(
        "https://ejapi.vercel.app/api/website/digi-quran",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const response = await send.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const saveImmediate = async ({
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
    try {
      const token = localStorage.getItem("token");

      const search = memories.value.find(
        (m) => m.surah === surah && m.name === name
      );
      if (search) {
        const send = await fetch(
          `https://ejapi.vercel.app/api/website/digi-quran/${search.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const response = await send.json();
        console.log(response);
      } else {
        const send = await fetch(
          "https://ejapi.vercel.app/api/website/digi-quran",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        const response = await send.json();
        console.log(response);

        memories.value = [
          ...memories.value,
          { surah, name, ayat, total, done: ayat === total },
        ];
      }

      // memories.value = memories.value.some(
      //   (m) => m.surah === surah && m.name === name
      // )
      //   ? memories.value.map((m) =>
      //       m.surah === surah && m.name === name
      //         ? { ...m, ayat, done: ayat === m.total }
      //         : m
      //     )
      //   : [
      //       ...memories.value,
      //       { surah, name, ayat, total, done: ayat === total },
      //     ];
    } catch (error) {
      console.log(error);
    }
  };

  const save = useDebounceFn(saveImmediate, 1000);

  return {
    memories,
    save,
    getData,
  };
});
