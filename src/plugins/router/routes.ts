export const routes = [
  { path: "/", redirect: "/dashboard" },
  {
    path: "/",
    component: () => import("@/layouts/default.vue"),
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/pages/dashboard.vue"),
        meta: {
          requiresAuth: true,
          breadcrumb: "Dashboard",
        },
      },
      {
        path: "quran",
        name: "quran",
        component: () => import("@/pages/quran/index.vue"),
        meta: {
          requiresAuth: true,
          breadcrumb: "Quran",
        },
      },
      {
        path: "quran/:id",
        name: "quran.show",
        component: () => import("@/pages/quran/show.vue"),
        meta: {
          requiresAuth: true,
          breadcrumb: "Quran Detail",
        },
      },
      {
        path: "progress",
        name: "progress.index",
        component: () => import("@/pages/progress/index.vue"),
        meta: {
          requiresAuth: true,
          breadcrumb: "Quran Detail",
        },
      },
      {
        path: "account-settings",
        name: "account-settings",
        component: () => import("@/pages/account-settings.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/blank.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/pages/auth/login.vue"),
        meta: {
          guest: true,
        },
      },
      {
        path: "register",
        name: "register",
        component: () => import("@/pages/auth/register.vue"),
        meta: {
          guest: true,
        },
      },
      {
        path: "/:pathMatch(.*)*",
        component: () => import("@/pages/[...error].vue"),
      },
    ],
  },
];
