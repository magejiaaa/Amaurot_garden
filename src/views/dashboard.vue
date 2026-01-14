<template>
    <userMenu :isLogin="pluginStore.isLogin" @signOut="handleSignOut"></userMenu>
    <router-view></router-view>
    <footerBox></footerBox>
</template>

<script>
import userMenu from "../components/userMenu.vue";
import footerBox from "../components/FooterBox.vue";
import { usePluginsStore } from "../stores/pluginStore";
import { useStateStore } from "../stores/stateStore";
import { watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const pluginStore = usePluginsStore();
        // pluginStore.getPlugin();
        pluginStore.getReviewPlugin();

        const stateStore = useStateStore();
        stateStore.login();

        function handleSignOut() {
            stateStore.handleSignOut();
        }
        const route = useRoute();
        watch(
            () => route,
            (to, from) => {
                // 檢測到路由變化時執行刷新頁面的操作
                if (to.path !== from.path) {
                    pluginStore.getPlugin();
                }
            }
        );

        return {
            pluginStore,
            stateStore,
            handleSignOut,
        };
    },
    components: {
        userMenu,
        footerBox,
    },
};
</script>
