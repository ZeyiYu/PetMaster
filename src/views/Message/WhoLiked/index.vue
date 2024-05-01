<template>
  <div class="message-liked">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
          left-text="Back"
          title="Likes"
          left-arrow
          @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div class="message-liked-wrapper">
        <template v-if="likedPosts" v-for="item in likedPosts">
          <WhoLikedItem :userInfo="item"></WhoLikedItem>
          <div class="line"></div>
        </template>
        <div v-else class="loading flex_center_center">
          <van-loading type="spinner"></van-loading>
        </div>
      </div>
      <Footer :active="3"></Footer>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import {ConfigProviderThemeVars} from "vant";
import {getLikedList} from "@/assets/api/Social/UserPost";
import {useUserStore} from "@/store/userInfo";
import {getUserInfoById} from "@/assets/api/Social/User";
import videojs from "video.js";
import any = videojs.any;

const themeVars: ConfigProviderThemeVars = {
  navBarTitleFontSize: '18px',
  navBarBackground: '#F7F7F7'
};

const onClickLeft = () => history.back();
const userStore = useUserStore()
const userInfo = ref<any>([])
const likedPosts = ref()
const onWhoLiked = async () => {
  const result = await getLikedList(userStore.userId)
  likedPosts.value = result
  /*result.forEach((item: any) => {
    getUserInfoById(item.userId).then(res => {
      userInfo.value.push(res)
    })
  })*/
}
onMounted(() => {
  onWhoLiked()
})
</script>

<style lang="less" scoped>
.message-liked {
  background-color: #fff;
  height: calc(100vh - 50px);
  overflow-y: auto;

  &-wrapper {
    width: 100%;

    .loading {
      padding-top: 20px;
    }
  }
}
</style>
