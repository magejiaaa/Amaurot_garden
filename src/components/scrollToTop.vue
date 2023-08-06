<template>
    <button class="rounded-full text-grayBlue-500 border-2 border-grayBlue-500 bg-white/50 fixed w-12 h-12 bottom-10 right-4 md:hidden" @click="scrollToTop" ref="scrollToTopBtn">
        <font-awesome-icon icon="fa-solid fa-chevron-up" />
    </button>
</template>

<script>
import { ref } from 'vue';
export default {
    setup() {
        const scrollToTopBtn = ref(null);
        const scrollToTop = () => {
            // 使用 scrollTo 方法将页面滚动到顶部
            window.scrollTo({
                top: 0,
                behavior: 'smooth', // 平滑滚动效果
            });
        };

        return {
            scrollToTopBtn,
            scrollToTop,
        };
    }
}
</script>