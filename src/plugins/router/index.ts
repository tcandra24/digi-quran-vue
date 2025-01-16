import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { storeToRefs } from "pinia";
import { routes } from "./routes";

import { useAuthStore } from "@stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useAuthStore();
  const { isLoggedIn } = storeToRefs(store);

  if (isLoggedIn.value) {
    if (to.name === "login" || to.name === "register") {
      next({
        name: "dashboard",
      });

      return;
    }
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isLoggedIn.value) {
      next();

      return;
    }
    next({
      name: "login",
    });
  } else {
    next();
  }
});

export default function (app: App) {
  app.use(router);
}

export { router };
