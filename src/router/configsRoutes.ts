const configsRoutes = {
    path: '/configs',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'ListConfigs',
            path: '/configs',
            component: () => import('@/views/configs/List.vue')
        },
        {
            name: 'DetailConfigs',
            path: '/configs/Detalhes/:id',
            component: () => import('@/views/configs/Edit.vue')
        },
    ]
};

export default configsRoutes;