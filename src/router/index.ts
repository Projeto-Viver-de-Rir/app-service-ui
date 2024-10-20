import { createRouter, createWebHistory } from "vue-router";
import MainRoutes from "./MainRoutes";
import AuthRoutes from "./AuthRoutes";
import eventsRoutes from "./eventsRoutes";
import volunteersRoutes from "./volunteersRoutes";
import { useAuthStore } from "@/stores/auth";
import debtsRoutes from "./debtsRoutes";
import reportsRoutes from "./reportsRoutes";
import scheduleEventsRoutes from "./scheduleEventsRoutes";
import teamsRoutes from "./teamsRoutes";
import configsRoutes from "./configsRoutes";
import MyAreaRoutes from "./MyAreaRoutes";
import AccountRoutes from "./AccountRoutes";
import type { account } from "@/entities/account";

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
    reportsRoutes,
    scheduleEventsRoutes,
    teamsRoutes,
    configsRoutes,
    MyAreaRoutes,
  ],
});

router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/auth/login", "/participate"];
  const authRequiredRoutes = !publicPages.includes(to.path);

  const auth: any = useAuthStore();
  const accessToken: string | null = localStorage.getItem("token");

  const user = localStorage.getItem("user");
  let userData: account | null = null;
  if (!!user) {
    userData = JSON.parse(user);
  }
  
  const mustEnroll = accessToken && !userData?.volunteer;

  if (
    to.meta.roles &&
    !to.meta.roles?.some((item: string) => userData?.permissions?.includes(item))
  ) {
    auth.returnUrl = to.fullPath;
    return next("/auth/login");
  }

  if (!authRequiredRoutes && mustEnroll) {
    return next("/account/enroll");
  }

  if (!authRequiredRoutes && accessToken) {
    return next("/Dashboard");
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (authRequiredRoutes && !accessToken) {
      auth.returnUrl = to.fullPath;
      return next("/auth/login");
    } else if (authRequiredRoutes && mustEnroll && !to.path.includes('/enroll')) {
      return next("/account/enroll");
    } else if (to.path.includes('/enroll') && !mustEnroll) {
      return next("/Dashboard");
    } else {
      next();
    }
  } else {
    next();
  }
});
