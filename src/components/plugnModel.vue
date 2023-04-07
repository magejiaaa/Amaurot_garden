<template>
    <!-- 插件視窗 -->
    <div class="bg-white w-8/12 mx-auto rounded-lg p-8 h-4/5 overflow-auto relative">
        <div class="flex items-center justify-between text-grayBlue-500 mb-8" :class="{
            'sticky top-0 bg-white mx-auto pb-4 border-b-2'
                : isEdit === false
        }">

            <div v-if="!pluginStore.isLogin || !isEdit" class="flex items-center">
                <div class="flex flex-auto items-center">
                    <h3 class="inline-block">
                        {{ tempPlugin.name }}
                    </h3>
                    <span class="text-xs bg-grayBlue-500 text-white px-3 py-2 ml-2">
                        {{ tempPlugin.category }}
                    </span>
                    <!-- 編輯按鈕 -->
                    <button type="button" class="ml-4 text-gray-500 cursor-pointer px-3 py-1 rounded align-middle transition
                    hover:bg-gray-200" @click="handleClick">
                        <font-awesome-icon icon="fa-solid fa-pen-to-square" class="w-5 h-5" />
                        編輯
                    </button>
                </div>
            </div>
            <h3 v-else>插件編輯</h3>
            <font-awesome-icon icon="fa-solid fa-xmark" class="h-6 fill-current cursor-pointer p-2" @click="closeModal" />
        </div>
        <!-- 沒登入的介紹 -->
        <div v-if="!pluginStore.isLogin || !isEdit" :class="{ 'mt-6': !isEdit }" id="pluginsContent">
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
        <!-- 有登入的可編輯內容 -->
        <div v-else>
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
                    <label for="website">插件原網址</label>
                    <input type="url" placeholder="請輸入插件原網址" id="website" v-model="tempPlugin.website" class="w-full">
                </div>
                <div class="col-span-2">
                    <label for="pluginHTML">插件介紹</label>
                    <tinycme-editor v-model="editorData"></tinycme-editor>
                </div>
            </div>
            <div class="flex justify-end mt-6">
                <button class="btn text-gray-500 border border-gray-500 mr-4
                                        hover:bg-gray-500 hover:text-white" type="button" @click="handleClick">取消</button>
                <button class="btn bg-grayBlue-500 text-white border border-grayBlue-800
                                        hover:bg-grayBlue-800" type="button" @click="updateModal">確定</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import { usePluginsStore } from '../stores/pluginStore';
import { useStateStore } from '../stores/stateStore';
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
        isNew: {
            type: Boolean,
            required: false,
        }
    },
    setup(props, { emit }) {
        const pluginStore = usePluginsStore();
        const stateStore = useStateStore();
        // 點擊編輯按鈕
        const isEdit = ref(false);
        const handleClick = () => {
            if (props.isNew === true) {
                closeModal();
            } else {
                isEdit.value = !isEdit.value;
            }
        }

        const tempPlugin = ref(props.plugin);
        const closeModal = () => {
            emit("close");
            isEdit.value = false;
        };
        // 送出時備註編輯人員
        const updateModal = () => {
            tempPlugin.value.editMember = stateStore.userID;
            emit("updateModal", tempPlugin);
        };

        // 編輯器
        const editorData = ref(tempPlugin.value.content);
        // 監控編輯器結果
        watch(editorData, (newValue) => {
            tempPlugin.value.content = newValue;
        });

        // const isNewLocal = ref(props.isNew);
        if (props.isNew === true) {
            isEdit.value = true;
        }

        return {
            closeModal,
            tempPlugin,
            updateModal,
            pluginStore,
            editorData,
            isEdit,
            handleClick,
            stateStore
        };
    }
}
</script>