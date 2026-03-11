import { defineStore } from "pinia";
import { ref } from "vue";
import { auth, database } from "../stores/firebasedb";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { ref as refData, onValue, update, set, get } from "firebase/database";
import { usePluginsStore } from "../stores/pluginStore";
import Swal from 'sweetalert2';

export const useStateStore = defineStore("user", () => {
    const pluginStore = usePluginsStore();
    const userID = ref("");
    const userName = ref("");
    const userContent = ref({
        email: "",
        displayName: "",
        collectPlugins: [],
    });
    const darkMode = ref(true);
    // 驗證登入
    function login() {
        onAuthStateChanged(auth, async (user) => {  // 加上 async
            if (!user) {
                pluginStore.isLogin = false;
                userID.value = "";
                userContent.value = {};
                userName.value = "";
                return;
            }

            pluginStore.isLogin = true;
            userID.value = user.uid;
            
            const getUserData = refData(database, "users/" + user.uid);
            // 先讀取一次,初始化資料
            const snapshot = await get(getUserData);
            let userData = snapshot.val();

            if (!userData) {
                userData = {
                    displayName: user.displayName,
                    email: user.email,
                    collectPlugins: []
                };
                await set(refData(database, "users/" + user.uid), userData);
            } else if (!userData.collectPlugins) {
                await update(refData(database), {
                    [`/users/${user.uid}/collectPlugins`]: []
                });
            }

            // 初始化完成後,才開始監聽
            onValue(getUserData, (snapshot) => {
                const userData = snapshot.val();
                userContent.value = userData;
                userName.value = userData?.name || userData?.displayName;
            });
        });
    }
    function handleSignOut() {
        signOut(auth)
            .then(() => {
                pluginStore.isLogin = false;
                userID.value = "";
                userName.value = "";
                userContent.value = {};
                Swal.fire({
                    title: "登出成功",
                    icon: 'success',
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // 但登入註冊同按鈕
    function userSubmit() {
        const tempUserObj = userContent.value;
        const updates = {};
        const postData = tempUserObj;
        const userUid = userID.value;
        updates["/users/" + userUid] = postData;
        return update(refData(database), updates).then(() => {
            Swal.fire({
                title: "更新成功",
                icon: 'success',
            })
        });
    }

    // 新增收藏 plugin
    function addCollectPlugin(pluginId, pluginName) {
        // 檢查是否已收藏
        if (!userContent.value.collectPlugins) {
            userContent.value.collectPlugins = [];
        }
        
        // 檢查是否已經收藏該 plugin
        const isExist = userContent.value.collectPlugins.some(
            plugin => plugin.ID === pluginId
        );
        
        if (!isExist) {
            userContent.value.collectPlugins.push({
                ID: pluginId,
                name: pluginName
            });
            
            // 更新到 Firebase
            const updates = {};
            updates[`/users/${userID.value}/collectPlugins`] = userContent.value.collectPlugins;
            return update(refData(database), updates);
        }
    }

    // 移除收藏 plugin
    function removeCollectPlugin(pluginId) {
        if (userContent.value.collectPlugins) {
            const index = userContent.value.collectPlugins.findIndex(
                plugin => plugin.ID === pluginId
            );
            
            if (index > -1) {
                userContent.value.collectPlugins.splice(index, 1);
                
                // 更新到 Firebase
                const updates = {};
                updates[`/users/${userID.value}/collectPlugins`] = userContent.value.collectPlugins;
                return update(refData(database), updates);
            }
        }
    }

    return {
        login,
        userID,
        handleSignOut,
        userContent,
        userName,
        userSubmit,
        darkMode,
        addCollectPlugin,
        removeCollectPlugin,
    };
});
