import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth, database } from '../stores/firebasedb';
import { onAuthStateChanged, signOut } from '@firebase/auth';
import { ref as refData, onValue} from "firebase/database";
import { usePluginsStore } from '../stores/pluginStore';

export const useStateStore = defineStore('user', () => {
    const pluginStore = usePluginsStore();
    const userID = ref('');
    const userName = ref('');
    const userContent = ref({
        email: '',
        displayName: '',
        photoURL: '',
    });
    // 驗證登入
    function login() {
        onAuthStateChanged(auth, (user) => {
            if (user != null) {
                pluginStore.isLogin = true;
                userID.value = user.uid;
                const getUserData = refData(database, 'users/' + user.uid);
                onValue(getUserData, (snapshot) => {
                    const userData = snapshot.val();
                    userName.value = userData.name;
                })
                userContent.value = user;
                // console.log(user);
            } else {
                console.log('not logged in');
            }
        })
    }
    function handleSignOut() {
        signOut(auth).then(() => {
            pluginStore.isLogin = false;
            userID.value = '';
            alert('登出成功');
        }).catch((error) => {
            console.log(error);
        });
    }

    return {
        login,
        userID,
        handleSignOut,
        userContent,
        userName
    }
});