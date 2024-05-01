<template>
  <div class="home-content">
    <van-config-provider :theme-vars="themeVars">
      <div class="home-content-posts">
        <PetInfo></PetInfo>
        <MapInfo></MapInfo>
        <CalorieInfo></CalorieInfo>


      </div>
      <!--      <div class="home-content-posts" v-for="item in allPosts" v-if="allPosts">
              <EachPost :postContent="item"></EachPost>
              <div class="line">
              </div>
            </div>-->
      <!--      <div v-else class="flex_center_center loading">
              <van-loading type="spinner"></van-loading>
            </div>-->
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import {Ref} from "vue";
import {ConfigProviderThemeVars} from "vant";
import {getPostCategory, getUserPost, getUserPostCount} from "@/assets/api/Social/UserPost";
import {useUserStore} from "@/store/userInfo";
import {transContent} from "@/utils/tools";

const themeVars: ConfigProviderThemeVars = {
  tabActiveTextColor: '#1e81e7',
  tabsBottomBarColor: '#fff'
};

</script>

<style lang="less" scoped>
.home-content {
  margin-top: 45px;
  //padding-bottom: 50px;
  background-color: #f4f4f5;
  //background-color: #f4f4f5;
  //border-top: 1px solid #eee;

  &-posts {
    padding-bottom: 50px;
  }

  .loading {
    padding-top: 20px;
  }
}
</style>
