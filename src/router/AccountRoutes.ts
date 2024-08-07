const AccountRoutes = {
    path: "/account",
    component: () => import("@/layouts/blank/BlankLayout.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        name: "Enroll",
        path: "/enroll",
        component: () => import("@/views/account/Enroll.vue"),
      },
    ],
  };
  
  export default AccountRoutes;
  