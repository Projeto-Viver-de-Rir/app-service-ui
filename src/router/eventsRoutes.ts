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
      component: () => import("@/views/events/EventList.vue"),
    },
    {
      name: "EventDetails",
      path: "/events/details/:id",
      component: () => import("@/views/events/EventDetails.vue"),
      beforeEnter: (to: any) => {
        if (!to.params?.id) {
          return { name: 'Dashboard' };
        }
      }
    },
    {
      name: "EventForm",
      path: "/events/form/:id?",
      component: () => import("@/views/events/EventForm.vue"),
    },
  ],
};

export default eventsRoutes;
