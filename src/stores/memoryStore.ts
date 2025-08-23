import { defineStore } from "pinia";
import { ref } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { useApi } from "@/composables/internal/useApi";

interface Memory {
  _id: string;
  surah: number;
  name: string;
  ayat: number;
  total: number;
  done: boolean;
}

const { get, post, put, destroy } = useApi();

export const useMemoryStore = defineStore("memory", () => {
  const memories = ref<Memory[]>([]);

  const getData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await get("/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "Digi-Quran-Secret": import.meta.env.VITE_SECRET,
        },
      });

      if (response.success) {
        memories.value = response.memories;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      const response = await destroy(`/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "Digi-Quran-Secret": import.meta.env.VITE_SECRET,
        },
      });

      if (response.success) {
        memories.value = response.memories;
      }
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
        (m) => +m.surah === +surah && m.name === name
      );

      if (search) {
        const response = await put(
          `/${search._id}`,
          {
            surah,
            name,
            ayat,
            total,
            done: ayat === total,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
              "Digi-Quran-Secret": import.meta.env.VITE_SECRET,
            },
          }
        );

        if (response.success) {
          memories.value = response.memories;
        }
      } else {
        const response = await post(
          "/",
          {
            surah,
            name,
            ayat,
            total,
            done: ayat === total,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
              "Digi-Quran-Secret": import.meta.env.VITE_SECRET,
            },
          }
        );

        if (response.success) {
          memories.value = response.memories;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const save = useDebounceFn(saveImmediate, 1000);

  return {
    memories,
    save,
    getData,
    deleteData,
  };
});
