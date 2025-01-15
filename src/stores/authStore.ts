import { defineStore } from "pinia";
import { ref } from "vue";

import { useApi } from "@/composables/useApi";

import type { AxiosError } from "axios";

interface AuthLogin {
  email: string;
  password: string;
  remember: boolean;
}

interface User {
  email: string;
  name: string;
}

const { post } = useApi();

export const useAuthStore = defineStore("auth", () => {
  const isLoggedIn = ref<boolean>(false);
  const user = ref<User>();
  const token = ref<string>("");

  const login = async (form: AuthLogin) => {
    try {
      const response = await post("/user/login", {
        email: form.email,
        password: form.password,
        confirmPassword: form.password,
      });

      const { success, token: getToken, user: getUser } = response;

      if (!success) {
        throw new Error("Failed to Login, Username or PAssword is wrong");
      }

      user.value = {
        email: getUser.email,
        name: getUser.name,
      };

      token.value = getToken;
      isLoggedIn.value = true;

      console.log("ok");
      // set to localstorage
    } catch (error: any) {
      console.log(error);
    }
  };

  return { isLoggedIn, login, user, token };
});
