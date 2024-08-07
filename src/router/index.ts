import { createRouter, createWebHistory } from "vue-router";
import MainRoutes from "./MainRoutes";
import AuthRoutes from "./AuthRoutes";
import eventsRoutes from "./eventsRoutes";
import volunteersRoutes from "./volunteersRoutes";
import { useAuthStore } from "@/stores/auth";
import debtsRoutes from "./debtsRoutes";
import scheduleEventsRoutes from "./scheduleEventsRoutes";
import teamsRoutes from "./teamsRoutes";
import configsRoutes from "./configsRoutes";
import MyAreaRoutes from "./MyAreaRoutes";
import type { volunteer } from "@/entities/volunteer";
import AccountRoutes from "./AccountRoutes";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/authentication/Error.vue"),
    },
    MainRoutes,
    AuthRoutes,
    AccountRoutes,
    eventsRoutes,
    volunteersRoutes,
    debtsRoutes,
    scheduleEventsRoutes,
    teamsRoutes,
    configsRoutes,
    MyAreaRoutes,
  ],
});

router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/auth/login"];
  const authRequired = !publicPages.includes(to.path);
  const auth: any = useAuthStore();
  let accessToken = localStorage.getItem("token");

  const user = localStorage.getItem("user");
  let userData: volunteer | null = null;
  if (!!user) {
    userData = JSON.parse(user);
  }

  if (
    to.meta.roles &&
    !to.meta.roles?.some((item) => userData?.permissions?.includes(item))
  ) {
    auth.returnUrl = to.fullPath;
    return next("/auth/login");
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (authRequired && !accessToken) {
      auth.returnUrl = to.fullPath;
      return next("/auth/login");
    } else next();
  } else {
    next();
  }
});
