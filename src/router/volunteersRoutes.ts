const volunteersRoutes = {
    path: '/Voluntarios',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'ListUser',
            path: '/Voluntarios',
            component: () => import('@/views/volunteers/list.vue')
        },
        {
            name: 'DetailtUser',
            path: '/Voluntarios/Detalhes/:id(\\d+)',
            component: () => import('@/views/volunteers/detail.vue')
        },
    ]
};

export default volunteersRoutes;