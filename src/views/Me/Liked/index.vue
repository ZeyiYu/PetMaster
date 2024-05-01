<template>
  <div class="me-fans">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
          left-text="Back"
          title="Like/Collects"
          left-arrow
          @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div class="me-fans-content">
        <div class="me-fans-content-wrapper" v-if="postContent">
          <template v-for="item in postContent">
            <PostItem :postContent="item"></PostItem>
          </template>
        </div>
        <div v-else class="flex_center_center loading">
          <van-loading type="spinner"></van-loading>
        </div>
      </div>
      <Footer :footerActive="3"></Footer>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import type {ConfigProviderThemeVars} from 'vant';
import {likeAndCollect} from "@/assets/api/Social/ThumbUp";
import {useUserStore} from "@/store/userInfo";
import {transContent} from "@/utils/tools";

const themeVars: ConfigProviderThemeVars = {
  navBarBackground: '#fff',
};
const onClickLeft = () => history.back();
const postContent = ref()
const userStore = useUserStore()
const onLiked = async () => {
  postContent.value = await likeAndCollect(userStore.userId)
  postContent.value.map((item: any) => {
    transContent(item)
  });
}
onMounted(() => {
  onLiked()
})
</script>

<style lang="less" scoped>
.me-fans {
  height: 100%;
  background-color: #fff;

  &-content {
    background-color: #fff;
    padding-bottom: 60px;
    margin-top: 10px;

    &-wrapper {
      padding: 0px 10px;
    }
  }

}
</style>
