<template>
    <!-- 插件視窗 -->
    <div class="mx-auto p-4 overflow-auto relative text-left  md:p-8">
        <div class="flex items-center justify-between text-grayBlue-500 mb-8" :class="{
            'sticky top-0 bg-white mx-auto pb-4 border-b-2'
                : isEdit === false
        }">
            <div v-if="!pluginStore.isLogin || !isEdit" class="flex items-center">
                <div class="flex flex-wrap flex-auto md:items-center md:flex-row">
                    <h3 class="inline-block mb-2 w-full md:mb-0 md:w-auto">
                        {{ tempPlugin.name }}
                    </h3>
                    <span class="text-xs bg-grayBlue-500 text-white px-3 py-2 md:ml-2">
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

            <div class="grid grid-cols-2 mb-6 md:grid-cols-6">
                <p class="col-span-4 btn bg-gray-100 border">
                    {{ tempPlugin.describe }}
                </p>
                <a :href="tempPlugin.website" class="btn border border-grayBlue-300 col-span-2 text-center cursor-pointer mt-2
                hover:bg-grayBlue-100 md:ml-4 md:mt-0">插件原網址
                    <font-awesome-icon icon="fa-solid fa-link" />
                </a>
            </div>
            <!-- TODO: 製作多頁標籤顯示 -->
            <div v-html="tempPlugin.content" class="pluginContent"></div>
            <p v-if="isReview === true" class="mt-4 text-gray-500">編輯人員：{{ tempPlugin.editMember.name }}</p>
            <div class="mt-4">
                <span>感謝熱心民眾編輯</span>
                <button v-for="user in tempPlugin.allEditMember" :key="user.uid" class="mx-2 px-4 py-1 bg-grayBlue-100"
                    @click="openUserLink(user)">
                    {{ user.name }}
                </button>
            </div>

            <!-- TODO 留言板 -->
        </div>
        <!-- 有登入的可編輯內容 -->
        <div v-else>
            <div class="grid gap-x-6 gap-y-3 mb-6 grid-cols-2">
                <div class="col-span-2 md:col-auto">
                    <label for="name">插件名稱(原文)</label>
                    <input type="text" placeholder="請輸入插件名稱" id="name" v-model="tempPlugin.name" class="w-full">
                </div>
                <div class="col-span-2 md:col-auto">
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
                <!-- TODO 增加tempPlugin.分頁節點 -->
                <button>增加頁數</button>
            </div>
            <div class="flex justify-end mt-6">
                <button class="btn text-gray-500 border border-gray-500 mr-4
                    hover:bg-gray-500 hover:text-white" type="button" @click="handleClick">取消
                </button>
                <button class="btn bg-grayBlue-500 text-white border border-grayBlue-800
                    hover:bg-grayBlue-800" type="button" @click="updateModal" v-if="isReview === false">確定
                </button>
                <button class="btn bg-grayBlue-500 text-white border border-grayBlue-800
                    hover:bg-grayBlue-800" type="button" @click="checkModal" v-else>審核通過
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import { ref, watch } from 'vue';
import { usePluginsStore } from '../stores/pluginStore';
import { useStateStore } from '../stores/stateStore';
import TinycmeEditor from '../components/TinyMCE.vue';
import { useRouter } from 'vue-router'

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
        },
        isReview: {
            type: Boolean,
            required: false,
        }
    },
    setup(props, { emit }) {
        const router = useRouter();
        const pluginStore = usePluginsStore();
        const stateStore = useStateStore();
        // 點擊編輯按鈕
        const isEdit = ref(false);
        // 編輯器
        const editorData = ref("");
        // 監控編輯器結果
        watch(editorData, (newValue) => {
            tempPlugin.value.content = newValue;
        });
        const handleClick = () => {
            if (props.isNew === true) {
                // 新增插件的取消
                closeModal();
            } else {
                // 點編輯按紐後的取消
                if (stateStore.userID == '') {
                    alert('請先登入')
                } else {
                    isEdit.value = !isEdit.value;
                    emit("editing");
                    editorData.value = tempPlugin.value.content;
                }
            }
        }
        // 傳入外層指定資料
        const tempPlugin = ref(props.plugin);
        watch(
            // 避免 props.plugin 為 undefined 時報錯，this好煩 >:(
            () => props.plugin,
            (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    // console.log(newValue);
                    tempPlugin.value = newValue;
                }
            }
        );
        const closeModal = () => {
            emit("close");
            if (isEdit.value === true) {
                emit("editing");
            }
            isEdit.value = false;
        };
        // 送出時備註編輯人員
        const updateModal = () => {
            tempPlugin.value.editMember = {
                name: stateStore.userName,
                uid: stateStore.userID
            };
            emit("updateModal", tempPlugin);
        };
        // 審核用
        const checkModal = () => {
            if (!tempPlugin.value.allEditMember) {
                tempPlugin.value.allEditMember = [];
            }
            const isUidExist = tempPlugin.value.allEditMember.some(
                member => member.uid === tempPlugin.value.editMember.uid
            );
            if (!isUidExist) {
                tempPlugin.value.allEditMember.push(tempPlugin.value.editMember);
            } else {
                // 如果存在重複的uid，過濾出符合條件的元素
                const duplicateMembers = tempPlugin.value.allEditMember.filter(
                    member => member.uid === tempPlugin.value.editMember.uid
                );
                duplicateMembers.forEach(member => {
                    member.name = tempPlugin.value.editMember.name;
                });
                console.log(tempPlugin.value);
            }
            emit("checkModal", tempPlugin);
        }
        // 新增內容節點
        function addContent() {
            // TODO https://headlessui.com/vue/tabs
            // 使用tabs切換
            // 1.將content的資料轉為陣列 const contentArray = ref([]);
            // 2.for (const key in tempPlugin.content) {
            //   if (Object.hasOwnProperty.call(tempPlugin.content, key)) {
            //     contentArray.value.push(tempPlugin.content[key]);
            //   }
            // }
        }
        // 新增插件開放編輯
        if (props.isNew === true) {
            isEdit.value = true;
        }

        // 點擊感謝名單連結使用者頁面
        function openUserLink(user) {
            const id = user.uid;
            router.push(`/dashboard/user/${id}`);
        }

        return {
            closeModal,
            tempPlugin,
            updateModal,
            pluginStore,
            editorData,
            isEdit,
            handleClick,
            stateStore,
            checkModal,
            openUserLink,
        };
    }
}
</script>