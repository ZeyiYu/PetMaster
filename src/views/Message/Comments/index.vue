<template>
  <div class="me-comment">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
          left-text="Back"
          title="Comments"
          fixed
          left-arrow
          @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div class="me-comment-content" v-if="commentContent">
        <div class="me-comment-content-wrapper" v-for="item in commentContent">
          <CommentItem :commentContent="item"></CommentItem>
          <div class="line"></div>
        </div>
      </div>
      <div v-else class="loading flex_center_center">
        <van-loading type="spinner"></van-loading>
      </div>
      <Footer :footerActive="3"></Footer>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import type {ConfigProviderThemeVars} from 'vant';
import {useUserStore} from "@/store/userInfo";
import {getComments} from "@/assets/api/Social/UserPost";

const themeVars: ConfigProviderThemeVars = {
  navBarBackground: '#f4f4f5',
};
const onClickLeft = () => history.back();
const userStore = useUserStore()
const commentContent = ref()
const onComments = async () => {
  commentContent.value = await getComments(userStore.userId)
}
onMounted(() => {
  onComments()
})
</script>

<style lang="less" scoped>
.me-comment {
  height: 100%;
  background-color: #fff;

  &-content {
    background-color: #eaeaeb;
    padding-bottom: 40px;
    margin-top: 45px;

    &-wrapper {
      .line {
        width: 100%;
        height: 5px;
        background-color: #eaeaeb;
      }
    }
  }

  .loading {
    padding-top: 60px;
  }

}
</style>
