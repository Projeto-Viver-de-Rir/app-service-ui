const AccountRoutes = {
  path: "/account",
  component: () => import("@/layouts/blank/BlankLayout.vue"),
  meta: {
    requiresAuth: true,
  },
  redirect: "/auth/login",
  children: [
    {
      name: "Enroll",
      path: "/account/enroll",
      component: () => import("@/views/account/Enroll.vue"),
    },
  ],
  };
  
  export default AccountRoutes;
  