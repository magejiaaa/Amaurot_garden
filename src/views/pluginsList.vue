<template>
    <div class="bg-gray-100 flex">
        <!-- 分類列表 -->
        <div class="w-3/12 border-r">
            <ul class="mx-auto my-8 text-grayBlue-800">
                <li>
                    <button class="btn w-full hover:bg-gray-300 rounded-none"
                    @click="selectCategory = ''">顯示全部</button>
                </li>
                <li v-for="(item, index) in pluginStore.category" :key="index">
                    <button class="btn w-full hover:bg-gray-300 rounded-none" @click="selectCategory = item">{{ item }}</button>
                </li>
            </ul>
        </div>
        <!-- 插件列表 -->
        <div class="w-8/12 py-10 px-5 mx-auto">
            <div class="mb-5 flex justify-between items-center">
                <h3 class="text-2xl">插件列表</h3>
                <button class="btn text-white bg-grayBlue-300 hover:bg-grayBlue-500">新增插件</button>
            </div>
            <ul class="listGroup" v-if="filterPlugin.length > 0">
                <li v-for="(item, index) in filterPlugin" :key="index" class="p-4 list grid-cols-4">
                    <p>{{ item.name }}</p>
                    <p>{{ item.category }}</p>
                    <p class="col-span-2">{{ item.describe }}</p>
                </li>
            </ul>
            <p v-else class="text-center">本分類下沒有插件</p>
        </div>
        <pluginModel></pluginModel>
    </div>
</template>

<script>
import { usePluginsStore } from '../stores/pluginStore';
import { ref, computed } from 'vue';
import pluginModel from '../components/plugnModel.vue';

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

        // 控制Model開關
        const modelOpen = false;

        return {
            pluginStore,
            selectCategory,
            filterPlugin,
            modelOpen,
        }
    },
    components: {
        pluginModel,
    }
}
</script>