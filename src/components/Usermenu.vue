<template>
    <nav class="fixed top-0 right-0 w-full flex flex-wrap justify-between items-center bg-white h-20 z-10 | tooTop">
        <router-link to="/" class="flex items-center p-4">
            <img src="../assets/images/logo.png" alt="" class="w-16 mr-3 h-auto">
            <h1 class="text-black font-light text-xl">亞馬烏羅提後花園</h1>
        </router-link>


        <!-- 手機版漢堡 -->
        <button class="block w-8 h-8 mr-4
                    lg:hidden | mobileMenu" @click="mobileMenuShow = !mobileMenuShow"
            :class="{ 'is-opened': mobileMenuShow }">
            <span></span>
            <span></span>
            <span></span>
        </button>

        <transition enter-active-class="transition duration-300 ease-out origin-top"
            enter-from-class="transform scale-y-0  opacity-0" enter-to-class="transform scale-y-100 opacity-100"
            leave-active-class="transition duration-200 ease-in origin-top"
            leave-from-class="transform scale-y-100 opacity-100" leave-to-class="transform scale-y-0 opacity-0">
            <div class="w-full absolute top-20 
                        lg:static lg:w-auto" v-if="mobileMenuShow">
                <!-- 選單按鈕 -->
                <ul class="flex flex-col bg-white text-center pb-4
                            lg:mr-4 lg:flex-row lg:pb-0 | menulist">
                    <li>
                        <router-link to="/" class="p-4 block" @click="mobileMenuClose">Dalamud介紹</router-link>
                    </li>
                    <li>
                        <router-link to="/dashboard/pluginsList" class="p-4 block"
                            @click="mobileMenuClose">插件介紹</router-link>
                    </li>
                    <li>
                        <span class="p-4 block cursor-not-allowed text-gray-500" data-bs-toggle="page"
                            @click="mobileMenuClose">第三方插件</span>
                    </li>
                    <li>
                        <a class="p-4 block cursor-pointer" @click.prevent="getUserID" v-if="isLogin">個人資料</a>
                    </li>
                    <li>
                        <a class="p-4 block cursor-pointer" v-if="isLogin" @click.prevent="logOut">登出</a>
                        <router-link to="/login" class="p-4 block" v-else>登入</router-link>
                    </li>
                </ul>
            </div>
        </transition>
    </nav>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useStateStore } from '../stores/stateStore';

export default {
    props: {
        isLogin: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        const router = useRouter();
        const stateStore = useStateStore();
        stateStore.login();
        // 測試登入
        function loginPush() {
            if (props.isLogin === true) {
                console.log('已登入');
            } else {
                console.log('未登入');
            }
        }
        loginPush();
        function getUserID() {
            const id = stateStore.userID;
            router.push(`/dashboard/user/${id}`);
            mobileMenuClose();
        }

        // 手機版選單
        let mobileMenuShow = ref(false);
        if (window.innerWidth >= 1024) {
            mobileMenuShow.value = true;
        }

        // 選單點擊後關閉
        function mobileMenuClose() {
            if (window.innerWidth < 1024) {
                mobileMenuShow.value = false;
            }
        }

        function logOut() {
            emit("signOut");
            if (window.innerWidth < 1024) {
                mobileMenuShow.value = false;
            }
        }


        return {
            loginPush,
            stateStore,
            getUserID,
            mobileMenuShow,
            mobileMenuClose,
            logOut
        }
    },
}
</script>