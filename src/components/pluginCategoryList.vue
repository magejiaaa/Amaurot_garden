<template>
  <!-- 分類列表 -->
  <div class="md:max-w-xs mt-2 mx-auto md:mx-0 w-11/12 md:mt-0 md:border-r md:w-3/12 dark:border-gray-500">
      <!-- 手機：顯示收闔按鈕 -->
      <button
      class="md:hidden w-full px-4 py-4 bg-gray-200 dark:bg-black rounded mb-2"
      @click="menuIsOpen = !menuIsOpen"
      >
      {{ menuIsOpen ? '收合分類' : '展開分類' }}
      </button>
      <ul class="mx-auto overflow-y-auto md:my-8" 
      :class="[
          themeClasses.text800, 
          menuIsOpen ? 'max-h-auto' : 'max-h-0',
      ]">
          <li>
              <button 
                  class="btn w-full hover:bg-gray-300 rounded-none" 
                  :class="{ 'bg-gray-300 dark:bg-grayBlue-500': activeCategory === '' }"
                  @click="setSelectedCategory()">
                  顯示全部
              </button>
          </li>
          <li v-for="(item, index) in pluginStore.category" :key="index">
              <button class="btn w-full hover:bg-gray-300 rounded-none" 
              :class="{ 'bg-gray-300 dark:bg-grayBlue-500': activeCategory === item }"
              @click="setSelectedCategory(item)">{{ item
              }}</button>
          </li>
      </ul>
      <button type="button" class="btn w-full text-center md:mb-10 hover:bg-gray-300 rounded-none" 
          @click="$emit('update:showCollected', !showCollected)"
          :class="showCollected ? themeClasses.bg300 : ''"
          v-if="pluginStore.isLogin"
      >
          {{showCollected ? '顯示全部插件' : '只顯示已收藏插件'}}
      </button>
  </div>
</template>
<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { usePluginsStore } from '../stores/pluginStore';
  
  const props = defineProps({
    themeColor: {
      type: String,
      required: true,
    },
    activeCategory: {
      type: String,
      required: true,
    },
    showCollected: {
      type: Boolean,
      required: true,
    },
  });
  
  const emit = defineEmits(['update:activeCategory', 'update:showCollected']);
  
  const pluginStore = usePluginsStore();
  
  const themeClasses = computed(() => {
    return {
      text800: props.themeColor === 'dark' ? 'text-grayBlue-800 dark:text-grayBlue-200' : 'text-grayBlue-800',
      bg300: props.themeColor === 'dark' ? 'bg-grayBlue-300 dark:bg-grayBlue-600' : 'bg-grayBlue-300',
    }
  });
  
  const menuIsOpen = ref(true);

  // 自動偵測螢幕寬度變化
  onMounted(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) menuIsOpen.value = true
      else menuIsOpen.value = false
    })
  });
  
  // 設定選擇的分類，並發出事件給父組件
  const setSelectedCategory = (category = '') => {
    emit('update:activeCategory', category);
  };
</script>