const teamsRoutes = {
  path: "/teams",
  meta: {
    requiresAuth: true,
  },
  redirect: "/main",
  component: () => import("@/layouts/full/FullLayout.vue"),
  children: [
    {
      name: "ListTeams",
      path: "/teams",
      component: () => import("@/views/teams/List.vue"),
    },
    {
      name: "DetailTeams",
      path: "/teams/Detalhes/:id",
      component: () => import("@/views/teams/Edit.vue"),
    },
  ],
};

export default teamsRoutes;
