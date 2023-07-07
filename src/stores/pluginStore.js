import { defineStore } from "pinia";
import { ref, child, update, push, onValue, remove } from "firebase/database";
import { database } from "../stores/firebasedb";

export const usePluginsStore = defineStore("plugins", {
    // 其他配置...
    state: () => ({
        isLogin: false,
        isLoading: false,
        isThirdPlugin: false,
        plugins: [],
        reviewPlugins: [],
        category: [
            "UI優化相關",
            "戰鬥相關",
            "改善遊戲體驗",
            "座標地圖相關",
            "成就相關",
            "金蝶房屋交易版",
            "外觀、BGM、RP友善",
        ],
    }),
    actions: {
        getPlugin() {
            this.plugins = [];
            this.isLoading = true;
            const pluginName = this.isThirdPlugin ? 'thirdPlugins/' : 'plugins/'; // 根据isThirdPlugin确定pluginName
            const onPlugin = ref(database, pluginName);
            onValue(onPlugin, (snapshot) => {
                const callbackPlugins = snapshot.val();
                // 遍歷每個插件
                for (const key of Object.keys(callbackPlugins)) {
                    const plugin = callbackPlugins[key];
                    // 將插件的 ID 添加到插件物件中
                    plugin.ID = key;
                }
                // 物件轉陣列
                this.plugins = Object.values(callbackPlugins);
                this.isLoading = false;
            });
        },
        getReviewPlugin() {
            const onPlugin = ref(database, "editPlugin/");
            onValue(onPlugin, (snapshot) => {
                const reviewPlugins = snapshot.val();
                if (reviewPlugins !== null) {
                    // 遍歷每個插件
                    for (const key of Object.keys(reviewPlugins)) {
                        const plugin = reviewPlugins[key];
                        // 將插件的 ID 添加到插件物件中
                        plugin.ID = key;
                    }
                    // 物件轉陣列
                    this.reviewPlugins = Object.values(reviewPlugins);
                }
            });
        },
        setPlugin(plugin) {
            const dbRef = database;
            const value = plugin._value;
            const pluginName = this.isThirdPlugin ? 'thirdPlugins' : 'plugins';
            const newPluginKey = push(child(ref(dbRef), pluginName)).key;
            const updates = {};
            updates[`editPlugin/` + newPluginKey] = value;
            return update(ref(dbRef), updates);
        },
        updatePlugin(plugin) {
            const dbRef = database;
            const value = plugin._value;
            const ID = plugin._value.ID;
            const updates = {};
            updates[`editPlugin/` + ID] = value;
            return update(ref(dbRef), updates);
        },
        reviewPlugin(plugin) {
            const value = plugin._value;
            const ID = plugin._value.ID;
            // 有第三方插件庫網址就更改路徑
            const pluginName = plugin._value.thirdPluginURL ? 'thirdPlugins/' : 'plugins/';
            const updates = {};
            updates[pluginName + ID] = value;
            updates[`editPlugin/` + ID] = null; // 將刪除操作添加到更新操作中
            return update(ref(database), updates)
                .then(() => {
                    return remove(ref(database), "editPlugin/" + ID);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
});
