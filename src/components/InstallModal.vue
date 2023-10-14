<template>
    <div class="mx-auto p-4 overflow-auto relative text-left md:p-8">
        <div class="flex items-center justify-between text-grayBlue-500 mb-8">
            <h3 v-if="installType === 'install'">安裝說明</h3>
            <h3 v-if="installType === 'setting'">遊戲內設定</h3>
            <h3 v-if="installType === 'third'">加載第三方插件</h3>
            <font-awesome-icon
                icon="fa-solid fa-xmark"
                class="h-6 fill-current cursor-pointer p-2"
                @click="closeModal"
            />
        </div>
        <!-- 安裝說明 -->
        <div class="mx-auto text-center" v-if="installType === 'install'">
            <a
                href="https://firebasestorage.googleapis.com/v0/b/amaurot-garden.appspot.com/o/xlinstall01.jpg?alt=media&token=1511f122-b923-4210-8075-849fd69dc592"
                target="_blank"
            >
                <img
                    src="../assets/images/xlinstall01.jpg"
                    class="mx-auto border rounded-3 mb-3"
                    alt=""
                    loading="lazy"
                    width="600"
                />
            </a>
            <p class="mb-5 mx-sm-5">
                點擊連結後再點選最上面日期的紅框處exe檔案，安裝，有跳出更新視窗確定即可。
            </p>
            <a
                href="https://firebasestorage.googleapis.com/v0/b/amaurot-garden.appspot.com/o/xlinstall02.jpg?alt=media&token=83d961ed-f11b-47de-b714-d599a0249197"
                target="_blank"
            >
                <img
                    src="../assets/images/xlinstall02.jpg"
                    class="mx-auto border rounded-3 mb-3"
                    alt=""
                    loading="lazy"
                />
            </a>
            <p class="mb-5 mx-sm-5">
                選擇包含game和boot的遊戲路徑，他不會自動幫你偵測，有安裝在D槽的人記得更改路徑，steam版本要勾選下面選項，剩下基本上一直下一步就好。
            </p>
            <a
                href="https://firebasestorage.googleapis.com/v0/b/amaurot-garden.appspot.com/o/xlinstall03.jpg?alt=media&token=92b57401-0e95-40e8-ac72-914f88fa8ad6"
                target="_blank"
            >
                <img
                    src="../assets/images/xlinstall03.jpg"
                    class="mx-auto border rounded-3 mb-3"
                    alt=""
                    loading="lazy"
                />
            </a>
            <p class="mb-5 mx-sm-5">
                紅框處可以記憶其他帳號，如果勾選自動登入，Loading畫面按住Shift即可
            </p>
        </div>

        <!-- 遊戲內設定 -->
        <div class="mx-auto text-center" v-if="installType === 'setting'">
            <p class="mx-5">一般設定</p>
            <a
                href="../src/assets/images/xlsetting01.jpg"
                target="_blank"
                ><img
                    src="../assets/images/xlsetting01.jpg"
                    class="mx-auto border rounded-3 mb-3"
                    alt=""
                    loading="lazy"
                    width="700"
            /></a>
            <p class="mx-5">外觀設定</p>
            <a href="../src/assets/images/xlsetting02.jpg" target="_blank">
                <img
                    src="../assets/images/xlsetting02.jpg"
                    class="mx-auto border rounded-3 mb-3"
                    alt=""
                    loading="lazy"
                    width="700"
                />
            </a>
            <a href="../src/assets/images/xlsetting03.jpg" target="_blank">
                <img
                    src="../assets/images/xlsetting03.jpg"
                    class="mx-auto border rounded-3 mb-3"
                    alt=""
                    loading="lazy"
                />
            </a>
            <!-- <p class="mx-sm-5">
                後面兩個一個是頂部的bar，遊戲內可使用"/xldev"呼叫出一個頂部控制bar，最後一個標籤是使用正在測試中未上架的插件。
            </p> -->
        </div>

        <!-- 加載第三方 -->
        <div class="mx-auto text-center" v-if="installType === 'third'">
            <p class="mx-sm-5">
                安裝插件版程式前，請先確認是否有安裝同作者同功能的獨立版程式，<a
                    href="https://github.com/LeonBlade/DalamudPlugins"
                    target="_blank"
                    >詳細請見此</a
                ><br />
                確保在啟動器設置中打開“啟用遊戲內功能”以訪問遊戲內命令和功能！(可使用"/xlplugins"等指令)
            </p>
            <a
                href="../src/assets/images/moreplugins01.jpg"
                target="_blank"
                ><img
                    src="../assets/images/moreplugins01.jpg"
                    class="mx-auto border rounded-3 mb-3"
                    alt=""
                    loading="lazy"
                    width="700"
            /></a>
            <a
                href="../src/assets/images/moreplugins011.png"
                target="_blank"
                ><img
                    src="../assets/images/moreplugins011.png"
                    class="mx-auto border rounded-3"
                    alt=""
                    loading="lazy"
                    width="700"
            /></a>
            <p class="mx-sm-5 mb-3">
                將網址貼上至新增的欄位後會出現"+"按鈕，之後點選儲存<br />
                Enabled那欄記得檢查有沒有打勾"√"
            </p>
            <img
                    src="../assets/images/moreplugins02.png"
                    class="mx-auto border rounded-3 mb-3"
                    alt=""
            />
            <p class="mx-sm-5">
                回到插件管理頁面，會發現多了新增的插件，此時需要點擊安裝，即可使用。
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        installType: {
            type: String,
            default: "",
        },
    },
    setup(props, { emit }) {
        const closeModal = () => {
            emit("close");
        };

        return {
            closeModal,
        };
    },
};
</script>
