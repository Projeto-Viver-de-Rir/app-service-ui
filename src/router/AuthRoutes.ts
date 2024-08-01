const AuthRoutes = {
  path: "/auth",
  component: () => import("@/layouts/blank/BlankLayout.vue"),
  meta: {
    requiresAuth: false,
  },
  children: [
    {
      name: "Starter",
      path: "/",
      component: () => import("@/views/Index.vue"),
    },
    {
      name: "Side Login",
      path: "/auth/login",
      component: () => import("@/views/authentication/SideLogin.vue"),
    },
    {
      name: "Error",
      path: "/auth/404",
      component: () => import("@/views/authentication/Error.vue"),
    },
    {
      name: "Sign Up",
      path: "/participate",
      component: () => import("@/views/authentication/Signup.vue"),
    },
  ],
};

export default AuthRoutes;
