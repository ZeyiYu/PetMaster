<template>
  <div class="me-atMe">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
          left-text="Back"
          title="Mentions"
          fixed
          left-arrow
          @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div class="me-atMe-content">
        <div class="me-atMe-content-wrapper" v-if="postContent" v-for="item in postContent">
          <EachPost :postContent="item"></EachPost>
          <div class="line"></div>
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
import {useAtMe} from "@/views/Message/AtMe/UseAtMe";

const themeVars: ConfigProviderThemeVars = {
  navBarBackground: '#f4f4f5',
};
const onClickLeft = () => history.back();
const {postContent} = useAtMe()
</script>

<style lang="less" scoped>
.me-atMe {
  height: 100%;
  background-color: #fff;

  &-content {
    background-color: #fff;
    padding-bottom: 40px;
    margin-top: 45px;

    &-wrapper {
      .line {
        width: 100%;
        height: 10px;
        background-color: #eaeaeb;
      }
    }
    .loading{
      padding-top: 20px;
    }
  }

}
</style>
