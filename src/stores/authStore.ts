import { defineStore } from "pinia";
import { ref } from "vue";

import { useApi } from "@/composables/useApi";

interface AuthLogin {
  email: string;
  password: string;
  remember: boolean;
}

interface AuthRegister {
  name: string;
  email: string;
  password: string;
}

interface User {
  email: string;
  name: string;
}

const { post } = useApi();

export const useAuthStore = defineStore("auth", () => {
  const isLoggedIn = ref<boolean>(false);
  const user = ref<User>();

  const login = async (form: AuthLogin) => {
    try {
      const response = await post("/user/login", {
        email: form.email,
        password: form.password,
        confirmPassword: form.password,
      });

      const { success, token: getToken, user: getUser } = response;

      if (!success) {
        throw new Error("Failed to Login, Username or Password is wrong");
      }

      user.value = {
        email: getUser.email,
        name: getUser.name,
      };

      isLoggedIn.value = true;

      localStorage.setItem("token", getToken);

      return {
        success,
        message: "Login Successfully",
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Login Failed",
      };
    }
  };

  const register = async (form: AuthRegister) => {
    try {
      const response = await post("/user/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        confirmPassword: form.password,
      });

      const { success } = response;

      if (!success) {
        throw new Error("Failed to Register");
      }

      return {
        success,
        message: "Register Successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Register Failed",
      };
    }
  };

  const logout = () => {
    user.value = {
      email: "",
      name: "",
    };

    isLoggedIn.value = false;

    localStorage.removeItem("token");
  };

  return { isLoggedIn, login, logout, register, user };
});
