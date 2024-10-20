const reportsRoutes = {
  path: "/reports",
  meta: {
    requiresAuth: true,
    roles: ["fiscal", "administrative"],
  },
  redirect: "/main",
  component: () => import("@/layouts/full/FullLayout.vue"),
  children: [
    {
      name: "ListNonPayments",
      path: "/reports/non-payment",
      component: () => import("@/views/nonPayments/List.vue"),
    },
    {
      name: "ListAttendancy",
      path: "/reports/attendancy",
      component: () => import("@/views/presences/List.vue"),
    },
  ],
};

export default reportsRoutes;
