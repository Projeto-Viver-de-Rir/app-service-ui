import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import eventsRoutes from './eventsRoutes';
import volunteersRoutes from './volunteersRoutes';
import { useAuthStore } from '@/stores/auth';
import debtsRoutes from './debtsRoutes'

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
        debtsRoutes
    ]
});

router.beforeEach(async (to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/auth/login'];
    console.log(to.path)
    const authRequired = !publicPages.includes(to.path);
    const auth: any = useAuthStore();

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        console.log(auth.token);
        if (authRequired && !auth.token) {
            auth.returnUrl = to.fullPath;
            return next('/auth/login');
        } else next();
    } else {
        next();
    }
});
