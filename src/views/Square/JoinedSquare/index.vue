<template>
  <div class="square-joinedSquare">
    <van-config-provider :theme-vars="themeVars">
      <div v-if="mySquare" v-for="item in mySquare">
        <JoinedItem :eachSquare="item"></JoinedItem>
      </div>
      <div v-else class="loading flex_center_center">
        <van-loading type="spinner"></van-loading>
      </div>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import type {ConfigProviderThemeVars} from 'vant';
import {getUserAttentionSquare, getUserSquare} from "@/assets/api/Social/UserSquare";
import {useUserStore} from "@/store/userInfo";
import eventBus from "@/utils/eventBus";

const themeVars: ConfigProviderThemeVars = {};
const userStore = useUserStore()

const mySquare = ref()
const onJoinedSquare = async () => {
  mySquare.value = await getUserAttentionSquare()
}
const refreshSquare = () => {
  onJoinedSquare()
}
onMounted(() => {
  eventBus.on('refreshSquare', refreshSquare)
  onJoinedSquare()
})
</script>

<style scoped lang="less">
.square-joinedSquare {
  height: 100vh;
  overflow-y: auto;
  padding: 15px 10px;

}
</style>
