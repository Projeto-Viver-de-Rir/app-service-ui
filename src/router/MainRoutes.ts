const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: false
    },
    redirect: '/main',
    component: () => import('@/layouts/public/index.vue'),
    children: [
        {
            name: 'Starter',
            path: '/',
            component: () => import('@/views/Index.vue')
        }
    ]
};

export default MainRoutes;
