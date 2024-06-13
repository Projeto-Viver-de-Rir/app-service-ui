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
        },
        //Working-groups
        {
            name: 'Dashboard',
            path: '/Dashboard',
            component: () => import('@/views/Dashboard.vue')
        },
        {
            name: 'WorkingGroups-Administrative',
            path: '/working-groups/administrative',
            component: () => import('@/views/workingGroups/Administrative.vue')
        },
        {
            name: 'WorkingGroups-Advisory',
            path: '/working-groups/advisory',
            component: () => import('@/views/workingGroups/Advisory.vue')
        },
        {
            name: 'WorkingGroups-Fiscal',
            path: '/working-groups/fiscal',
            component: () => import('@/views/workingGroups/Fiscal.vue')
        },
        {
            name: 'WorkingGroups-Operational',
            path: '/working-groups/operational',
            component: () => import('@/views/workingGroups/Operational.vue')
        }                              
    ]
};

export default MainRoutes;
