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
    },    {
      name: "Profile",
      path: "/account/profile",
      component: () => import("@/views/account/Profile.vue"),
    },
  ],
  };
  
  export default AccountRoutes;
  