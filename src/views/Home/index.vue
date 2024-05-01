<template>
  <div class="home">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar title="PetMaster" fixed/>
      <HomeContent></HomeContent>
<!--      <van-tabs v-model:active="active1">
        <van-tab title="关注">
          <FollowingPosts></FollowingPosts>
        </van-tab>
        <van-tab title="推荐">
          <HomeContent></HomeContent>
        </van-tab>
        <van-tab title="视频">
          <Tiktok></Tiktok>
        </van-tab>
      </van-tabs>
      <div class="home-btn flex_center_center" @click="router.push('/newPost')">
        <Icon name="plus" size="20" color="#fff"></Icon>
      </div>-->
      <Footer></Footer>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import {Ref} from "vue";
import {ConfigProviderThemeVars} from "vant";

const themeVars: ConfigProviderThemeVars = {
  navBarTitleTextColor:'#2d4d6c'
};
const active1: Ref<number> = ref(1);
const router = useRouter()
</script>

<style lang="less" scoped>
.home {
  position: relative;
  height: 100%;
  background-color: #f4f4f5;

  &-btn {
    position: fixed;
    bottom: 70px;
    right: 20px;
    width: 40px;
    height: 40px;
    background-color: #1c85f1;
    box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
  }
}
</style>
