import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/index.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue'),
    },
    {
        path: '/dashboard',
        component: () => import('../views/dashboard.vue'),
        children: [
            {
                path: 'pluginsList',
                component: () => import('../views/pluginsList.vue'),
            },
        ],
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router