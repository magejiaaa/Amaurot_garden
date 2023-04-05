<template>
    <nav class="fixed top-0 right-0 w-full flex justify-between items-center bg-white h-20 z-10 | tooTop">
        <router-link to="/" class="flex items-center p-4">
            <img src="../assets/images/logo.png" alt="" class="w-16 mr-3 h-auto">
            <h1 class="text-black text-xl">亞馬烏羅提後花園</h1>
        </router-link>

        <div>
            <ul class="flex mr-4 | menulist">
                <li class="group">
                    <a class="p-4 inline-flex items-center group-hover:text-grayBlue-800 | dropdown" href="#" role="button">
                        Dalamud介紹
                        <svg class="-mr-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clip-rule="evenodd" />
                        </svg>
                    </a>
                    <ul class="absolute hidden w-full text-center right-0 bg-white group-hover:block">
                        <li>
                            <a class="p-4 block" href="index.html#card_menu">功能概覽</a>
                        </li>
                        <li>
                            <a class="p-4 block" href="index.html#install">基本安裝</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a class="p-4 block" href="plugins_ui.html">插件介紹</a>
                </li>
                <li>
                    <a class="p-4 block" data-bs-toggle="page" href="third_plugins.html">第三方插件</a>
                </li>
                <li>
                    <router-link to="/dashboard/pluginsList" class="p-4 block" v-if="isLogin"
                    @click="$emit('signOut')">登出</router-link>
                    <router-link to="/dashboard/pluginsList" class="p-4 block" v-else
                    @click="loginPush">登入</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
    props: {
        isLogin: {
            type: Boolean,
            default: false,
        }
    },
    setup(props) {
        const router = useRouter()
        // 點登入跳轉
        function loginPush() {
            if (props.isLogin) {
                router.push('/dashboard/pluginsList');
            } else {
                router.push('/login');
            }
        }

        return {
            loginPush,
        }
    }
}
</script>