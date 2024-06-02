const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'Dashboard',
            path: '/Dashboard',
            component: () => import('@/views/Dashboard.vue')
        }
    ]
};

export default MainRoutes;
