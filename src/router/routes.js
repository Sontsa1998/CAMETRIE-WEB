const routes = [{
        path: '/dashboard',
        component: () =>
            import ('pages/Dashboard.vue')
    },
    {
        path: '/:catchAll(.*)*',
        component: () =>
            import ('pages/Error404.vue')
    },
    {
        path: '/',
        component: () =>
            import ('pages/Login.vue')
    }
]

export default routes