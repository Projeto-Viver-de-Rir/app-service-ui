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
      component: () => import("@/views/debts/MonthlyPayments.vue"),
    },
    {
      name: "Profile",
      path: "/personal-profile",
      component: () => import("@/views/account/Profile.vue"),
    },
  ],
};

export default MyAreaRoutes;
