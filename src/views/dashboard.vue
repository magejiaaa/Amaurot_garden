<template>
    <Usermenu :isLogin="pluginStore.isLogin" @signOut="handleSignOut"></Usermenu>
    <router-view></router-view>
</template>

<script>
import Usermenu from '../components/Usermenu.vue';
// import { ref } from 'vue';
import { usePluginsStore } from '../stores/pluginStore';
import { auth } from '../stores/firebasedb';
import { onAuthStateChanged, signOut } from '@firebase/auth';

export default {
    setup() {
        const pluginStore = usePluginsStore();
        pluginStore.getPlugin();
        // 驗證登入
        onAuthStateChanged(auth, (user) => {
            if (user != null) {
                console.log(user);
                pluginStore.isLogin = true;
            } else {
                console.log('not logged in');
            }
        })

        // 登出
        function handleSignOut() {
            signOut(auth).then(() => {
                pluginStore.isLogin = false;
            }).catch((error) => {
                console.log(error);
            });
        }

        return {
            handleSignOut,
            pluginStore
        }
    },
    components: {
        Usermenu,
    }
}
</script>