export const routes = [
  { path: "/", redirect: "/dashboard" },
  {
    path: "/",
    component: () => import("@/layouts/default.vue"),
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard.vue"),
        meta: {
          requiresAuth: true,
          breadcrumb: "Dashboard",
        },
      },
      {
        path: "quran",
        name: "quran",
        component: () => import("@/views/quran/index.vue"),
        meta: {
          requiresAuth: true,
          breadcrumb: "Quran",
        },
      },
      {
        path: "quran/:id",
        name: "quran.show",
        component: () => import("@/views/quran/show.vue"),
        meta: {
          requiresAuth: true,
          breadcrumb: "Quran Detail",
        },
      },
      {
        path: "progress",
        name: "progress.index",
        component: () => import("@/views/progress/index.vue"),
        meta: {
          requiresAuth: true,
          breadcrumb: "Quran Detail",
        },
      },
      {
        path: "account-settings",
        name: "account-settings",
        component: () => import("@/views/account-settings.vue"),
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
        component: () => import("@/views/auth/login.vue"),
        meta: {
          guest: true,
        },
      },
      {
        path: "register",
        name: "register",
        component: () => import("@/views/auth/register.vue"),
        meta: {
          guest: true,
        },
      },
      {
        path: "/:pathMatch(.*)*",
        component: () => import("@/views/[...error].vue"),
      },
    ],
  },
];
