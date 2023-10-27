<template>
    <!-- 插件視窗 -->
    <div class="mx-auto p-4 overflow-auto relative text-left md:p-8">
        <loading-plugin :active="isLoading"></loading-plugin>
        <div :class="{
            'sticky top-0 bg-white mx-auto pb-4 border-b-2':
                isEdit === false,
            'text-blueGreen-500':
                pluginStore.isThirdPlugin === true,
            'text-grayBlue-500':
                pluginStore.isThirdPlugin === false,
        }" class="flex items-center justify-between mb-8">
            <div v-if="!pluginStore.isLogin || !isEdit" class="flex items-center">
                <div class="flex flex-wrap flex-auto md:items-center md:flex-row">
                    <h3 class="inline-block mb-2 w-full md:mb-0 md:w-auto">
                        {{ tempPlugin.name }}
                    </h3>
                    <span class="text-xs text-white px-3 py-2 md:ml-2" :class="{
                        'bg-blueGreen-500':
                            pluginStore.isThirdPlugin === true,
                        'bg-grayBlue-500':
                            pluginStore.isThirdPlugin === false,
                    }">
                        {{ tempPlugin.category }}
                    </span>
                    <!-- 編輯按鈕 -->
                    <button type="button" class="ml-4 text-gray-500 cursor-pointer px-3 py-1 rounded align-middle transition hover:bg-gray-200" @click="handleClick"
                        v-if="pluginStore.isLogin && isEdit === false">
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
            <div class="grid grid-cols-2 mb-6 items-center gap-1 md:grid-cols-6">
                <p class="col-span-4 btn bg-gray-100 border py-2">
                    {{ tempPlugin.describe }}
                </p>
                <a :href="tempPlugin.website" class="btn border  col-span-2 text-center cursor-pointer mt-2 py-2 md:mt-0" :class="{
                    'border-blueGreen-300 hover:bg-blueGreen-100 text-blueGreen-500 hover:text-blueGreen-800':
                        pluginStore.isThirdPlugin === true,
                    'border-grayBlue-300 hover:bg-grayBlue-100':
                        pluginStore.isThirdPlugin === false,
                }" target="_blank">插件原網址
                    <font-awesome-icon icon="fa-solid fa-link" />
                </a>
                <!-- 第三方插件庫顯示 -->
                <p v-if="plugin.thirdPluginURL" class="text-center">插件庫連結</p>
                <p v-if="plugin.thirdPluginURL" class="btn col-span-5 border py-2 break-all text-sm">{{ plugin.thirdPluginURL }}</p>
            </div>
            <!-- 多頁標籤顯示 -->
            <div class="col-span-2 flex justify-between" v-if="plugin.contentArr">
                <ul class="flex items-end flex-grow mb-2 gap-x-1">
                    <li v-for="(item, index) in plugin.contentArr" :key="index" @click="loadPages(item, index)">
                        <button class="border rounded px-2 py-1 text-gray-500" :class="{
                            'bg-grayBlue-100 border-grayBlue-300 text-grayBlue-500': item.title === contentObject.title || (index === 0 && !contentObject.title)
                        }">
                            {{ item.title }}
                        </button>
                    </li>
                </ul>
            </div>
            <!-- 單頁內容 -->
            <div v-html="tempPlugin.content === ''
                ? plugin.contentArr[0].content
                : tempPlugin.content
                " class="pluginContent border-b py-4" ref="contentRef"></div>

            <p v-if="tempPlugin.editMember && isReview === true" class="mt-4 text-gray-500">
                編輯人員：{{ tempPlugin.editMember.name }}
            </p>
            <div class="mt-4">
                <span>感謝熱心民眾編輯</span>
                <button v-for="user in tempPlugin.allEditMember" :key="user.uid" class="mx-2 px-4 py-1 bg-grayBlue-100" @click="openUserLink(user)">
                    {{ user.name }}
                </button>
            </div>

            <section class='comments' aria-labelledby="comment">
                <h2 id="comment">Comments</h2>
                <Disqus :shortname="shortname" :pageConfig="pageConfig" :key="tempPlugin.ID" />
            </section>
        </div>
        <!-- 有登入的可編輯內容 -->
        <div v-else>
            <div class="grid gap-x-6 gap-y-3 mb-6 grid-cols-2">
                <div class="col-span-2 md:col-auto">
                    <label for="name"><span class="text-red-500">*</span>插件名稱(原文)</label>
                    <input type="text" placeholder="請輸入插件名稱" id="name" required v-model="tempPlugin.name" class="w-full" />
                </div>
                <div class="col-span-2 md:col-auto">
                    <label for="category"><span class="text-red-500">*</span>分類</label>
                    <select id="category" v-model="tempPlugin.category" required class="w-full leading-4">
                        <option value="" disabled>請選擇分類</option>
                        <option :value="item" v-for="(item, index) in pluginStore.category" :key="index">
                            {{ item }}
                        </option>
                    </select>
                </div>
                <div class="col-span-2">
                    <label for="describe"><span class="text-red-500">*</span>插件功能簡稱(不超過10個字)</label>
                    <input type="text" placeholder="請輸入插件功能簡稱" id="describe" required v-model="tempPlugin.describe" class="w-full" />
                </div>
                <div class="col-span-2">
                    <label for="website">插件原網址</label>
                    <input type="url" placeholder="請輸入插件原網址" id="website" v-model="tempPlugin.website" class="w-full" />
                </div>
                <div class="col-span-2" v-if="pluginStore.isThirdPlugin || isReview">
                    <label for="thirdPluginOwn">第三方插件作者</label>
                    <input type="text" placeholder="請輸入第三方插件作者" id="thirdPluginOwn" v-model="tempPlugin.thirdPluginOwn" class="w-full" />
                </div>
                <div class="col-span-2" v-if="pluginStore.isThirdPlugin || isReview">
                    <label for="thirdPluginURL"><span class="text-red-500">*</span>第三方插件庫</label>
                    <input type="text" placeholder="請輸入第三方插件庫URL" id="thirdPluginURL" v-model="tempPlugin.thirdPluginURL" class="w-full" />
                </div>
                <!-- 插件分頁編輯 -->
                <div class="col-span-2 flex items-end">
                    <div class="flex-auto mr-4" v-if="multiPage == true">
                        <label for="pagetitle">分頁標題</label>
                        <input type="text" placeholder="請輸入分頁標題" id="pagetitle" v-model="contentObject.title" class="w-full" />
                    </div>
                    <!-- 增加tempPlugin.分頁節點 -->
                    <button class="border px-3 py-2 rounded bg-grayBlue-500 text-white flex-none" v-if="isPageNew == true" @click="addPages">
                        增加頁數
                    </button>
                    <button class="border px-3 py-2 rounded bg-grayBlue-500 text-white flex-none" v-else @click="updatePage">
                        確認修改
                    </button>
                    <p class="text-sm text-red-500" ref="multiText">※可增加分頁標籤，如果內容太多可透過分頁展示，視窗就不會太長</p>
                </div>
                <!-- contentArray的陣列按鈕列表 -->
                <ul v-if="tempPlugin.contentArr" class="flex items-end border-b flex-grow col-span-2">
                    <li v-for="(item, index) in tempPlugin.contentArr" :key="index" @click="loadPages(item, index)" class="border-t border-l border-r rounded-t px-2 py-1" :class="{
                        'bg-grayBlue-100':
                            contentObject.title === item.title,
                    }">
                        {{ item.title }}
                        <button class="border-none px-1" @click="deletePage(index)">
                            <font-awesome-icon icon="fa-solid fa-xmark" />
                        </button>
                    </li>
                </ul>
                <div class="col-span-2">
                    <label for="pluginHTML">插件介紹</label>
                    <tinycme-editor v-model="editorData"></tinycme-editor>
                </div>
            </div>
            <div class="flex justify-end mt-6">
                <button class="btn text-gray-500 border border-gray-500 mr-4 hover:bg-gray-500 hover:text-white" type="button" @click="handleClick">
                    取消
                </button>
                <button class="btn bg-grayBlue-500 text-white border border-grayBlue-800 
                hover:bg-grayBlue-800
                disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-400" type="submit" @click="updateModal" v-if="isReview === false" ref="submitButton">
                    確定
                </button>
                <!-- 審核畫面才出現 -->
                <button class="btn bg-grayBlue-500 text-white border border-grayBlue-800 hover:bg-grayBlue-800" type="button" @click="checkModal" v-else>
                    審核通過
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch, reactive, nextTick, onMounted } from "vue";
import { usePluginsStore } from "../stores/pluginStore";
import { useStateStore } from "../stores/stateStore";
import TinycmeEditor from "../components/TinyMce.vue"; // 不能刪
import { useRouter, useRoute } from "vue-router";
import Swal from 'sweetalert2';
import { Disqus } from 'vue-disqus'

