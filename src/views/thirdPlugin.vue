<template>
    <div class="content-area pt-20">
        <div class="bg-gray-100 flex flex-col md:flex-row">
            <!-- PC分類列表 -->
            <div class="max-w-xs md:border-r md:w-3/12" v-if="mobileMenuShow">
                <ul class="mx-auto my-8 text-blueGreen-800">
                    <li>
                        <button class="btn w-full hover:bg-gray-300 rounded-none" @click="selectCategory = ''">顯示全部</button>
                    </li>
                    <li v-for="(item, index) in pluginStore.category" :key="index">
                        <button class="btn w-full hover:bg-gray-300 rounded-none" @click="selectCategory = item">{{ item
                        }}</button>
                    </li>
                </ul>
            </div>

            <!-- 手機分類 -->
            <Listbox v-model="selectCategory" v-else>
                <div class="relative mt-10 w-11/12 mx-auto">
                    <ListboxButton
                        class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 text-blueGreen-800
                                focus:outline-none focus-visible:border-blueGreen-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span class="block truncate">{{ selectCategory || '請選擇分類' }}</span>
                        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <font-awesome-icon icon="fa-solid fa-caret-down" />
                        </span>
                    </ListboxButton>

                    <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
                        <ListboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            <ListboxOption v-slot="{ active, selected }" value="" as="template">
                                <li :class="[
                                    active ? 'bg-grayBlue-100 text-blueGreen-800' : 'text-gray-900',
                                    'relative cursor-default select-none py-2 pl-10 pr-4',
                                ]">
                                    <button>顯示全部</button>
                                    <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-blueGreen-500">
                                        <font-awesome-icon icon="fa-solid fa-check" />
                                    </span>
                                </li>
                            </ListboxOption>
                            <ListboxOption v-slot="{ active, selected }" v-for="(item, index) in pluginStore.category" :key="index" :value="item" as="template">
                                <li :class="[
                                    active ? 'bg-grayBlue-100 text-blueGreen-800' : 'text-gray-900',
                                    'relative cursor-default select-none py-2 pl-10 pr-4',
                                ]">
                                    <span :class="[
                                        selected ? 'font-medium' : 'font-normal',
                                        'block truncate',
                                    ]">{{ item }}</span>
                                    <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-blueGreen-500">
                                        <font-awesome-icon icon="fa-solid fa-check" />
                                    </span>
                                </li>
                            </ListboxOption>
                        </ListboxOptions>
                    </transition>
                </div>
            </Listbox>

            <!-- 讀取狀態 -->
            <loading-plugin :active="pluginStore.isLoading"></loading-plugin>

            <!-- 插件列表 -->
            <div class="md:w-8/12 md:px-5
                    w-11/12 py-10 mx-auto">
                <div class="mb-5 flex justify-between items-end flex-wrap">
                    <div class="flex flex-col gap-x-4 md:items-center md:flex-row">
                        <h3 class="text-2xl flex-none">插件列表</h3>
                        <!-- 搜索框 -->
                        <input v-model="searchKeyword" placeholder="輸入關鍵字" class="text-sm px-4 py-2 border-blueGreen-500 focus:ring-blueGreen-500" />
                    </div>
                    <button class="btn text-white bg-blueGreen-300 hover:bg-blueGreen-500" @click="newPlugin()" v-if="pluginStore.isLogin">新增插件</button>
                    <!-- 沒登入顯示 -->
                    <span class="text-gray-500 text-sm" v-if="!pluginStore.isLogin">新增/編輯插件需登入</span>
                </div>
                <ul class="listGroup" v-if="filterPlugin.length > 0">
                    <li v-for="(item, index) in filteredData" :key="index" class="p-4 list md:grid-cols-2 lg:grid-cols-4" @click="pluginContent(index, item)">
                        <!-- 插件名稱 -->
                        <p>{{ item.name }}</p>
                        <!-- 插件分類 -->
                        <p class="font-light text-gray-500">{{ item.category }}</p>
                        <!-- 插件簡介 -->
                        <p class="md:col-span-2">{{ item.describe }}</p>
                    </li>
                </ul>
                <!-- 沒資料畫面 -->
                <p class="text-center" v-else>本分類下沒有插件</p>
            </div>
        </div>
        <TransitionRoot :show="isOpen" as="template" enter="duration-300 ease" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
            <Dialog class="relative z-30" as="div" @close="closeModal">
                <!-- Modal背景 -->
                <TransitionChild as="template" enter="ease-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />
                </TransitionChild>
                <!-- Modal內容 -->
                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild class="relative z-50 w-full" enter="ease-out duration-300 transform" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200"
                            leave-from="opacity-100" leave-to="opacity-0">
                            <!-- 切換上下一個插件 -->
                            <font-awesome-icon icon="fa-solid fa-chevron-left" class="hidden absolute w-16 h-16 left-12 text-white cursor-pointer
                                md:block lg:left-32" @click="prePlugin" v-if="isEdit == false" />
                            <font-awesome-icon icon="fa-solid fa-chevron-right" class="hidden absolute w-16 h-16 right-12 text-white cursor-pointer
                                md:block lg:right-32" @click="nextPlugin" v-if="isEdit == false" />
                        </TransitionChild>
                        <TransitionChild as="template" enter="ease duration-300 transform" enter-from="opacity-0 translate-x-40" enter-to="opacity-100 translate-x-0" leave="ease-in duration-200"
                            leave-from="opacity-100 sm:scale-100" leave-to="opacity-0 sm:scale-95">
                            <DialogPanel class="scrollbarWindow | 
                            fixed top-20 h-5/6 overflow-y-auto w-11/12 bg-white rounded-lg
                            md:w-8/12">
                                <pluginModel :plugin="tempPlugin" @close="closeModal" @updateModal="updateModal" @editing="editHandler" :isNew="isNew">
                                </pluginModel>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
    <scorllToTop></scorllToTop>
