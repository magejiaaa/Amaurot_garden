<template>
    <div class="content-area pt-20">
        <div class="bg-gray-100 dark:bg-gray-800 flex flex-col md:flex-row">
            <pluginCategoryList 
                :themeColor="themeColor" 
                v-model:activeCategory="selectCategory" 
                v-model:showCollected="showCollected"
            ></pluginCategoryList>
            <!-- 讀取狀態 -->
            <loading-plugin :active="pluginStore.isLoading"></loading-plugin>

            <!-- 插件列表 -->
            <div class="md:w-8/12 md:px-5
                    w-11/12 py-10 mx-auto">
                <div class="mb-5 flex justify-between md:items-end flex-wrap">
                    <div class="flex flex-col gap-x-4 md:items-center md:flex-row">
                        <h3 class="text-2xl flex-none">插件列表</h3>
                        <!-- 搜索框 -->
                        <input v-model="searchKeyword" placeholder="輸入關鍵字" class="text-sm px-4 py-2 bg-white" :class="[themeClasses.border, themeClasses.focusRing]" />
                    </div>
                    <button class="btn text-white" :class="[themeClasses.bg500, themeClasses.hover600]" @click="newPlugin()" v-if="pluginStore.isLogin">新增插件</button>
                    <!-- 沒登入顯示 -->
                    <span class="text-gray-500 text-sm" v-if="!pluginStore.isLogin">新增/編輯插件需登入</span>
                </div>
                <p class="mb-4 text-gray-600 dark:text-gray-400">
                    <font-awesome-icon icon="fa-solid fa-circle-check" class="text-green-500" />
                    有繁中可用版本或本地化
                </p>
                <!-- 插件列表 -->
                <ul class="listGroup dark:border-gray-500 dark:bg-slate-800" v-if="filterPlugin.length > 0">
                    <li v-for="(item, index) in currentPageData" :key="index" class="p-4 pr-16 list relative md:grid-cols-2 lg:grid-cols-4 gap-x-1 dark:border-gray-500 dark:hover:bg-grayBlue-500" @click="pluginContent(index, item, $event)">
                        <!-- 插件名稱 -->
                        <p>{{ item.name }}</p>
                        <!-- 插件分類 -->
                        <p class="font-light text-gray-500 dark:text-gray-300">{{ item.category }}</p>
                        <!-- 插件簡介 -->
                        <p class="md:col-span-2">{{ item.describe }}</p>
                        <div class="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center">
                            <!-- 是否支援繁中 -->
                            <font-awesome-icon v-if="item.trPluginURL" icon="fa-solid fa-circle-check" class="text-green-500" />
                            <span v-if="item.trPluginURL" class="sr-only">支援繁體中文</span>
                            <!-- 收藏按鈕 -->
                            <button class="p-2 hover:text-yellow-400 transition-all"
                            :class="{
                                'text-yellow-400': isCollected(item.ID),
                                'text-gray-300 hover:text-yellow-400': !isCollected(item.ID)
                            }" 
                            @click="pluginCollection(item)" :title="isCollected(item.ID) ? '取消收藏' : '收藏插件'" v-if="pluginStore.isLogin">
                                <font-awesome-icon icon="fa-solid fa-star" />
                            </button>
                        </div>
                    </li>
                </ul>
                <!-- 沒資料畫面 -->
                <p v-else class="text-center">本分類下沒有插件</p>
                <ul class="pagination" :class="{ third: pluginType === 'third' }">
                    <li v-if="currentPage !== 1">
                        <button @click="changePage('prev')"><font-awesome-icon icon="fa-solid fa-chevron-left" /></button>
                    </li>
                    <li v-for="(page, index) in totalPages" :key="index">
                        <button @click="changePage(index)" :class="{ 'active': currentPage === page }">{{ page }}</button>
                    </li>
                    <li v-if="currentPage !== totalPages">
                        <button @click="changePage('next')"><font-awesome-icon icon="fa-solid fa-chevron-right" /></button>
                    </li>
                </ul>
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
                            <!-- 切換上下一個插件按鈕 -->
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
    <scrollToTop></scrollToTop>
</template>

