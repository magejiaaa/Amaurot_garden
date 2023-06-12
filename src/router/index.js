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
                name: 'pluginsList',
                component: () => import('../views/pluginsList.vue'),
            },
            {
                path: 'thirdPluginsList',
                name: 'thirdPluginsList',
                component: () => import('../views/thirdPlugin.vue'),
            },
            {
                path: 'user/:uid',
                name: 'user',
                component: () => import('../views/user.vue'),
            },
            {
                path: 'review',
                name: 'review',
                component: () => import('../views/review.vue'),
            },
        ],
    },
    // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
    { 
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/404.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router