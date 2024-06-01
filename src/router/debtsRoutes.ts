const debtsRoutes = {
    path: '/Mensalidades',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'ListDebt',
            path: '/Mensalidades',
            component: () => import('@/views/debts/List.vue')
        },
        {
            name: 'DetailtDebt',
            path: '/Mensalidades/Detalhes/:id',
            component: () => import('@/views/debts/Edit.vue')
        },
    ]
};

export default debtsRoutes;