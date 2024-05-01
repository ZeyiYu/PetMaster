<template>
  <div class="me-myPosts">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
          left-text="Back"
          title="Posts"
          fixed
          left-arrow
          @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div v-if="myPosts" class="me-myPosts-content">
        <div class="me-myPosts-content-wrapper" v-for="item in myPosts">
          <EachPost :postContent="item"></EachPost>
          <div class="line"></div>
        </div>
      </div>
      <div v-else class="loading flex_center_center">
        <van-loading type="spinner"/>
      </div>
      <Footer :footerActive="3"></Footer>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import type {ConfigProviderThemeVars} from 'vant';
import {getUserPost} from "@/assets/api/Social/UserPost";
import {useUserStore} from "@/store/userInfo";
import {transContent} from "@/utils/tools";

const themeVars: ConfigProviderThemeVars = {
  navBarBackground: '#f4f4f5',
};
const onClickLeft = () => history.back();

const userStore = useUserStore()
const myPosts = ref()
const onMyPosts = async () => {
  const result = ref()
  result.value = await getUserPost({userId: userStore.userId})
  myPosts.value = result.value
  myPosts.value.map((item: any) => {
    transContent(item)
  });
}

onMounted(() => {
  onMyPosts()
})
</script>

<style lang="less" scoped>
.me-myPosts {
  height: 100%;
  //background-color: #eaeaeb;

  &-content {
    //background-color: #eaeaeb;
    padding-bottom: 40px;
    margin-top: 45px;

    &-wrapper {
      .line {
        width: 100%;
        height: 10px;
        background-color: #eaeaeb;
      }
    }
  }

  .loading {
    padding-top: 60px
  }

}
</style>
