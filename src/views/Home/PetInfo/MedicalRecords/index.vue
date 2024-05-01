<template>
  <div class="feature-files">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
          left-text="Back"
          title="Medical Records"
          fixed
          left-arrow
          @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div class="feature-files-content" >
        <div>
          <FileItem></FileItem>
<!--          <FileItem :fileContent="personalFile"></FileItem>-->
        </div>
      </div>

      <Footer :active="1"></Footer>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import {ConfigProviderThemeVars} from "vant";
import {Ref} from "vue";

import {useUserStore} from "@/store/userInfo";
import Toast from "@/components/Toast";
import eventBus from "@/utils/eventBus";

const themeVars: ConfigProviderThemeVars = {
  navBarIconColor: '#333333',
  navBarTextColor: '#333333',
  navBarTitleFontSize: '18px',
  navBarBackground: '#F7F7F7'
};
const onClickLeft = () => history.back();
const userStore = useUserStore()



</script>

<style lang="less" scoped>
.feature-files {
  border-radius: 0 0 10px 10px;
  background-color: #F7F7F7;
  height: 100%;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  padding-top: 60px;

  &-content {
    padding-bottom: 60px;
  }

  .file-button {
    position: fixed;
    width: 90%;
    border-radius: 10px;
    bottom: 80px;
  }
}
</style>
