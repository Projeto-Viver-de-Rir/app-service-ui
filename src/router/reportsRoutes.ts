const reportsRoutes = {
  path: "/reports",
  meta: {
    requiresAuth: true,
  },
  redirect: "/main",
  component: () => import("@/layouts/full/FullLayout.vue"),
  children: [
    {
      name: "NonPaymentReports",
      path: "/reports/non-payment",
      component: () => import("@/views/reports/NonPaymentReports.vue"),
    },
  ],
};

export default reportsRoutes;
