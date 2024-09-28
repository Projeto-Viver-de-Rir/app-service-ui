const volunteersRoutes = {
  path: "/volunteers",
  meta: {
    requiresAuth: true,
  },
  redirect: "/main",
  component: () => import("@/layouts/full/FullLayout.vue"),
  children: [
    {
      name: "ListUser",
      path: "/volunteers",
      component: () => import("@/views/volunteers/VolunteersList.vue"),
    },
    {
      name: "VolunteerDetails",
      path: "/volunteers/details/:id",
      component: () => import("@/views/volunteers/VolunteerDetails.vue"),
    },
    {
      name: "DetailtUser",
      path: "/volunteers/Detalhes/:id",
      component: () => import("@/views/volunteers/Detail.vue"),
    },
  ],
};

export default volunteersRoutes;
