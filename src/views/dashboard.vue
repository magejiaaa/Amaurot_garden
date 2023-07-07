<template>
    <Usermenu :isLogin="pluginStore.isLogin" @signOut="handleSignOut"></Usermenu>
    <router-view class="pt-20"></router-view>
    <footerBox></footerBox>
</template>

<script>
import Usermenu from "../components/Usermenu.vue";
import footerBox from "../components/FooterBox.vue";
// import { ref } from 'vue';
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
                // 检测到路由变化时执行刷新页面的操作
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
        Usermenu,
        footerBox,
    },
};
</script>
