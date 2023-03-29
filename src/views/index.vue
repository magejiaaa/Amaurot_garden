<template>
    <menuNav></menuNav>

    <div class="container-none mx-auto pt-20">
        <!-- banner -->
        <div class="text-center py-16 | banner">
            <div class="w-8/12 mx-auto">
                <h1 class="text-5xl font-bold">Dalamud</h1>
                <p class="my-5 font-light">所有插件的基底，功能包含快速啟動與更新、第三方插件管理、記憶多組帳號密碼、上傳交易板價格資料至Universalis等多項功能</p>
                <div class="flex justify-center mx-auto mb-5">
                    <div class="btnfather mr-4">
                        <a type="button" class="btn btn-primary btn-lg px-4 downloadbtn"
                            href="https://github.com/goatcorp/FFXIVQuickLauncher/releases"
                            target="_blank">下載Dalamud(github)</a>
                    </div>
                    <div class="btnfather">
                        <a type="button" class="btn btn-secondary btn-lg px-4 downloadbtn cn"
                            href="https://bbs.tggfl.com/topic/32/dalamud-%E5%8D%AB%E6%9C%88%E6%A1%86%E6%9E%B6"
                            target="_blank">CN版介紹</a>
                    </div>
                </div>
                <div class="alert alert-light mb-4" role="alert">
                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
                        <use xlink:href="#exclamation-triangle-fill" />
                    </svg>
                    國際服需至github下載，且插件功能不支援中文化後的國際服
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import menuNav from '../components/Usermenu.vue';

export default {
    components: {
        menuNav,
    },
}
</script>