<template>
    <menuNav></menuNav>

    <div class="container-none mx-auto pt-20">
        <!-- banner -->
        <div class="text-center py-16 h-full | banner">
            <div class="w-8/12 mx-auto">
                <h1 class="text-5xl inline-block font-bold">Dalamud</h1>
                <p class="my-5 font-light text-xl">
                    所有插件的基底，功能包含快速啟動與更新、第三方插件管理、記憶多組帳號密碼、上傳交易板價格資料至Universalis等多項功能
                </p>
                <div class="flex justify-center mx-auto mb-6 text-xl font-light">
                    <div class="relative mr-6">
                        <a type="button" class="btn downloadBtn"
                            href="https://github.com/goatcorp/FFXIVQuickLauncher/releases"
                            target="_blank">下載Dalamud(github)</a>
                    </div>
                    <div class="relative">
                        <a type="button" class="btn downloadBtn cn"
                            href="https://bbs.tggfl.com/topic/32/dalamud-%E5%8D%AB%E6%9C%88%E6%A1%86%E6%9E%B6"
                            target="_blank">CN版介紹</a>
                    </div>
                </div>
                <div class="bg-white mb-4 p-4 rounded text-gray-500" role="alert">
                    <font-awesome-icon icon="fa-solid fa-triangle-exclamation" 
                    class="h-5" />
                    國際服需至github下載，中文化後的國際服可以使用但有些人會糊糊的
                </div>
                <img src="https://raw.githubusercontent.com/goatcorp/FFXIVQuickLauncher/master/misc/screenshot.png"
                    class="img-fluid border rounded shadow my-4 mx-auto" alt="登陸器介面" width="700" height="500">
            </div>
        </div>
        <!-- 功能卡片 -->
        <div class="col-lg-10 mx-auto px-4">

        </div>
    </div>
</template>

<script>
import menuNav from '../components/Usermenu.vue';
import { usePluginsStore } from '../stores/pluginStore';
import { onMounted } from 'vue';

export default {
    setup() {
        const plugins = usePluginsStore();
        
        onMounted(() => {
            plugins.getPlugin();
        })

        return {

        }
    },
    components: {
        menuNav,
    },
}
</script>