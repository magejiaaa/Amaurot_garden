<template>
    <!-- 插件視窗 -->
    <div class="bg-white w-8/12 mx-auto rounded-lg p-8 h-4/5 overflow-auto relative">
        <div class="flex items-center justify-between text-grayBlue-500 mb-8" :class="{
            'sticky top-0 bg-white mx-auto pb-4 border-b-2'
                : isEdit === false
        }">
            <h3 v-if="pluginStore.isLogin && isEdit">插件編輯</h3>
            <div v-else class="flex items-center">
                <div class="flex flex-auto items-center">
                    <h3 class="inline-block">
                        {{ tempPlugin.name }}
                    </h3>
                    <span class="text-xs bg-grayBlue-500 text-white px-3 py-2 ml-2">
                        {{ tempPlugin.category }}
                    </span>
                    <font-awesome-icon icon="fa-solid fa-pen-to-square" class="w-7 h-7 ml-4 text-gray-500 cursor-pointer"
                        @click="handleClick" />
                </div>
            </div>
            <font-awesome-icon icon="fa-solid fa-xmark" class="h-6 fill-current cursor-pointer p-2" @click="closeModal" />
        </div>
        <!-- 有登入的可編輯內容 -->
        <div class="grid grid-cols-2 gap-x-6 gap-y-3 mb-6" v-if="pluginStore.isLogin && isEdit">
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
                <label for="website">插件原網址</label>
                <input type="url" placeholder="請輸入插件原網址" id="website" v-model="tempPlugin.website" class="w-full">
            </div>
            <div class="col-span-2">
                <label for="pluginHTML">插件介紹</label>
                <tinycme-editor v-model="editorData"></tinycme-editor>
            </div>
        </div>
        <!-- 沒登入的介紹 -->
        <div v-else :class="{ 'mt-6': !isEdit }">
            <div class="grid grid-cols-6 mb-6">
                <p class="col-span-4 btn bg-gray-100 border">
                    {{ tempPlugin.describe }}
                </p>
                <a :href="tempPlugin.website" class="btn border border-grayBlue-300 col-span-2 ml-4 text-center cursor-pointer
                                hover:bg-grayBlue-100">插件原網址
                    <font-awesome-icon icon="fa-solid fa-link" />
                </a>
            </div>
            <div v-html="tempPlugin.content"></div>
        </div>
        <div class="flex justify-end mt-6" v-if="pluginStore.isLogin && isEdit">
            <button class="btn text-gray-500 border border-gray-500 mr-4
                            hover:bg-gray-500 hover:text-white" type="button" @click="closeModal">取消</button>
            <button class="btn bg-grayBlue-500 text-white border border-grayBlue-800
                            hover:bg-grayBlue-800" type="button" @click="updateModal">確定</button>
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
        // 點擊編輯按鈕
        const isEdit = ref(false);
        const handleClick = () => {
            isEdit.value = true
        }

        const tempPlugin = ref(props.plugin);
        const closeModal = () => {
            emit("close");
            isEdit.value = false;
        };
        const updateModal = () => {
            emit("updateModal", tempPlugin);
        };

        // 編輯器
        const editorData = ref(tempPlugin.value.content);

        watch(editorData, (newValue) => {
            tempPlugin.value.content = newValue;
        });

        return {
            closeModal,
            tempPlugin,
            updateModal,
            pluginStore,
            editorData,
            isEdit,
            handleClick
        };
    }
}
</script>