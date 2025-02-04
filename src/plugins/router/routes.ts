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
      {
        path: "typography",
        name: "typography",
        component: () => import("@/pages/typography.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "icons",
        name: "icons",
        component: () => import("@/pages/icons.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "cards",
        name: "cards",
        component: () => import("@/pages/cards.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "tables",
        name: "tables",
        component: () => import("@/pages/tables.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "form-layouts",
        name: "form-layouts",
        component: () => import("@/pages/form-layouts.vue"),
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
        component: () => import("@/pages/login.vue"),
        meta: {
          guest: true,
        },
      },
      {
        path: "register",
        name: "register",
        component: () => import("@/pages/register.vue"),
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
