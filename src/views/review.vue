<template>
    <div>
        <!-- 審核插件 -->
        <div class="w-8/12 py-10 px-5 mx-auto">
            <div class="mb-5 flex justify-between items-center">
                <h3 class="text-2xl">插件列表</h3>
            </div>

            <ul class="listGroup">
                <li v-for="(item, index) in pluginStore.reviewPlugin" :key="index" class="p-4 list grid-cols-4 ">
                    <p>{{ item.name }}</p>
                    <p class="font-light text-gray-500">{{ item.category }}</p>
                    <p class="col-span-2">{{ item.describe }}</p>
                </li>
            </ul>

            <p class="text-center">本分類下沒有插件</p>
        </div>
    </div>
</template>

<script>
import { usePluginsStore } from '../stores/pluginStore';
export default {
    setup() {
        const pluginStore = usePluginsStore();
        console.log(pluginStore);
        return {
            pluginStore,
        }
    }
}
</script>