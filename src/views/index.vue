<template>
    <menuNav :isLogin="pluginStore.isLogin" @signOut="handleSignOut"></menuNav>

    <div class="container-none mx-auto pt-20">
        <!-- banner -->
        <div class="text-center py-16 h-full | banner">
            <div class="w-10/12 mx-auto
                md:w-8/12">
                <h1 class="text-5xl inline-block font-bold">Dalamud</h1>
                <p class="my-5 font-light text-xl">
                    所有插件的基底，功能包含快速啟動與更新、第三方插件管理、記憶多組帳號密碼、上傳交易板價格資料至Universalis等多項功能
                </p>
                <div class="flex flex-col flex-wrap justify-center w-full mx-auto mb-6 text-xl font-light
                    md:flex-row md:w-auto">
                    <!-- 下載 -->
                    <div class="relative mb-2 md:mr-6 md:mb-0">
                        <a type="button" class="btn downloadBtn 
                            lg:m-1 lg:w-auto" href="https://github.com/goatcorp/FFXIVQuickLauncher/releases" target="_blank">下載Dalamud(github)</a>
                    </div>
                    <div class="relative mb-2 md:mr-6 md:mb-0">
                        <a type="button" class="btn downloadBtn
                            lg:m-1 lg:w-auto | cn" href="https://bbs.tggfl.com/topic/32/dalamud-%E5%8D%AB%E6%9C%88%E6%A1%86%E6%9E%B6" target="_blank">CN版介紹</a>
                    </div>
                    <!-- discord -->
                    <div class="relative md:mr-6 md:mb-0">
                        <a type="button" class="btn downloadBtn
                            lg:m-1 lg:w-auto | discord" href="https://discord.gg/EfjR2Km524" target="_blank">加入繁中插件DC社群
                        </a>
                    </div>
                    <p class="text-sm mt-1">目前繁中無插件可用，僅提供交流平台，如果已經有人創群再麻煩通知，這邊連結會替換過去</p>
                </div>
                <div class="bg-white mb-4 p-4 rounded text-gray-500" role="alert">
                    <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="h-5" />
                    國際服需至github下載，中文化後的國際服可以使用但有些人會糊糊的
                </div>
                <img src="https://raw.githubusercontent.com/goatcorp/FFXIVQuickLauncher/master/misc/screenshot.png" class="img-fluid border rounded shadow my-4 mx-auto" alt="登陸器介面" width="700"
                    height="500">
                <a href="https://github.com/magejiaaa/Amaurot_garden/issues/1#issue-1565685628" target="_blank"
                    class="px-4 py-2 mr-2 border border-indigo-900 text-indigo-900 rounded inline-block hover:bg-slate-100 hover:text-indigo-800">
                    <font-awesome-icon icon="fa-brands fa-github" />預計更新的項目
                </a>
                <a href="https://twitter.com/NMiaohen6461" target="_blank" class="px-4 py-2 border border-indigo-900 text-indigo-900 rounded inline-block hover:bg-slate-100 hover:text-indigo-800">
                    <font-awesome-icon icon="fa-brands fa-twitter" />更新的內容
                </a>
                <p class="mt-3 font-light">
                    目前國際服已AFK一陣子，網站暫停更新，繁中服等開發社區穩定後會再重新啟動
                </p>
            </div>
        </div>

        <!-- 功能卡片 -->
        <div class="mx-auto my-8 px-4 grid grid-cols-2 gap-2
            md:grid-cols-4 md:px-8 md:my-14 md:gap-4">
            <div class="card" v-for="(item, index) in pluginStore.category" :key="index">
                <ul class="">
                    <li class="text-grayBlue-300 px-6 pt-4 pb-2 text-lg">{{ item }}</li>
                    <li class="text-sm hover:text-gray-800 group" v-for="(plugin, index) in categories(item)" :key="index">
                        <router-link :to="`/dashboard/pluginsList/${plugin.ID}`"
                        class="px-6 py-2 block text-gray-500 ">
                            <span class="block text-xs text-gray-400 transition-all group-hover:text-grayBlue-800">{{ plugin.name }}</span>
                            {{ plugin.describe }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 安裝介紹 -->
        <div class="bg-blueGreen-800 py-14">
            <h2 class="text-center mb-5 text-5xl text-green-200 font-black text-opacity-50">安裝相關問題</h2>
            <div class="w-2/3 grid grid-cols-1 gap-6 mx-auto text-xl
                md:grid-cols-3">
                <button class="btn bg-white text-blueGreen-800 pb-6" @click="openInstallModal('install')">
                    <font-awesome-icon icon="fa-solid fa-book" class="w-12 h-12 block mx-auto p-4" />
                    安裝說明
                </button>
                <button class="btn bg-white text-blueGreen-800 pb-6" @click="openInstallModal('setting')">
                    <font-awesome-icon icon="fa-solid fa-gears" class="w-12 h-12 block mx-auto p-4" />
                    遊戲內設定
                </button>
                <button class="btn bg-white text-blueGreen-800 pb-6" @click="openInstallModal('third')">
                    <font-awesome-icon icon="fa-solid fa-3" class="w-12 h-12 block mx-auto p-4" />
                    加載第三方插件
                </button>
            </div>
        </div>
        <!-- 安裝說明 -->
        <TransitionRoot :show="isOpen" as="template" enter="duration-300 ease" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
            <Dialog class="relative z-30" as="div" @close="closeModal">
                <!-- Modal背景 -->
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeModal" />
                </TransitionChild>
                <!-- Modal內容 -->
                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild as="template" enter="ease-out duration-500 transform" enter-from="opacity-0 -translate-y-40 sm:scale-95" enter-to="opacity-100 -translate-y-0 sm:scale-100"
                            leave="ease-in duration-200" leave-from="opacity-100 sm:scale-100" leave-to="opacity-0 sm:scale-95">
                            <DialogPanel class="fixed top-20 h-5/6 overflow-y-auto w-11/12 bg-white rounded-lg
                                md:w-8/12">
                                <install :installType="installType" @close="closeModal"></install>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

        <footerBox></footerBox>
        <scorllToTop></scorllToTop>
    </div>
</template>

<script>
import menuNav from '../components/Usermenu.vue';
import install from '../components/InstallModal.vue';
import footerBox from '../components/FooterBox.vue';
import scorllToTop from '../components/scrollToTop.vue';
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
            pluginStore.isThirdPlugin = false;
            pluginStore.getPlugin();
        })
        // 篩選插件種類
        function categories(category) {
            const categories = new Set();
            pluginStore.plugins.forEach(plugin => {
                if (plugin.category === category) {
                    categories.add({ ID: plugin.ID, name: plugin.name, describe: plugin.describe });
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
        footerBox,
        scorllToTop
    },
}
</script>