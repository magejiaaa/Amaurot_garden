import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("../views/index.vue"),
        meta: {
            title: "Dalamud / ff14插件 - 亞馬屋羅提後花園2.0",
        },
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/login.vue"),
        meta: {
            title: "登入 - 亞馬屋羅提後花園2.0",
        },
    },
    {
        path: "/dashboard",
        component: () => import("../views/dashboard.vue"),
        children: [
            {
                path: "pluginsList",
                name: "pluginsList",
                component: () => import("../views/pluginsList.vue"),
                meta: {
                    title: "插件列表 - 亞馬屋羅提後花園2.0",
                },
            },
            {
                path: "pluginsList/:pluginId",
                name: "plugin",
                component: () => import("../views/pluginsList.vue"),
                meta: {
                    title: "插件列表 - 亞馬屋羅提後花園2.0",
                },
            },
            {
                path: "thirdPluginsList",
                name: "thirdPluginsList",
                component: () => import("../views/thirdPlugin.vue"),
                meta: {
                    title: "第三方插件 - 亞馬屋羅提後花園2.0",
                },
            },
            {
                path: "thirdPluginsList/:pluginId",
                name: "thirdPlugins",
                component: () => import("../views/thirdPlugin.vue"),
                meta: {
                    title: "第三方插件 - 亞馬屋羅提後花園2.0",
                },
            },
            {
                path: "user/:uid",
                name: "user",
                component: () => import("../views/user.vue"),
                meta: {
                    title: "個人資料 - 亞馬屋羅提後花園2.0",
                },
            },
            {
                path: "review",
                name: "review",
                component: () => import("../views/review.vue"),
                meta: {
                    title: "審核列表 - 亞馬屋羅提後花園2.0",
                },
            },
        ],
    },
    // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("../views/404.vue"),
        meta: {
            title: "找不到頁面 - 亞馬屋羅提後花園2.0",
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title; // 设置页面标题
    }
    next();
});

export default router;
