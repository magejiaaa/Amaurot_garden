<template>
    <nav class="fixed top-0 right-0 w-full flex flex-wrap justify-between items-center bg-white h-20 z-[11] | tooTop">
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
                <ul class="flex flex-col bg-white text-center items-center pb-4
                    lg:mr-4 lg:flex-row lg:pb-0 | menulist">
                    <li>
                        <router-link to="/" class="p-4 block" @click="mobileMenuClose">Dalamud介紹</router-link>
                    </li>
                    <li>
                        <router-link to="/dashboard/pluginsList" class="p-4 block"
                            @click="mobileMenuClose">插件介紹</router-link>
                    </li>
                    <li>
                        <router-link to="/dashboard/thirdPluginsList" class="p-4 block" 
                            @click="mobileMenuClose">第三方插件</router-link>
                    </li>
                    <li>
                        <a class="p-4 block cursor-pointer" @click.prevent="getUserID" v-if="isLogin">個人資料</a>
                    </li>
                    <li>
                        <a class="p-4 block cursor-pointer" v-if="isLogin" @click.prevent="logOut">登出</a>
                        <router-link to="/login" class="p-4 block" v-else>登入</router-link>
                    </li>
                    <li>
                        <!-- 切換深色模式 -->
                        <Switch
                            v-model="darkMode"
                            :class="darkMode ? 'bg-gray-600' : 'bg-gray-200'"
                            class="relative inline-flex h-6 w-10 items-center rounded-full"
                        >
                            <span class="sr-only">切換深色模式</span>
                            <span
                            :class="darkMode ? 'translate-x-5' : 'translate-x-1'"
                            class="inline-flex items-center h-4 w-4 transform rounded-full bg-white transition">
                            </span>
                            <font-awesome-icon v-if="darkMode" icon="fa-solid fa-sun" class="text-gray-200 w-2 left-2 absolute" />
                            <font-awesome-icon v-if="!darkMode" icon="fa-solid fa-moon" class="text-gray-500 w-2 right-2 absolute" />
                        </Switch>
                    </li>
                </ul>
            </div>
        </transition>
    </nav>
</template>

<script>
import { useRouter } from 'vue-router';
import { computed, watch, ref } from 'vue';
import { Switch } from '@headlessui/vue'
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
        // 直接用 computed 雙向綁定 store 的 darkMode
        const darkMode = computed({
            get: () => stateStore.darkMode,
            set: (val) => { stateStore.darkMode = val }
        });
        // debug: 監聽 darkMode 變化
        watch(darkMode, (val) => {
            document.documentElement.classList.toggle('dark', val)
        });
        stateStore.login();
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
            stateStore,
            getUserID,
            mobileMenuShow,
            mobileMenuClose,
            logOut,
            darkMode,
        }
    },
    components: {
        Switch,
    }
}
</script>