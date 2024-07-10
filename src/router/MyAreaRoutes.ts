const MyAreaRoutes = {
  path: "/my-area",
  component: () => import("@/layouts/full/FullLayout.vue"),
  meta: {
    requiresAuth: true,
  },
  children: [
    {
      name: "Minhas Mensalidades",
      path: "/personal-debts",
      component: () => import("@/views/PersonalDebts.vue"),
    },
  ],
};

export default MyAreaRoutes;
