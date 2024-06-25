const scheduleEventsRoutes = {
  path: "/schedule-events",
  meta: {
    requiresAuth: true,
  },
  redirect: "/main",
  component: () => import("@/layouts/full/FullLayout.vue"),
  children: [
    {
      name: "ListScheduleEvents",
      path: "/schedule-events",
      component: () => import("@/views/scheduleEvents/List.vue"),
    },
    {
      name: "DetailScheduleEvents",
      path: "/schedule-events/Detalhes/:id",
      component: () => import("@/views/scheduleEvents/Edit.vue"),
    },
  ],
};

export default scheduleEventsRoutes;