<script>
import { usePluginsStore } from '../stores/pluginStore';
import { useStateStore } from '../stores/stateStore';
import { ref, computed, watch, onMounted, watchEffect } from 'vue';
import pluginModel from '../components/plugnModel.vue';
import scrollToTop from '../components/scrollToTop.vue';
import pluginCategoryList from '../components/pluginCategoryList.vue';
import { Dialog, DialogPanel, TransitionRoot, TransitionChild } from '@headlessui/vue';
import { useRouter, useRoute } from "vue-router";
import Swal from 'sweetalert2';

export default {
    props: {
        themeColor: {
            type: String,
            default: 'grayBlue'
        },
        pluginType: {
            type: String,
            default: 'official'
        },
        pluginId: {  
            type: String,
            default: ''
        }
    },
    setup(props) {
        const pluginStore = usePluginsStore();
        const stateStore = useStateStore();
        watchEffect(async () => {
            pluginStore.isThirdPlugin = props.pluginType === 'third';
            await pluginStore.getPlugin();
        });

        // 根據 props 動態設定主題顏色
        const themeClasses = computed(() => {
            const color = props.themeColor;
            return {
                text800: `text-${color}-800`,
                text500: `text-${color}-500`,
                bg100: `bg-${color}-100`,
                bg400: `bg-${color}-400`,
                bg500: `bg-${color}-500`,
                hover600: `hover:bg-${color}-600`,
                focusBorder: `focus-visible:border-${color}-500`,
                border: `border-${color}-500`,
                focusRing: `focus:ring-${color}-500`
            };
        });
        // 篩選插件種類
        const selectCategory = ref('');
        let showCollected = ref(false);
        // 添加一個變數來追蹤當前選中的分類
        const activeCategory = ref('');
        const filterPlugin = computed(() => {
            let arr = [];
            
            // 先根據分類篩選
            if (selectCategory.value !== '') {
                pluginStore.plugins.forEach((item) => {
                    if (item.category.includes(selectCategory.value)) {
                        arr.push(item);
                    }
                });
            } else {
                arr = [...pluginStore.plugins];
            }
            
            // 如果開啟「只顯示已收藏」,再進行收藏篩選
            if (showCollected.value && stateStore.userContent.collectPlugins) {
                arr = arr.filter(item => 
                    stateStore.userContent.collectPlugins.some(
                        collected => collected.ID === item.ID
                    )
                );
            }
            return [...new Set(arr)];
        });
        const setSelectedCategory = (category) => {
            currentPage.value = 1;
            selectCategory.value = category || '';
            activeCategory.value = category || ''; // 更新選中狀態
        };
        // 控制 Modal 開關
        let isOpen = ref(false);
        let isNew = ref(false);
        let pluginIndex = ref(0);
        const tempPlugin = ref({});
        // 帶有id的插件網址
        const route = useRoute();
        const router = useRouter();

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
                        // 不需要再次呼叫 pluginContent,直接設定即可
                        const pluginId = item.ID;
                        const routeName = props.pluginType === 'third' ? 'thirdPlugins' : 'plugin';
                        router.replace({ name: routeName, params: { pluginId } });
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
        function pluginContent(index, item, clickEvent = null) {
            // 點收藏按鈕的話不開啟modal
            if (clickEvent && clickEvent.target.closest('button')) {
                return;
            }
            pluginIndex.value = index;
            tempPlugin.value = { ...item };
            tempPlugin.value.url = route.path + '/' + item.ID;
            isOpen.value = true;
            // 根據插件類型更新URL中的ID
            const pluginId = tempPlugin.value.ID;
            const routeName = props.pluginType === 'third' ? 'thirdPlugins' : 'plugin';
            router.replace({ name: routeName, params: { pluginId } });
        }
        // 監聽路由變化更新網頁標題
        router.beforeEach((to, from, next) => {
            const pluginTitle = tempPlugin.value.name;
            const isThirdParty = props.pluginType === 'third';
            // 根據插件類型設定不同的預設標題
            const defaultTitle = isThirdParty 
                ? '第三方插件 - 亞馬屋羅提後花園2.0' 
                : '插件列表 - 亞馬屋羅提後花園2.0';
            // 檢查是否有設置了插件名稱，如果有就使用插件名稱作為網頁標題，否則使用預設標題
            const title = pluginTitle || defaultTitle;
            const isFromList = from.name === 'pluginsList' || from.name === 'thirdPluginsList';
            const isToPlugin = to.name === 'plugin' || to.name === 'thirdPlugins';
            if (isFromList && isToPlugin) {
                document.title = `${title} - 亞馬屋羅提後花園2.0`;
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
            if (pluginIndex.value < currentPageData.value.length - 1 && isEdit.value === false) {
                pluginIndex.value++;
            }
        }
        // 監聽pluginIndex改變tempPlugin
        watch(
            pluginIndex, (newValue) => {
                let item;
                if (newValue > 10) {
                    item = filterPlugin.value[newValue];
                } else {
                    item = currentPageData.value[newValue];
                }
                pluginContent(newValue, item);
            }
        );
        // 監聽pluginType改變重設currentPage
        watch(() => props.pluginType, () => {
            currentPage.value = 1;
            // 可選:跳至最上面
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        // 關閉 Modal 
        function closeModal() {
            isOpen.value = false;
            isNew.value = false;
            isEdit.value = false;
            tempPlugin.value = {};    
            // 根據插件類型返回對應的列表頁面
            const listRouteName = props.pluginType === 'third' ? 'thirdPluginsList' : 'pluginsList';
            router.push({ name: listRouteName });
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

        // 監聽插件視窗開啟的話背景不可捲動
        watch(isOpen, (newVal) => {
            const body = document.querySelector('body');
            if (newVal) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });


        // 分頁＋搜尋功能
        const currentPage = ref(1);
        const perPage = 10;

        const totalPages = computed(() => {
            return Math.ceil(filteredData.value.length / perPage);
        });
        const windowWidth = ref(window.innerWidth);
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
        const currentPageData = computed(() => {
            if (windowWidth.value > 820) {
                const startIndex = (currentPage.value - 1) * perPage;
                const endIndex = startIndex + perPage;
                return filteredData.value.slice(startIndex, endIndex);
            } else {
                return filteredData.value;
            }
        });

        function changePage(direction) {
            if (direction === 'prev' && currentPage.value > 1) {
                currentPage.value -= 1;
            } else if (direction === 'next' && currentPage.value < totalPages.value) {
                currentPage.value += 1;
            } else {
                currentPage.value = direction + 1;
            }
            // 跳至最上面
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        watch(() => {
            return searchKeyword.value;
        }, () => {
            currentPage.value = 1; // Reset current page when search keyword changes
        });

        // 收藏插件
        function pluginCollection(plugin) {
            // 確保 collectPlugins 陣列存在
            if (!stateStore.userContent.collectPlugins) {
                stateStore.userContent.collectPlugins = [];
            }
            
            // 檢查是否已收藏
            const alreadyCollected = stateStore.userContent.collectPlugins.some(
                item => item.ID === plugin.ID
            );
            
            // 將pluginID和name寫入使用者收藏資料中
            if (alreadyCollected) {
                stateStore.removeCollectPlugin(plugin.ID);
                Swal.fire({
                    title: "已從收藏移除",
                    icon: 'success',
                })
            } else {
                stateStore.addCollectPlugin(plugin.ID, plugin.name);
                Swal.fire({
                    title: "已加入收藏",
                    icon: 'success',
                })
            }
        }
        // 檢查插件是否已收藏
        function isCollected(pluginID) {
            return stateStore.userContent.collectPlugins?.some(
                plugin => plugin.ID === pluginID
            ) || false;
        }

        return {
            pluginStore,
            selectCategory,
            activeCategory,
            filterPlugin,
            showCollected,
            isOpen,
            tempPlugin,
            pluginIndex,
            pluginContent,
            pluginCollection,
            isCollected,
            updateModal,
            closeModal,
            newPlugin,
            isNew,
            prePlugin,
            nextPlugin,
            editHandler,
            isEdit,
            getPluginURL,
            currentPage,
            perPage,
            totalPages,
            currentPageData,
            changePage,
            searchKeyword,
            filteredData,
            setSelectedCategory,
            themeClasses,
        }
    },
    components: {
        pluginModel,
        pluginCategoryList,
        Dialog,
        DialogPanel,
        TransitionRoot,
        TransitionChild,
        scrollToTop,
    }
}
</script>