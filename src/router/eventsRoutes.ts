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
      component: () => import("@/views/events/list.vue"),
    },
    {
      name: "DetailtEvent",
      path: "/events/Detalhes/:id",
      component: () => import("@/views/events/detail.vue"),
    },
    {
      name: "CreateEvent",
      path: "/events/Adicionar",
      component: () => import("@/views/events/detail.vue"),
    },
    {
      name: "ManageVolunteers",
      path: "/events/Detalhes/:id/Voluntarios",
      component: () => import("@/views/events/manageVolunteers.vue"),
    },
    {
      name: "FinishVisit",
      path: "/events/Detalhes/:id/Concluir",
      component: () => import("@/views/events/finishVisit.vue"),
    },
  ],
};

export default eventsRoutes;
