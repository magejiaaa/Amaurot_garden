<template>
    <div>
        <!-- 審核插件 -->
        <div class="w-8/12 py-10 px-5 mx-auto">
            <div class="mb-5 flex justify-between items-center">
                <h3 class="text-2xl">插件列表</h3>
            </div>

            <ul class="listGroup" v-if="reviewPlugin.length > 0">
                <li
                    v-for="(item, index) in reviewPlugin"
                    :key="index"
                    class="p-4 list grid-cols-4"
                    @click="pluginContent(item)"
                >
                    <p>{{ item.name }}</p>
                    <p class="font-light text-gray-500">{{ item.category }}</p>
                    <p class="col-span-2">{{ item.describe }}</p>
                </li>
            </ul>

            <p class="text-center" v-else>本分類下沒有插件</p>
        </div>

        <TransitionRoot
            :show="isOpen"
            as="template"
            enter="duration-300 ease"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
        >
            <Dialog class="relative z-30" as="div" @close="closeModal">
                <!-- Modal背景 -->
                <TransitionChild
                    as="template"
                    enter="ease-out duration-300"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="ease-in duration-200"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <div
                        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        @click="closeModal"
                    />
                </TransitionChild>
                <!-- Modal內容 -->
                <div class="fixed inset-0 overflow-y-auto">
                    <div
                        class="flex min-h-full items-center justify-center p-4 text-center"
                    >
                        <TransitionChild
                            as="template"
                            enter="ease-out duration-5000"
                            enter-from="opacity-0 sm:translate-y-0 sm:scale-95"
                            enter-to="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leave-from="opacity-100 translate-y-0 sm:scale-100"
                            leave-to="opacity-0 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel
                                class="fixed top-20 h-5/6 overflow-y-auto w-11/12 bg-white rounded-lg md:w-8/12"
                            >
                                <pluginModel
                                    :plugin="tempPlugin"
                                    @close="closeModal"
                                    :isReview="isReview"
                                    @checkModal="checkPlugin"
                                ></pluginModel>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>

<script>
import { usePluginsStore } from "../stores/pluginStore";
import { ref, computed } from "vue";
import {
    Dialog,
    DialogPanel,
    TransitionRoot,
    TransitionChild,
} from "@headlessui/vue";
import pluginModel from "../components/plugnModel.vue";

export default {
    setup() {
        const pluginStore = usePluginsStore();
        // 取得待審核插件
        const reviewPlugin = computed(() => {
            const arr = [];
            pluginStore.reviewPlugins.forEach((item) => {
                arr.push(item);
            });
            return arr;
        });

        // 控制 Modal 開關
        let isOpen = ref(false);
        const tempPlugin = ref({});
        // 獲取當前插件資料
        function pluginContent(item) {
            tempPlugin.value = { ...item };
            isOpen.value = true;
        }

        // 關閉視窗
        function closeModal() {
            isOpen.value = false;
            tempPlugin.value = {};
        }

        // 審核插件
        function checkPlugin(item) {
            pluginStore.reviewPlugin(item);
            closeModal();
            window.location.reload();
            console.log("審核成功");
        }

        // 讓 Modal 判定是否為 review
        const isReview = true;

        return {
            pluginStore,
            reviewPlugin,
            closeModal,
            pluginContent,
            isOpen,
            tempPlugin,
            isReview,
            checkPlugin,
        };
    },
    components: {
        pluginModel,
        Dialog,
        DialogPanel,
        TransitionRoot,
        TransitionChild,
    },
};
</script>
