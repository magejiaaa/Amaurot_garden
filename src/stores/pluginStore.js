import { defineStore } from 'pinia'
// import { database } from './firebasedb';

export const usePluginsStore = defineStore('plugins', {
    // 其他配置...
    state: () => ({
        plugins: [],
    }),
    actions: {
        getFirebasePlugins() {

        }
    }
})