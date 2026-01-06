import { defineStore } from "pinia";
import { ref } from "vue";
import { auth, database } from "../stores/firebasedb";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { ref as refData, onValue, update, set } from "firebase/database";
import { usePluginsStore } from "../stores/pluginStore";

export const useStateStore = defineStore("user", () => {
    const pluginStore = usePluginsStore();
    const userID = ref("");
    const userName = ref("");
    const userContent = ref({
        email: "",
        displayName: "",
        collectPlugins: [],
    });
    // 驗證登入
    function login() {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                console.log("not logged in");
                pluginStore.isLogin = false;
                return;
            }

            pluginStore.isLogin = true;
            userID.value = user.uid;
            
            const getUserData = refData(database, "users/" + user.uid);
            onValue(getUserData, async (snapshot) => {
                let userData = snapshot.val();
                
                // 如果資料庫沒有該使用者,建立新使用者
                if (!userData) {
                    userData = {
                        displayName: user.displayName,
                        email: user.email,
                        collectPlugins: []
                    };
                    await set(refData(database, "users/" + user.uid), userData);
                } else {
                    // 確保 collectPlugins 欄位存在
                    if (!userData.collectPlugins) {
                        userData.collectPlugins = [];
                        const updates = {};
                        updates[`/users/${user.uid}/collectPlugins`] = [];
                        await update(refData(database), updates);
                    }
                }
                
                // 更新本地狀態
                userContent.value = userData;
                userName.value = userData.name || userData.displayName;
            });
        });
    }
    function handleSignOut() {
        signOut(auth)
            .then(() => {
                pluginStore.isLogin = false;
                userID.value = "";
                alert("登出成功");
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
            alert("更新成功");
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
        addCollectPlugin,
        removeCollectPlugin,
    };
});