</template>

<script>
import { usePluginsStore } from '../stores/pluginStore';
import { ref, computed, watch, onMounted, watchEffect } from 'vue';
import pluginModel from '../components/plugnModel.vue';
import scorllToTop from '../components/scrollToTop.vue';
import { Dialog, DialogPanel, TransitionRoot, TransitionChild } from '@headlessui/vue';
import { useRouter, useRoute } from "vue-router";
import {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue';
import Swal from 'sweetalert2';

export default {
    setup() {
        const pluginStore = usePluginsStore();
        // 這頁是第三方插件
        pluginStore.isThirdPlugin = true;
        pluginStore.getPlugin();


        // 搜索功能
        const searchKeyword = ref('');
        const filteredData = computed(() => {
            // Filter data based on the searchKeyword
            const keyword = searchKeyword.value.toLowerCase().trim();
            if (keyword === '') {
                return filterPlugin.value;
            } else {
                return filterPlugin.value.filter(item => {
                    return item.name.toLowerCase().includes(keyword) || item.category.toLowerCase().includes(keyword) || item.describe.toLowerCase().includes(keyword) || item.content.toLowerCase().includes(keyword);
                });
            }
        });

        // 篩選插件種類
        const selectCategory = ref('');
        const filterPlugin = computed(() => {
            const arr = [];
            if (selectCategory.value !== '') {
                pluginStore.plugins.forEach((item) => {
                    if (item.category.includes(selectCategory.value)) {
                        arr.push(item);
                    }
                });
            } else {
                pluginStore.plugins.forEach((item) => {
                    arr.push(item);
                });
            }
            return [...new Set(arr)];
        });

        // 控制 Modal 開關
        let isOpen = ref(false);
        let isNew = ref(false);
        let pluginIndex = ref(0);
        const tempPlugin = ref({});
        const route = useRoute();
        const router = useRouter();
        // 從URL初始化頁面
        let routePluginID = ref(route.params.pluginId);
        const isDataLoaded = ref(false);
        const getPluginURL = () => {
            if (routePluginID.value && isDataLoaded.value) {
                isOpen.value = true;
                pluginStore.plugins.forEach((item, index) => {
                    if (item.ID === routePluginID.value) {
                        tempPlugin.value = item;
                        pluginIndex.value = index;
                        tempPlugin.value.url = route.path;
                        isDataLoaded.value = false;
                    }
                });
            }
        };
        onMounted(async () => {
            isDataLoaded.value = true;
            await getPluginURL();
        });
        watchEffect(() => {
            getPluginURL();
        });
        // 獲取當前插件資料
        function pluginContent(index, item) {
            pluginIndex.value = index;
            tempPlugin.value = { ...item };
            tempPlugin.value.url = route.path + '/' + item.ID;
            isOpen.value = true;
            // 更新URL中的ID
            const pluginId = tempPlugin.value.ID;
            router.push({ name: 'thirdPlugins', params: { pluginId } });
        }
        // 監聽路由變化更新網頁標題
        router.beforeEach((to, from, next) => {
            const pluginTitle = tempPlugin.value.name;
            // 檢查是否有設置了插件名稱，如果有就使用插件名稱作為網頁標題，否則使用預設標題
            const title = pluginTitle || '第三方插件 - 亞馬屋羅提後花園2.0';
            if (from.name === 'thirdPluginsList' && to.name === 'thirdPlugins') {
                document.title = `${title}(第三方) - 亞馬屋羅提後花園2.0`;
            }
            next();
        });
        // 新增插件的話增加判斷
        function newPlugin() {
            isNew.value = true;
            isOpen.value = true;
        }
        // 判斷model是否為編輯狀態，不是才可以點上下一頁
        let isEdit = ref(false);
        function editHandler() {
            isEdit.value = !isEdit.value;
        }
        // 上一個插件
        function prePlugin() {
            if (pluginIndex.value > 0 && isEdit.value === false) {
                pluginIndex.value--;
            }
        }
        // 下一個插件
        function nextPlugin() {
            if (pluginIndex.value < filterPlugin.value.length - 1 && isEdit.value === false) {
                pluginIndex.value++;
            }
        }
        // 監聽pluginIndex改變tempPlugin
        watch(
            pluginIndex, (newValue) => {
                const item = filterPlugin.value[newValue];
                pluginContent(newValue, item);
            }
        );
        // 關閉 Modal 
        function closeModal() {
            isOpen.value = false;
            isNew.value = false;
            isEdit.value = false;
            tempPlugin.value = {};
            router.push({ name: 'thirdPluginsList' });
        }
        // 更新插件資料
        function updateModal(item) {
            if (isNew.value === true) {
                pluginStore.setPlugin(item);
                closeModal();
                pluginStore.getPlugin();
                Swal.fire({
                    title: "新增成功",
                    icon: 'success',
                })
            } else {
                pluginStore.updatePlugin(item);
                closeModal();
                pluginStore.getPlugin();
                Swal.fire({
                    title: "送審成功",
                    icon: 'success',
                })
            }
        }

        // 篩選偵測視窗大小
        let mobileMenuShow = ref(false);
        if (window.innerWidth >= 768) {
            mobileMenuShow.value = true;
        }

        // 監聽插件視窗開啟的話背景不可捲動
        watch(isOpen, (newVal) => {
            const body = document.querySelector('body');
            if (newVal) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });


        return {
            pluginStore,
            selectCategory,
            filterPlugin,
            isOpen,
            tempPlugin,
            pluginIndex,
            pluginContent,
            updateModal,
            closeModal,
            newPlugin,
            isNew,
            mobileMenuShow,
            prePlugin,
            nextPlugin,
            editHandler,
            isEdit,
            searchKeyword,
            filteredData
        }
    },
    components: {
        pluginModel,
        Dialog,
        DialogPanel,
        TransitionRoot,
        TransitionChild,
        Listbox,
        ListboxLabel,
        ListboxButton,
        ListboxOptions,
        ListboxOption,
        scorllToTop
    }
}
</script>