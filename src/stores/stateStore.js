import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth } from '../stores/firebasedb';
import { onAuthStateChanged, signOut } from '@firebase/auth';
import { usePluginsStore } from '../stores/pluginStore';

export const useStateStore = defineStore('user', () => {
    const pluginStore = usePluginsStore();
    const userID = ref('');
    const userContent = ref({
        email: '',
        displayName: '',
        photoURL: ''
    });
    // 驗證登入
    function login() {
        onAuthStateChanged(auth, (user) => {
            if (user != null) {
                // console.log(user);
                pluginStore.isLogin = true;
                userID.value = user.uid;
                userContent.value = user;
            } else {
                console.log('not logged in');
            }
        })
    }
    function handleSignOut() {
        signOut(auth).then(() => {
            pluginStore.isLogin = false;
            userID.value = '';
        }).catch((error) => {
            console.log(error);
        });
    }

    return {
        login,
        userID,
        handleSignOut,
        userContent
    }
});