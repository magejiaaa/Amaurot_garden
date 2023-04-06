<template>
    <div>
        <div class="mt-20 bg-gray-100 flex">
            <!-- 分類列表 -->
            <div class="w-3/12 border-r">
                <ul class="mx-auto my-8 text-grayBlue-800">
                    <li>
                        <button class="btn w-full hover:bg-gray-300 rounded-none" @click="selectCategory = ''">顯示全部</button>
                    </li>
                    <li v-for="(item, index) in pluginStore.category" :key="index">
                        <button class="btn w-full hover:bg-gray-300 rounded-none" @click="selectCategory = item">{{ item }}</button>
                    </li>
                </ul>
            </div>

            <!-- 插件列表（管理版） -->
            <div class="w-8/12 py-10 px-5 mx-auto">
                <div class="mb-5 flex justify-between items-center">
                    <h3 class="text-2xl">插件列表</h3>
                    <button class="btn text-white bg-grayBlue-300 hover:bg-grayBlue-500"
                    @click="newPlugin()">新增插件</button>
                </div>
                <ul class="listGroup" v-if="filterPlugin.length > 0">
                    <li v-for="(item, index) in filterPlugin" :key="index" class="p-4 list grid-cols-4 "
                        @click="pluginContent(item)">
                        <p>{{ item.name }}</p>
                        <p class="font-light text-gray-500">{{ item.category }}</p>
                        <p class="col-span-2">{{ item.describe }}</p>
                    </li>
                </ul>
                <p v-else class="text-center">本分類下沒有插件</p>
            </div>
        </div>
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
                    enter-from="opacity-0 sm:translate-y-0 sm:scale-95"
                    enter-to="opacity-100 translate-y-0 sm:scale-100" 
                    leave="ease-in duration-200"
                    leave-from="opacity-100 translate-y-0 sm:scale-100"
                    leave-to="opacity-0 sm:translate-y-0 sm:scale-95">
                    <DialogPanel class="fixed w-full top-20 h-screen z-40">
                        <pluginModel :plugin="tempPlugin" @close="closeModal" @updateModal="updateModal"></pluginModel>
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </TransitionRoot>
    </div>
</template>

<script>
import { usePluginsStore } from '../stores/pluginStore';
import { ref, computed } from 'vue';
import pluginModel from '../components/plugnModel.vue';
import { Dialog, DialogPanel, TransitionRoot, TransitionChild } from '@headlessui/vue';

export default {
    setup() {
        const pluginStore = usePluginsStore();

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
        const tempPlugin = ref({});
        // 新增插件判別
        function newPlugin() {
            isNew.value = true;
            isOpen.value = true;
        }
        // 獲取當前插件資料
        function pluginContent(item) {
            tempPlugin.value = { ...item };
            isOpen.value = true;
        }
        // 關閉 Modal 
        function closeModal() {
            isOpen.value = false;
            tempPlugin.value = {};
        }
        function updateModal(item) {
            if (isNew.value === true) {
                // TODO: 新增插件不用審核
                pluginStore.setPlugin(item);
                closeModal();
                pluginStore.getPlugin();
            } else {
                pluginStore.updatePlugin(item);
                closeModal();
                pluginStore.getPlugin();
            }
        }

        return {
            pluginStore,
            selectCategory,
            filterPlugin,
            isOpen,
            tempPlugin,
            pluginContent,
            updateModal,
            closeModal,
            newPlugin
        }
    },
    components: {
        pluginModel,
        Dialog,
        DialogPanel,
        TransitionRoot,
        TransitionChild
    }
}
</script>