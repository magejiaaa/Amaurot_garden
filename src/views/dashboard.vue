<template>
    <Usermenu :isLogin="pluginStore.isLogin" @signOut="handleSignOut"></Usermenu>
    <router-view></router-view>
    <footerBox></footerBox>
</template>

<script>
import Usermenu from '../components/Usermenu.vue';
import footerBox from '../components/FooterBox.vue';
// import { ref } from 'vue';
import { usePluginsStore } from '../stores/pluginStore';
import { useStateStore } from '../stores/stateStore';

export default {
    setup() {
        const pluginStore = usePluginsStore();
        pluginStore.getPlugin();
        pluginStore.getReviewPlugin();

        const stateStore = useStateStore();
        stateStore.login();

        function handleSignOut() {
            stateStore.handleSignOut();
        }

        return {
            pluginStore,
            stateStore,
            handleSignOut
        }
    },
    components: {
        Usermenu,
        footerBox
    }
}
</script>