const debtsRoutes = {
  path: "/debts",
  meta: {
    requiresAuth: true,
    roles: ["fiscal", "administrative"],
  },
  redirect: "/main",
  component: () => import("@/layouts/full/FullLayout.vue"),
  children: [
    {
      name: "ListDebt",
      path: "/debts",
      component: () => import("@/views/debts/List.vue"),
    },
    {
      name: "DebtDetails",
      path: "/debts/details/:id",
      component: () => import("@/views/debts/Edit.vue"),
      beforeEnter: (to: any) => {
        if (!to.params?.id) {
          return { name: 'Dashboard' };
        }
      }
    },    

  ],
};

export default debtsRoutes;
