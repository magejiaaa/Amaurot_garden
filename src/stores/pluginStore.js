import { defineStore } from 'pinia'
import { ref, child, get } from 'firebase/database';
import { database } from '../stores/firebasedb';

export const usePluginsStore = defineStore('plugins', {
    // 其他配置...
    state: () => ({
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
                    // 物件轉陣列
                    this.plugins = Object.values(snapshot.val());
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }
})