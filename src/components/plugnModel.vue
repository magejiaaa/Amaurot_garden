<template>
    <!-- 插件視窗 -->
    <div class="bg-white w-8/12 mx-auto rounded-lg p-8 h-4/5 overflow-auto">
        <div class="flex items-center justify-between text-grayBlue-500 mb-8">
            <h3>插件編輯</h3>
            <font-awesome-icon icon="fa-solid fa-xmark" class="h-6 fill-current cursor-pointer p-2" @click="closeModal" />
        </div>
        <div class="grid grid-cols-2 gap-x-6 gap-y-3 mb-6">
            <div>
                <label for="name">插件名稱(原文)</label>
                <input type="text" placeholder="請輸入插件名稱" id="name" v-model="tempPlugin.name" class="w-full">
            </div>
            <div>
                <label for="category">分類</label>
                <select id="category" v-model="tempPlugin.category" class="w-full leading-4">
                    <option value="" disabled>請選擇分類</option>
                    <option :value="item" v-for="(item, index) in pluginStore.category" :key="index">
                        {{ item }}
                    </option>
                </select>
            </div>
            <div class="col-span-2">
                <label for="describe">插件功能簡稱(不超過10個字)</label>
                <input type="text" placeholder="請輸入插件功能簡稱" id="describe" v-model="tempPlugin.describe" class="w-full">
            </div>
            <div class="col-span-2">
                <label for="pluginHTML">插件介紹</label>
                <tinycme-editor v-model="editorData"></tinycme-editor>
            </div>
        </div>
        <div class="flex text-center">
            <button class="btn" type="button" @click="closeModal">取消</button>
            <button class="btn" type="button" @click="updateModal">確定</button>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue'
import { usePluginsStore } from '../stores/pluginStore';
import TinycmeEditor from '../components/TinyMCE.vue';

export default {
    components: {
        TinycmeEditor,
    },
    props: {
        plugin: {
            type: Object,
            required: true,
        },
    },
    setup(props, { emit }) {
        const pluginStore = usePluginsStore();

        const tempPlugin = ref(props.plugin);
        const closeModal = () => {
            emit("close");
        };
        const updateModal = () => {
            emit("updateModal", tempPlugin);
        };

        // 編輯器
        const editorData = ref(tempPlugin.value.content);

        watch(editorData, (newValue) => {
            console.log(newValue);
        });

        return {
            closeModal,
            tempPlugin,
            updateModal,
            pluginStore,
            editorData,
        };
    }
}
</script>