const eventsRoutes = {
  path: "/events",
  meta: {
    requiresAuth: true,
  },
  redirect: "/main",
  component: () => import("@/layouts/full/FullLayout.vue"),
  children: [
    {
      name: "ListEvents",
      path: "/events",
      component: () => import("@/views/events/List.vue"),
    },
    {
      name: "DetailtEvent",
      path: "/events/Detalhes/:id",
      component: () => import("@/views/events/Detail.vue"),
    },
    {
      name: "CreateEvent",
      path: "/events/Adicionar",
      component: () => import("@/views/events/Detail.vue"),
    },
    {
      name: "ManageVolunteers",
      path: "/events/Detalhes/:id/Voluntarios",
      component: () => import("@/views/events/ManageVolunteers.vue"),
    },
    {
      name: "FinishVisit",
      path: "/events/Detalhes/:id/Concluir",
      component: () => import("@/views/events/FinishVisit.vue"),
    },
  ],
};

export default eventsRoutes;
