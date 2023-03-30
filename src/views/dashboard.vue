<template>
    <Usermenu></Usermenu>
    <router-view class="container-none mt-20"></router-view>
</template>

<script>
import Usermenu from '../components/Usermenu.vue';
import { usePluginsStore } from '../stores/pluginStore';

export default {
    setup() {
        const pluginStore = usePluginsStore();
        pluginStore.getPlugin();
    },
    components: {
        Usermenu,
    }
}
</script>