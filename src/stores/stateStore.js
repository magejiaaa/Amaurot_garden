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
        photoURL: "",
    });
    // 驗證登入
    function login() {
        onAuthStateChanged(auth, (user) => {
            if (user != null) {
                pluginStore.isLogin = true;
                userID.value = user.uid;
                const getUserData = refData(database, "users/" + user.uid);
                onValue(getUserData, (snapshot) => {
                    const userData = snapshot.val();
                    // 如果資料庫沒有該使用者路徑
                    if (userData === null) {
                        console.log("user");
                        // 寫入第三方的名稱
                        set(refData(database, "users/" + user.uid), {
                            displayName: user.displayName,
                            email: user.email,
                        });
                        userName.value = userContent.value.displayName;
                    } else if (!userData.name) {
                        userName.value = userData.displayName;
                    } else {
                        userName.value = userData.name;
                    }
                });
                userContent.value = user;
            } else {
                console.log("not logged in");
            }
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
        console.log(updates);
        return update(refData(database), updates).then(() => {
            console.log("更新成功");
            alert("更新成功");
        });
    }

    return {
        login,
        userID,
        handleSignOut,
        userContent,
        userName,
        userSubmit,
    };
});
