<template>
    <div class="mt-20 bg-gray-100">
        <div class="w-2/3 mx-auto py-10">
            <form action="#" method="POST">
                <label for="userName">使用者名稱</label>
                <input type="text" id="userName" v-model="tempUser.name">
                <label for="userWeb">個人網站</label>
                <input type="url" id="userWeb" v-model="tempUser.website">
                <label for="userGame">遊戲名稱</label>
                <input type="text" id="userGame" v-model="tempUser.gameName">
                <button type="button" class="btn border mt-4" @click.prevent="userSubmit(tempUser)">確認修改</button>
            </form>
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
        stateStore.login();
        // 取得database的使用者資料
        const tempUser = ref({
            name: '',
        });
        const userUid = stateStore.userID || route.params.uid;
        const userData = refData(database, 'users/' + userUid);
        onValue(userData, (snapshot) => {
            tempUser.value = snapshot.val();
        })
        if (tempUser.value.displayName !== '' && tempUser.value.name === '') {
            tempUser.value.name = tempUser.value.displayName;
        }

        function userSubmit(user) {
            const tempUserObj = toRaw(user);
            const updates = {};
            const postData = tempUserObj;
            updates['/users/' + userUid] = postData;
            console.log(updates);
            return update(refData(database), updates)
            .then(() => {
                console.log('data success!');
            });
        }

        return {
            stateStore,
            tempUser,
            userSubmit,
            userUid,
        }
    }
}
</script>