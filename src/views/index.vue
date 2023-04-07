<template>
    <menuNav :isLogin="pluginStore.isLogin" @signOut="handleSignOut"></menuNav>

    <div class="container-none mx-auto pt-20">
        <!-- banner -->
        <div class="text-center py-16 h-full | banner">
            <div class="w-8/12 mx-auto">
                <h1 class="text-5xl inline-block font-bold">Dalamud</h1>
                <p class="my-5 font-light text-xl">
                    所有插件的基底，功能包含快速啟動與更新、第三方插件管理、記憶多組帳號密碼、上傳交易板價格資料至Universalis等多項功能
                </p>
                <div class="flex justify-center mx-auto mb-6 text-xl font-light">
                    <div class="relative mr-6">
                        <a type="button" class="btn downloadBtn"
                            href="https://github.com/goatcorp/FFXIVQuickLauncher/releases"
                            target="_blank">下載Dalamud(github)</a>
                    </div>
                    <div class="relative">
                        <a type="button" class="btn downloadBtn cn"
                            href="https://bbs.tggfl.com/topic/32/dalamud-%E5%8D%AB%E6%9C%88%E6%A1%86%E6%9E%B6"
                            target="_blank">CN版介紹</a>
                    </div>
                </div>
                <div class="bg-white mb-4 p-4 rounded text-gray-500" role="alert">
                    <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="h-5" />
                    國際服需至github下載，中文化後的國際服可以使用但有些人會糊糊的
                </div>
                <img src="https://raw.githubusercontent.com/goatcorp/FFXIVQuickLauncher/master/misc/screenshot.png"
                    class="img-fluid border rounded shadow my-4 mx-auto" alt="登陸器介面" width="700" height="500">
            </div>
        </div>
        <!-- 功能卡片 -->
        <div class="mx-auto my-14 px-8 grid grid-cols-4 gap-4">
            <div class="card" v-for="(item, index) in pluginStore.category" :key="index">
                <ul class="divide-y">
                    <li class="text-grayBlue-500 px-6 py-2 text-lg">{{ item }}</li>
                    <li class="px-6 py-2 text-gray-500 text-sm" v-for="(plugin, index) in categories(item)" :key="index">
                        {{ plugin }}
                    </li>
                </ul>
            </div>
            <router-link to="/dashboard/pluginsList" class="card flex items-center justify-center text-xl bg-blue-50
                hover:bg-blue-100">
                查看更多
                <font-awesome-icon icon="fa-solid fa-hand-point-right" class="ml-1" />
            </router-link>
        </div>
        <!-- 安裝介紹 -->
        <div class="bg-blueGreen-800 py-14">
            <h2 class="text-center mb-5 text-5xl text-green-200 font-black text-opacity-50">安裝相關問題</h2>
            <div class="w-2/3 grid grid-cols-3 gap-6 mx-auto text-xl">
                <button class="btn bg-white text-blueGreen-800 pb-6" 
                @click="openInstallModal('install')">
                    <font-awesome-icon icon="fa-solid fa-book" class="w-12 h-12 block mx-auto p-4" />
                    安裝說明
                </button>
                <button class="btn bg-white text-blueGreen-800 pb-6"
                @click="openInstallModal('setting')">
                    <font-awesome-icon icon="fa-solid fa-gears" class="w-12 h-12 block mx-auto p-4" />
                    遊戲內設定
                </button>
                <button class="btn bg-white text-blueGreen-800 pb-6"
                @click="openInstallModal('third')">
                    <font-awesome-icon icon="fa-solid fa-3" class="w-12 h-12 block mx-auto p-4" />
                    加載第三方插件
                </button>
            </div>
        </div>
        <!-- 安裝說明 -->
        <TransitionRoot :show="isOpen" as="template" enter="duration-300 ease" enter-from="opacity-0" enter-to="opacity-100"
            leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
            <Dialog>
                <!-- Modal背景 -->
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                    leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-30" />
                </TransitionChild>
                <!-- Modal內容 -->
                <TransitionChild as="template" enter="ease-out duration-5000"
                    enter-from="opacity-0 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100"
                    leave-to="opacity-0 sm:translate-y-0 sm:scale-95">
                    <DialogPanel class="fixed w-full top-20 h-screen z-40">
                        <install :installType="installType" @close="closeModal"></install>
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </TransitionRoot>

        <footerBox></footerBox>
    </div>
</template>

<script>
import menuNav from '../components/Usermenu.vue';
import install from '../components/InstallModal.vue';
import footerBox from '../components/FooterBox.vue';
import { usePluginsStore } from '../stores/pluginStore';
import { useStateStore } from '../stores/stateStore';
import { onMounted, ref } from 'vue';
import { Dialog, DialogPanel, TransitionRoot, TransitionChild } from '@headlessui/vue';

export default {
    setup() {
        const pluginStore = usePluginsStore();
        const stateStore = useStateStore();
        // 登出
        function handleSignOut() {
            stateStore.handleSignOut();
        }
        // 載入插件列表
        onMounted(() => {
            pluginStore.getPlugin();
        })
        // 篩選插件種類
        function categories(category) {
            const categories = new Set();
            pluginStore.plugins.forEach(plugin => {
                if (plugin.category === category) {
                    categories.add(plugin.describe);
                }
            });
            return Array.from(categories);
        }

        // 控制 Modal 開關
        let isOpen = ref(false);
        let installType = ref('');
        // 說明按鈕
        function openInstallModal(type) {
            isOpen.value = true;
            console.log(type);
            installType.value = type;
        }

        // 關閉 Modal 
        function closeModal() {
            isOpen.value = false;
            installType.value = '';
        }

        return {
            pluginStore,
            categories,
            handleSignOut,
            isOpen,
            openInstallModal,
            closeModal,
            installType
        }
    },
    components: {
        menuNav,
        install,
        Dialog,
        DialogPanel,
        TransitionRoot,
        TransitionChild,
        footerBox
    },
}
</script>