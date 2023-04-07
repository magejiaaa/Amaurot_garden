<template>
    <div class="mt-20 bg-gray-100">
        <div class="w-2/3 mx-auto py-10">
            <!-- 編輯 -->
            <form action="#" method="POST" v-if="stateStore.userID === userUid">
                <label for="userName">使用者名稱</label>
                <input type="text" id="userName" v-model="localUser.name">
                <label for="userWeb">個人網站</label>
                <input type="url" id="userWeb" v-model="localUser.website">
                <label for="userGame">遊戲名稱</label>
                <input type="text" id="userGame" v-model="localUser.gameName">
                <button type="button" class="btn border mt-4" @click.prevent="userSubmit(localUser)">確認修改</button>
            </form>
            <!-- 不可編輯 -->
            <div class="text-center" v-else>
                <h3>{{ tempUser.name }}</h3>
                <p>{{ tempUser.gameName }}</p>
                <a :href="tempUser.website">{{ tempUser.website }}</a>
            </div>
        </div>

    </div>
</template>

<script>
import { useStateStore } from '../stores/stateStore';
import { ref, toRaw } from 'vue';
import { database } from '../stores/firebasedb.js';
import { onValue, ref as refData, update } from 'firebase/database';
import { useRoute } from 'vue-router'

export default {
    setup() {
        const route = useRoute()
        const stateStore = useStateStore();
        // stateStore.login();
        // 取得database的使用者資料
        const tempUser = ref({});
        const localUser = ref(tempUser);
        // 確保有uid
        const userUid = stateStore.userID || route.params.uid;
        // 取得使用者資料
        const userData = refData(database, 'users/' + userUid);
        onValue(userData, (snapshot) => {
            tempUser.value = snapshot.val();
        })
        // 當第三方名稱不為空 且 name不存在
        if (tempUser.value.displayName !== '' && !tempUser.value.name) {
            localUser.value.name = tempUser.value.displayName;
        }
        // 更改使用者資料
        function userSubmit(user) {
            const tempUserObj = toRaw(user);
            const updates = {};
            const postData = tempUserObj;
            updates['/users/' + userUid] = postData;
            console.log(updates);
            return update(refData(database), updates)
            .then(() => {
                console.log('更新成功');
                alert('更新成功');
            });
        }

        return {
            stateStore,
            tempUser,
            userSubmit,
            userUid,
            localUser
        }
    }
}
</script>