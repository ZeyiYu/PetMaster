<template>
  <div class="square-eachSquare">
    <van-config-provider :theme-vars="themeVars">
      <template v-for="item in allSquare">
        <Item :eachSquare="item"></Item>
      </template>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import type {ConfigProviderThemeVars} from 'vant';
import {getSquareDetail} from "@/assets/api/Social/SquareCategory";
import eventBus from "@/utils/eventBus";

const route = useRoute()
const themeVars: ConfigProviderThemeVars = {};
const allSquare = ref()
const onEachSquare = async () => {
  allSquare.value = await getSquareDetail(route.params.categoryId)
}
watch(() => route.params.categoryId, () => {
  onEachSquare()
})

onMounted(() => {
  onEachSquare()
})
</script>

<style scoped lang="less">
.square-eachSquare {
  height: 100vh;
  overflow-y: auto;
  position: absolute;
  top: 40px;
  left: 65px;
  padding: 5px 5px 160px 20px;
  border-left: 1px solid #eee;
}
</style>
