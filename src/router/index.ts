import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import eventsRoutes from './eventsRoutes';
import volunteersRoutes from './volunteersRoutes';
import { useAuthStore } from '@/stores/auth';
import debtsRoutes from './debtsRoutes'
import scheduleEventsRoutes from './scheduleEventsRoutes'
import teamsRoutes from './teamsRoutes'

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/authentication/Error.vue')
        },
        MainRoutes,
        AuthRoutes,
        eventsRoutes,
        volunteersRoutes,
        debtsRoutes,
        scheduleEventsRoutes,
        teamsRoutes
    ]
});

router.beforeEach(async (to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/auth/login'];
    const authRequired = !publicPages.includes(to.path);
    const auth: any = useAuthStore();
    let accessToken = localStorage.getItem("token");

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (authRequired && !accessToken) {
            auth.returnUrl = to.fullPath;
            return next('/auth/login');
        } else next();
    } else {
        next();
    }
});
