const eventsRoutes = {
    path: '/Eventos',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'ListEvents',
            path: '/Eventos',
            component: () => import('@/views/events/list.vue')
        },
        {
            name: 'DetailtEvent',
            path: '/Eventos/Detalhes/:id(\\d+)',
            component: () => import('@/views/events/detail.vue')
        },
        {
            name: 'CreateEvent',
            path: '/Eventos/Adicionar',
            component: () => import('@/views/events/detail.vue')
        },
        {
            name: 'ManageVolunteers',
            path: '/Eventos/Detalhes/:id(\\d+)/Volundarios',
            component: () => import('@/views/events/manageVolunteers.vue')
        },
        {
            name: 'FinishVisit',
            path: '/Eventos/Detalhes/:id(\\d+)/Concluir',
            component: () => import('@/views/events/finishVisit.vue')
        },
    ]
};

export default eventsRoutes;