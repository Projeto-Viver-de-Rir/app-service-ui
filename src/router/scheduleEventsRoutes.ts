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
      component: () => import("@/views/scheduleEvents/ScheduledEvents.vue"),
    },
    {
      name: "ScheduledEventForm",
      path: "/schedule-events/form/:id?",
      component: () => import("@/views/scheduleEvents/ScheduledEventForm.vue"),
    },
  ],
};

export default scheduleEventsRoutes;
