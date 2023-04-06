import { defineStore } from 'pinia'
import { ref, child, get, update, push } from 'firebase/database';
import { database } from '../stores/firebasedb';

export const usePluginsStore = defineStore('plugins', {
    // 其他配置...
    state: () => ({
        isLogin: false,
        plugins: [],
        category: [
            'UI優化相關', '戰鬥相關', '改善遊戲體驗', '座標地圖相關', '成就相關', '金蝶房屋交易版', '外觀、BGM'
        ]
    }),
    actions: {
        getPlugin() {
            const dbRef = ref(database);
            get(child(dbRef, 'plugins')).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                    const plugins = snapshot.val();
                    // 遍歷每個插件
                    for (const key of Object.keys(plugins)) {
                        const plugin = plugins[key];

                        // 將插件的 ID 添加到插件物件中
                        plugin.ID = key;
                    }
                    // 物件轉陣列
                    this.plugins = Object.values(plugins);
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        },
        setPlugin(plugin) {
            const dbRef = database;
            const value = plugin._value;
            const newPluginKey = push(child(ref(dbRef), 'plugins')).key;
            const updates = {};
            updates[`plugins/` + newPluginKey] = value;
            return update(ref(dbRef), updates);
        },
        updatePlugin(plugin) {
            const dbRef = database;
            const value = plugin._value;
            const ID = plugin._value.ID;
            const updates = {};
            updates[`plugins/` + ID] = value;
            return update(ref(dbRef), updates);
        }
    }
})