export default {
    components: {
        TinycmeEditor,
        Disqus
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
        },
    },
    setup(props, { emit }) {
        const route = useRoute();
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
        // 編輯、取消按鈕
        const handleClick = () => {
            if (props.isNew === true) {
                // 新增插件的取消
                closeModal();
            } else {
                // 點編輯按紐後的取消
                if (stateStore.userID == "") {
                    Swal.fire({
                        title: "請先登入",
                        icon: 'warning',
                    })
                } else {
                    if (isEdit.value === true) {
                        Swal.fire({
                            title: "尚未儲存編輯的內容，是否退出？",
                            icon: 'warning',
                            showDenyButton: true,
                            confirmButtonText: '是',
                            deniedButtonText: '否',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                contentObject.title = "";
                                isEdit.value = false;
                            }
                        })
                    } else {
                        // 有分頁的插件要編輯
                        if (props.plugin.contentArr) {
                            loadPages(props.plugin.contentArr, 0);
                        } else {
                            editorData.value = tempPlugin.value.content;
                        }
                        isEdit.value = !isEdit.value;
                        emit("editing");
                    }
                }
            }
        };
        // 傳入外層指定資料
        const tempPlugin = ref(props.plugin);
        // 留言板
        const disqusRef = ref(null);
        const shortname = 'amaroutPlugins';
        let pageConfig = ref({
            identifier: tempPlugin.value.ID,
            url: 'https://amaurot-garden.web.app' + tempPlugin.value.url
        });

        watch(
            // 避免 props.plugin 為 undefined 時報錯，this好煩 >:(
            () => props.plugin,
            (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    tempPlugin.value = newValue;
                    pageConfig.value.identifier = tempPlugin.value.ID;
                    pageConfig.value.url = 'https://amaurot-garden.web.app' + tempPlugin.value.url;
                }
                console.log(pageConfig.value.url);
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
                uid: stateStore.userID,
            };
            // 驗證必填欄位
            if (
                tempPlugin.value.name &&
                tempPlugin.value.category &&
                tempPlugin.value.describe &&
                (!pluginStore.isThirdPlugin || tempPlugin.value.thirdPluginURL)
            ) {
                emit("updateModal", tempPlugin);
            } else {
                Swal.fire({
                    title: "尚有必填欄位未填寫！",
                    icon: 'warning',
                })
            }
        };
        // 審核用
        const checkModal = () => {
            if (!tempPlugin.value.allEditMember) {
                tempPlugin.value.allEditMember = [];
            }
            // 檢查是否有相同的uid
            const isUidExist = tempPlugin.value.allEditMember.some(
                (member) => member.uid === tempPlugin.value.editMember.uid
            );
            if (!isUidExist) {
                tempPlugin.value.allEditMember.push(
                    tempPlugin.value.editMember
                );
            } else {
                // 如果存在重複的uid，過濾出符合條件的元素
                const duplicateMembers = tempPlugin.value.allEditMember.filter(
                    (member) => member.uid === tempPlugin.value.editMember.uid
                );
                duplicateMembers.forEach((member) => {
                    member.name = tempPlugin.value.editMember.name;
                });
            }
            emit("checkModal", tempPlugin);
        };

        // 多頁時的內容陣列
        const contentArray = ref([]);
        // 點擊新增分頁後增加標題欄位
        let multiPage = ref(false);
        // 點擊按鈕新增多頁標題輸入欄位
        const contentObject = reactive({});
        // 偵測是新增還是修改
        let isPageNew = ref(true);
        const submitButton = ref(null);
        const multiText = ref(null);
        function addPages() {
            // 第一次按新增頁數
            if (multiPage.value === false) {
                multiPage.value = true;
                contentObject.content = tempPlugin.value.content;
                submitButton.value.disabled = true; // 添加 disabled 属性
                multiText.value.style.display = 'none'; // 设置为不可见
            } else {
                if (contentObject.title) {
                    contentArray.value = tempPlugin.value.contentArr;
                    // 先複製一份 contentObject(避免推進陣列前被清空)
                    const newObj = { ...contentObject };
                    // 將複製的物件推進陣列
                    contentArray.value.push(newObj);
                    submitButton.value.disabled = false; // 添加 disabled 属性
                    clearEditPage();
                } else {
                    Swal.fire({
                        title: "請輸入分頁名稱",
                        icon: 'warning',
                    })
                }
            }
        }
        // 清空編輯器內容
        function clearEditPage() {
            // 清空輸入欄位
            Object.assign(contentObject, {
                content: "",
                title: "",
            });
            editorData.value = "";
        }

        // 點擊分頁列表出現在編輯器&標題
        let pageIndex = 0;
        function loadPages(item, index) {
            if (tempPlugin.value.content !== tempPlugin.value.contentArr[pageIndex].content && editorData.value !== "") {
                Swal.fire({
                    title: "編輯尚未儲存，是否放棄編輯內容？",
                    icon: 'warning',
                    showDenyButton: true,
                    confirmButtonText: '是',
                    deniedButtonText: '否',
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        pageIndex = index;
                        isPageNew.value = false;
                        contentObject.title = item.title;
                        editorData.value = item.content;
                    }
                })
            } else if (pageIndex == 0 && props.plugin.content == "") {
                editorData.value = tempPlugin.value.contentArr[0].content;
                contentObject.title = tempPlugin.value.contentArr[0].title;
            } else {
                // 沒有變更才換頁
                pageIndex = index;
                isPageNew.value = false;
                contentObject.title = item.title;
                editorData.value = item.content;
            }
        }
        // 修改分頁內容
        function updatePage() {
            const writeArr = tempPlugin.value.contentArr;
            if (writeArr) {
                writeArr[pageIndex].title = contentObject.title;
                writeArr[pageIndex].content = editorData.value;
                clearEditPage();
                isPageNew.value = true;
                multiPage.value = true;
            } else {
                Swal.fire({
                    title: "請填寫分頁名稱",
                    icon: 'warning',
                })
            }
        }
        // 刪除分頁
        function deletePage(index) {
            Swal.fire({
                title: "確定刪除此分頁？",
                icon: 'warning',
                showDenyButton: true,
                confirmButtonText: '是',
                deniedButtonText: '否',
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    tempPlugin.value.contentArr.splice(index, 1);
                }
            })
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

        // 獲取所有圖片並在加載完成後關閉vue-loading-overlay
        const isLoading = ref(false);
        const contentRef = ref(null); // 使用 ref 創建容器的參考
        const applyLazyLoad = () => {
            nextTick(() => {
                let imgTags;
                if (contentRef.value != null) {
                    imgTags = contentRef.value.querySelectorAll("img");
                    if (imgTags.length > 0) {
                        imgTags.forEach((img) => {
                            isLoading.value = true;
                            img.onload = () => {
                                // console.log("所有圖片已加載完成");
                                isLoading.value = false; // 隱藏 loading 畫面
                            };
                        });
                    }
                }
            });
        };

        onMounted(() => {
            applyLazyLoad();
        });

        watch(tempPlugin, () => {
            applyLazyLoad();
        });

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
            addPages,
            multiPage,
            contentObject,
            contentArray,
            loadPages,
            isPageNew,
            updatePage,
            pageIndex,
            deletePage,
            contentRef,
            applyLazyLoad,
            isLoading,
            submitButton,
            multiText,
            pageConfig,
            shortname,
            disqusRef
        };
    },
};
</script>
